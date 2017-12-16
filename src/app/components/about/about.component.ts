module an {
	function aboutController() {
		var ctrl = this as ng.IController;
		ctrl.$onInit = function () {
			console.log('about controller loaded 33378');
			// ctrl.loaded = true;
		}
	}

	angular.module('root').controller('aboutController', aboutController);

	var about = {
		templateUrl: 'app/components/about/about.html',
		controller: 'aboutController'
	};
	angular.module('root').component('about', about);
}