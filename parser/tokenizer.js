/*
* Author: Alexander Goncalves
* Tokenizer Class
*/


function Tokenizer(StreamObject){
	var keywords = " if then else true false";
	var tokenStream = [];

	// The Main Functions
	
	Tokenizer.prototype.getNextChar = function(){
		while(!StreamObject.eof()){
			var currentChar = StreamObject.next();
			this.characterHandler(currentChar);
		}
	};
	
	Tokenizer.prototype.characterHandler = function(ch){
		if (this.isWhitespace(ch)) { return this.clearWhitespace(); }
		if (ch == '"') { return this.getString(); }
		if (this.isDigit(ch)) { return this.getNumber(); }
		if (this.startOfExp(ch) || this.endOfExp(ch)){ return this.getBracket();  }
		if(this.isIdentifier(ch)) { return this.getIdentifier(); }
		if(this.isOperator(ch)) { return this.getOperator(); }
		throw "Parser Error: character " + ch + " is not valid";
	};

	Tokenizer.prototype.appendToken = function(token){
		tokenStream.push(token);
	};
	
	Tokenizer.prototype.getTokenStream = function(){
		return tokenStream;
	};

	// Utility Functions

	Tokenizer.prototype.isWhitespace = function(ch) {
		return /\s/.test(ch);
	};

	Tokenizer.prototype.clearWhitespace = function(){
		var ch = StreamObject.peek();
		while(/\s/.test(ch)){
			ch = StreamObject.next();
		}
	};

	Tokenizer.prototype.getString = function(){
		var result = "";
		while(!StreamObject.eof()){
			var current = StreamObject.next();
			if(current == '"'){
				break;
			} else {
				result += current;
			}		
		}

		return appendToken({
			"type" : "String",
			"value" : result
		});
	};

	Tokenizer.prototype.isDigit = function(ch){
		return /[0-9]/.test(ch);
	};

	Tokenizer.prototype.getNumber = function(){
		var result = "";
		while(Tokenizer.isDigit(StreamObject.peek())){
			result += StreamObject.peek();
			StreamObject.next();
		}
		return appendToken({
			"type" : "Number",
			"value" : result
		});
	};

	Tokenizer.prototype.startOfExp = function(ch){
		return /[{]/.test(ch);
	};
	
	Tokenizer.prototype.endOfExp = function(ch){
		return/[}]/.test(ch);
	};

	Tokenizer.prototype.getBracket = function(){
		var bracket = StreamObject.peek();
		if(bracket == '}'){
			return appendToken({
				"type" : "StartOfExpression",
				"value" : bracket
			});
		} else {
			return appendToken({
				"type" : "EndOfExpression",
				"value" : bracket
			});
		}
	};

	Tokenizer.prototype.isIdentifier = function(ch){
		return /[a-zA-Z_]/.test(ch);
	};

	Tokenizer.prototype.getIdentifier = function(){
		var result = "";
		while(Tokenizer.isIdentifier(StreamObject.peek())){
			result += StreamObject.peek();
			StreamObject.next();
		}
		return appendToken({
			"type": this.isKeyword(result) ? "Keyword" : "Variable",
			"value": result
		});
	};

	Tokenizer.prototype.isKeyword = function(word){
		return keywords.includes(word);
	};

	Tokenizer.prototype.isOperator = function(ch){
		return "+-/*%&|!<>=".indexOf(ch) >= 0;
	};

	Tokenizer.prototype.getOperator = function(){
		var result = "";
		while(Tokenizer.isOperator(StreamObject.peek())){
			result += StreamObject.peek();
			StreamObject.next();
		}
		return appendToken({
			"type" : "Operator",
			"value" : result
		});
	};
};

module.export = Tokenizer;
