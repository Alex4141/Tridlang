/*
 * Author: Alexander Goncalves
 * Parser Implementation
 * Takes the Token Stream from Tokenizer
 */

function Parser(tokenStream){
	
	var pos = -1;
	var currentToken = this.advanceToken();	
	var errorState = false;

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
	}

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
