(function(){
	'use strict';

	angular
	.module('app')
	.service('EjemplarService',ejemplarService);

	ejemplarService.$inject = ['$resource'];

	function ejemplarService($resource){

		return $resource('http://localhost:8000/api/ejemplar/:id',{id:'@id'},{
			update:{
				method:'PUT'
			}
		});
	}

})();