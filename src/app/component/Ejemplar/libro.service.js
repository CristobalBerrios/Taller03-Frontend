(function(){
	'use strict';

	angular
	.module('app')
	.service('LibroService',libroService);

	libroService.$inject = ['$resource'];

	function libroService($resource){

		return $resource('http://localhost:8000/api/libros/:id',{id:'@id'});
	}

})();