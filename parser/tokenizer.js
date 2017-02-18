/*
* Author: Alexander Goncalves
* Tokenizer Class
*/


function Tokenizer(StreamObject){
	

	// Utils

	Tokenizer.prototype.startOfExp = function(ch){
		return /[{]/.test(ch);
	};
	
	Tokenizer.prototype.endOfExp = function(ch){
		return/[}].test(ch);
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

	Tokenizer.prototype.getNumber = function(){
		var result = "";
		while(Tokenizer.isDigit(StreamObject.peek())){
			result += StreamObject.peek();
			StreamObject.next();
		}
		return result;
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
		return result;
	};

	Tokenizer.prototype.getOperator = function(){
		var result = "";
		while(Tokenizer.isOperator(StreamObject.peek())){
			result += StreamObject.peek();
			StreamObject.next();
		}
		return result;
	};
	
	// Add a getIdentifier	
	
	Tokenizer.prototype.isWhitespace = function(ch) {
		return /\s/.test(ch);
	};
};

module.export = Tokenizer;

var t = new Tokenizer("dfffd");
console.log(t.isDigit('9'));
