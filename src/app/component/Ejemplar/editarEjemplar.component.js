(function(){
	'use strict';

	angular
	.module('app')
	.component('editarEjemplar',{
		templateUrl: 'app/component/Ejemplar/ejemplarForm.html',
		controller: editarEjemplarCtrl,
		controllerAs: 'vm'
	});

	editarEjemplarCtrl.$inject = ['LibroService','UsuarioService','EjemplarService','$stateParams','$rootScope','$state'];

	function editarEjemplarCtrl(LibroService,UsuarioService,EjemplarService,$stateParams,$rootScope,$state){

		var vm = this;
		vm.location = 'editar';
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

			EjemplarService.update({id: $stateParams.id},data,function(response){
				$rootScope.$broadcast('actualizar');
				$state.go('ejemplar');
			},function(response){
	
			});

		}

		EjemplarService.get({id: $stateParams.id},function(data){

			vm.ejemplar.fecha_devolucion = new Date(data.fecha_devolucion);	
			vm.ejemplar.fecha_prestamo = new Date(data.fecha_prestamo);
			vm.ejemplar.libro_id = data.libro.id;
			vm.ejemplar.usuario_id = data.usuario.id;
			vm.ejemplar.estado_id = data.estado.id;

		});

		LibroService.query().$promise.then(function(data){
			console.log(data);
			vm.libro = data;
		});

		UsuarioService.query().$promise.then(function(data){
			console.log(data);
			vm.usuarios = data;
		});

		vm.estados = [{id:1,descripcion:"Disponible"},{id:2,descripcion:"Ocupado"}];

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