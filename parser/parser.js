/*
 * Author: Alexander Goncalves
 * Parser Implementation
 * Takes the Token Stream from Tokenizer
 */

function Parser(tokenStream){

	Parser.prototype.constructTree = function(){
		for(var i = 0; i < tokenStream.length; i++){
			
		}
	};

	Parser.prototype.getLookahead = function(i){
		return tokenStream[i++];
	};

}

module.exports = Parser;
