function rootController() {
	var ctrl = this;
	ctrl.$onInit = function () {
		console.log('root controller loaded');
	}
}

angular.module('root').controller('rootController', rootController);

var root = {
	templateUrl: 'js/app/root.html',
	controller: 'rootController'
};
angular.module('root').component('root', root);