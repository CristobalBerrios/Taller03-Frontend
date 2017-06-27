(function(){
	'use strict';

	angular
	.module('app')
	.component('verEjemplar',{
		templateUrl: 'app/component/Ejemplar/ejemplarForm.html',
		controller: verEjemplarCtrl,
		controllerAs: 'vm'
	});

	verEjemplarCtrl.$inject = ['EjemplarService','$stateParams'];

	function verEjemplarCtrl(EjemplarService,$stateParams){
		var vm = this;
		vm.location = 'ver';
		vm.ejemplar = EjemplarService.get({id: $stateParams.id});
	}

})();