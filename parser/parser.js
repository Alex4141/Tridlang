/*
 * Author: Alexander Goncalves
 * Parser Implementation
 * Takes the Token Stream from Tokenizer
 */

function Parser(tokenStream){
	
	var pos = -1;
	var currentToken = this.advanceToken();	
	var errorState = false;
	var symbolTable = {};

	Parser.prototype.parse = function(){
		if(currentToken.type == "StartOfExpression"){
			this.parseStatement();
			if(currentToken.type == "EndOfExpression"){
				//Correct Semantics
			} else {
				this.throwError(currentToken);
			}
		}else{
			this.throwError(currentToken);
		}
	};
	
	Parser.prototype.parseStatement = function(){
		// TODO Add More Statements
		this.advanceToken();
		switch(currentToken.type){
			case "Keyword":
				this.parseIfStatement();
			case "Variable":
				this.parseVarDecl();
			default:
				this.throwError(currentToken);
		}
	};

	Parser.prototype.parseVarDecl = function(){
		var varName = currentToken.value;
		this.advanceToken();
		if(currentToken.value == '='){
			this.advanceToken();
			this.parseExpression();
		} else {
			this.throwError(currentToken);
		}		
	};

	Parser.prototype.parseExpression = function(){
	// TODO Work on parsing expressions
	};

	Parser.prototype.advanceToken = function(){
		pos++;
		this.getToken();
	};

	Parser.prototype.getToken = function(){
		return tokenStream[pos]
	};

	Parser.prototype.throwError = function(token){
		throw "Illegal Expression! Got: " + token.type;	
	};

}

module.exports = Parser;
