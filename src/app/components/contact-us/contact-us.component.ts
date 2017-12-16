module an {

	function contactUsController() {
		var ctrl = this;
		ctrl.$onInit = function () {
			console.log('contactUs controller loaded 33378');
			// ctrl.loaded = true;
		}
	}

	angular.module('root').controller('helloController', contactUsController);

	var contactUs = {
		template: '<h3>Out contacts</h3><p>Please contact us in case of any questions</p>',
		controller: 'helloController'
	};
	angular.module('root').component('contactUs', contactUs);
}