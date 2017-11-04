function rootController() {
	var ctrl = this;
	ctrl.$onInit = function () {
		console.log('root controller loaded 33378');
		ctrl.loaded = true;
	}
}

angular.module('root').controller('rootController', rootController);

var root = {
	templateUrl: 'app/root.html',
	controller: 'rootController',
	transclude: true
};
angular.module('root').component('root', root);