(function(){
	'use strict';

	angular
	.module('app')
	.component('ejemplar',{
		templateUrl: 'app/component/Ejemplar/ejemplar.html',
		controller: ejemplarCtrl,
		controllerAs: 'vm'
	});

	ejemplarCtrl.$inject = ['EjemplarService','$rootScope','$mdDialog'];

	function ejemplarCtrl(EjemplarService,$rootScope,$mdDialog){
		var vm = this;
		vm.ejemplar = null;

		EjemplarService.query().$promise.then(function(data){
			vm.ejemplar = data;
		});

		$rootScope.$on('actualizar',function(event,data){
			EjemplarService.query().$promise.then(function(data){
				vm.ejemplar = data;
			});
		});

		vm.showDialog = function(ev,ejemplar){
			var confirm = $mdDialog.confirm()
			.title('¿Esta seguro de eliminar este registro ?')
			.textContent('Se eliminara el prestamo del libro ' +ejemplar.libro.titulo)
			.targetEvent(ev)
			.ok('Confirmar')
			.cancel('Cancelar');

			$mdDialog.show(confirm).then(function() {
				EjemplarService.delete({id: ejemplar.id},function(data){
				$rootScope.$broadcast('actualizar');
				console.log('se elimino');
				})
			},function(){
				console.log('no se elimino');
			});
		};




	}

})();