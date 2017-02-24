/*
 * Author: Alexander Goncalves
 * Parser Implementation
 * Takes the Token Stream from Tokenizer
 */

function Parser(tokenStream){

	var pos = -1;
	var currentToken = this.getToken();
	
	// Main Functions to parse the Tokens
	
	// Utility Functions to handle Parser
	
	Parser.prototype.parseIfStatment = function(){
		this.skipKeyWord("if");
		this.skipOperator('(');
		var exp = parseExpression();
		// TODO Finish Parse Expression 
	};

	Parser.prototype.parseExpression = function(){
		// Write individual parse function
		return 
	};

	Parser.prototype.isKeyword = function(value){
		return current.type == "Keyword" && current.value == value;
	};

	Parser.prototype.skipKeyword = function(value){
		if(this.isKeyword(value)){ this.advanceToken(); }
		else { throw "Syntax Error"; }
	};

	Parser.prototype.isPunctuation = function(value){
		return current.type == "Punctuation" && current.value == value;
	};

	Parser.prototype.skipPunctuation = function(value){
		if(this.isPunctuation(value)) { this.advanceToken(); }
		else { throw "Syntax Error"; }
	};

	Parser.prototype.isOperator = function(value){
		return current.type == "Operator" && current.value == value;
	};

	Parser.prototype.skipOperator = function(value){
		if(this.isOperator(value)) { this.advanceToken(); }
		else { throw "Syntax Error" }
	};

	// Utility Functions to handle Token Stream

	Parser.prototype.advanceToken = function(){
		if(!this.tokenEof()){
			currentToken = tokenStream[pos++];
		}
	};

	Parser.prototype.tokenEof = function(){
		return pos >= tokenStream.length;
	};

}

module.exports = Parser;
