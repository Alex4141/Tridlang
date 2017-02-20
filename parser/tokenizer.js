/*
* Author: Alexander Goncalves
* Tokenizer Class
*/


function Tokenizer(StreamObject){
	// TODO modify all the getters to end in a new function that adds to the Token Stream
	var keywords = " if then else true false";
	var TokenStream = [];

	// The Main Functions
	
	Tokenizer.prototype.getNextChar = function(){
		while(!StreamObject.eof()){
			var currentChar = StreamObject.peek();
			this.characterHandler(currentChar);
		}
	};
	
	Tokenizer.prototype.characterHandler = function(ch){
		if (this.isWhitespace(ch)) { return; }
		if (ch == '"') { return this.getString(); }
		if (this.isDigit(ch)) { return this.getNumber(); }
		if (this.startOfExp(ch) || this.endOfExp(ch)){ return this.getBracket();  }
		if(this.isIdentifier(ch)) { return this.getIdentifier(); }
		if(this.isOperator(ch)) { return this.getOperator(); }
	};

	/*
	 * Tokenizer.prototype.TokenAppender = function(){
	 * };
	 */ 

	// Utility Functions

	Tokenizer.prototype.startOfExp = function(){
	};

	Tokenizer.prototype.startOfExp = function(ch){
		return /[{]/.test(ch);
	};
	
	Tokenizer.prototype.endOfExp = function(ch){
		return/[}]/.test(ch);
	};

	Tokenizer.prototype.isOperator = function(ch){
		return "+-/*%&|!<>=".indexOf(ch) >= 0;
	};

	Tokenizer.prototype.isDigit = function(ch){
		return /[0-9]/.test(ch);
	};
	
	Tokenizer.prototype.isIdentifier = function(ch){
		return /[a-zA-Z_]/.test(ch);
	};

	Tokenizer.prototype.isKeyword = function(word){
		return keywords.includes(word);
	};

	Tokenizer.prototype.getNumber = function(){
		var result = "";
		while(Tokenizer.isDigit(StreamObject.peek())){
			result += StreamObject.peek();
			StreamObject.next();
		}
		return {
			"type" : "Number",
			"value" : result
		};
	};
	
	Tokenizer.prototype.getString = function(){
		var result = "";
		StreamObject.next();
		while(!StreamObject.eof()){
			var current = StreamObject.next();
			if(current == '"'){
				break;
			} else {
				result += current;
			}		
		}
		return {
			"type" : "String",
			"value" : result
		};
	};

	Tokenizer.prototype.getOperator = function(){
		var result = "";
		while(Tokenizer.isOperator(StreamObject.peek())){
			result += StreamObject.peek();
			StreamObject.next();
		}
		return {
			"type" : "Operator",
			"value" : result
		};
	};
	
	Tokenizer.prototype.getIdentifier = function(){
		var result = "";
		while(Tokenizer.isIdentifier(StreamObject.peek())){
			result += StreamObject.peek();
			StreamObject.next();
		}
		return {
			"type": this.isKeyword(result) ? "Keyword" : "Variable",
			"value": result
		}
	};
	
	Tokenizer.prototype.getBracket = function(){
		var bracket = StreamObject.peek();
		if(bracket == '}'){
			return {
				"type" : "StartOfExpression",
				"value" : bracket
			};
		} else {
			return {
				"type" : "EndOfExpression",
				"value" : bracket
			};
		}
	};

	Tokenizer.prototype.isWhitespace = function(ch) {
		return /\s/.test(ch);
	};

};

module.export = Tokenizer;

var t = new Tokenizer("d\"ff\"flld");
console.log(t.isWhitespace("\t\n"));
