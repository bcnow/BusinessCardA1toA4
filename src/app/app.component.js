function appController() {
	var ctrl = this;
	ctrl.$onInit = function () {
		console.log('app controller loaded 33378');
		// ctrl.loaded = true;
	}
}

angular.module('root').controller('appController', appController);

var app = {
	templateUrl: 'js/app/app.html',
	controller: 'appController',
	transclude: true
};
angular.module('root').component('app', app);