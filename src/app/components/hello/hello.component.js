function helloController() {
	var ctrl = this;
	ctrl.$onInit = function () {
		console.log('hello controller loaded 33378');
		// ctrl.loaded = true;
	}
}

angular.module('root').controller('helloController', helloController);

var hello = {
	template: '<h3>Sj</h3>',
	controller: 'helloController'
};
angular.module('root').component('hello', hello);