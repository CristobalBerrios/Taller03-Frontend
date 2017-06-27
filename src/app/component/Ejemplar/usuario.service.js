(function(){
	'use strict';

	angular
	.module('app')
	.service('UsuarioService',usuarioService);

	usuarioService.$inject = ['$resource'];

	function usuarioService($resource){

		return $resource('http://localhost:8000/api/usuarios/:id',{id:'@id'});
	}

})();