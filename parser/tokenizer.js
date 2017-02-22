/*
* Author: Alexander Goncalves
* Tokenizer Class
*/


function Tokenizer(StreamObject){
	var keywords = ["if", "then", "else", "true", "false"];
	var tokenStream = [];

	// The Main Functions
	
	Tokenizer.prototype.getNextChar = function(){
		while(!StreamObject.eof()){
			var currentChar = StreamObject.peek();
			this.characterHandler(currentChar);
			StreamObject.next();
		}
	};
	
	Tokenizer.prototype.characterHandler = function(ch){
		if (this.isWhitespace(ch)) { return; }
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

	Tokenizer.prototype.getString = function(){
		var result = "";
		StreamObject.next();
		while(StreamObject.peek() != '"'){
			result += StreamObject.peek();
			StreamObject.next();
		}

		return this.appendToken({
			"type" : "String",
			"value" : result
		});
	};

	Tokenizer.prototype.isDigit = function(ch){
		return /[0-9]/.test(ch);
	};

	Tokenizer.prototype.getNumber = function(){
		var result = "";
		while(this.isDigit(StreamObject.peek())){
			result += StreamObject.peek();
			StreamObject.next();
		}
		return this.appendToken({
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
		if(bracket == '{'){
			return this.appendToken({
				"type" : "StartOfExpression",
				"value" : bracket
			});
		} else {
			return this.appendToken({
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
		while(this.isIdentifier(StreamObject.peek())){
			result += StreamObject.peek();
			StreamObject.next();
		}
		return this.appendToken({
			"type": this.isKeyword(result) ? "Keyword" : "Variable",
			"value": result
		});
	};

	Tokenizer.prototype.isKeyword = function(word){
		return keywords.indexOf(word) > -1;
	};

	Tokenizer.prototype.isOperator = function(ch){
		return "+-/*%&|!<>=".indexOf(ch) >= 0;
	};

	Tokenizer.prototype.getOperator = function(){
		var result = "";
		while(this.isOperator(StreamObject.peek())){
			result += StreamObject.peek();
			StreamObject.next();
		}
		return this.appendToken({
			"type" : "Operator",
			"value" : result
		});
	};
};

module.export = Tokenizer;

var s = require("./input.js");

var str = new s('"big" "meaty" "claws"99 9 var if = 9');
var tok = new Tokenizer(str);
tok.getNextChar();
console.log(tok.getTokenStream());
