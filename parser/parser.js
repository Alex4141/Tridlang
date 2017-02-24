/*
 * Author: Alexander Goncalves
 * Parser Implementation
 * Takes the Token Stream from Tokenizer
 */

function Parser(tokenStream){

	var pos = -1;
	var currentToken = this.getToken();

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
