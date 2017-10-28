function rootController() {
	var ctrl = this;
	ctrl.$onInit = function () {
		console.log('root controller loaded 3337');
		ctrl.loaded = true;
	}
}

angular.module('root').controller('rootController', rootController);

var root = {
	templateUrl: 'js/app/root.html',
	controller: 'rootController',
	transclude: true
};
angular.module('root').component('root', root);