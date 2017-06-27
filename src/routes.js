angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      controllerAs: 'vm',
      templateUrl: 'app/container/main.html'
    }).state('ejemplar',{
    	url: '/ejemplar',
    	component:'ejemplar'
    }).state('crearEjemplar',{
    	url: '/ejemplar/crear',
    	component:'crearEjemplar'
    }).state('verEjemplar',{
      url:'/ejemplar/:id',
      component: 'verEjemplar'
    }).state('editarEjemplar',{
      url: '/ejemplar/:id/editar',
      component: 'editarEjemplar'
    });
}