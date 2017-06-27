(function(){
	'use strict';

	angular
	.module('app')
	.component('crearEjemplar',{
		templateUrl: 'app/component/Ejemplar/ejemplarForm.html',
		controller: crearEjemplarCtrl,
		controllerAs: 'vm'
	});

	crearEjemplarCtrl.$inject = ['LibroService','UsuarioService','EjemplarService','$state','$rootScope'];

	function crearEjemplarCtrl(LibroService,UsuarioService,EjemplarService,$state,$rootScope){
		var vm = this;
		vm.location = 'crear';
		vm.libro = null;
		vm.usuarios = null;
		vm.ejemplar = {
			fecha_prestamo: null,
			fecha_devolucion: null,
			libro_id:null,
			estado_id:null,
			usuario_id:null
		}

		vm.enviarFormulario = function(data){	

			data.fecha_devolucion = getFullFecha(data.fecha_devolucion);
			data.fecha_prestamo = getFullFecha(data.fecha_prestamo);
			data.estado_id = 2;

			EjemplarService.save(data,function(i){
				console.log('funcionaa');
				console.log(i);
			},function(err){
				console.log('no funciono :c');
				console.log(err);
			});

			$rootScope.$broadcast('actualizar');

			$state.go('ejemplar');
			
			
		};

		LibroService.query().$promise.then(function(data){
			console.log(data);
			vm.libro = data;
		});

		UsuarioService.query().$promise.then(function(data){
			console.log(data);
			vm.usuarios = data;
		});

		function getFullFecha(fecha){
			var dia = fecha.getDate();
			var mes = fecha.getMonth() + 1;
			var anno = fecha.getFullYear();

			if(mes<10){
				mes = "0"+mes;
			}

			return anno +"-" + mes + "-" + dia;
		}

	}
})();