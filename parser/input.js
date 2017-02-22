/*
Author: Alex Goncalves
Stream Object implementation
*/

function Stream(input){
	var position = 0;
	
	Stream.prototype.next = function(){
		return input.charAt(position++);
	};

	Stream.prototype.peek = function(){
		return input.charAt(position);
	};

	Stream.prototype.eof = function(){
		return this.peek() == "";
	};
}

module.exports = Stream;
