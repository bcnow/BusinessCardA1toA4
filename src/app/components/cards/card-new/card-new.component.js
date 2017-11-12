function cardNewController(cardsService) {
	var ctrl = this;
	ctrl.card = {};

	ctrl.$onInit = function () {};

	ctrl.submit = function () {
		cardsService.post(ctrl.card);
	}
}
angular
	.module('components.cards')
	.controller('cardNewController', cardNewController);

var component = {
	bindings: {
		//cardItem: '<',
		// cardId: '@',
		// test3: '@'
	},
	templateUrl: 'app/components/cards/card-new/card-new.html',
	controller: 'cardNewController'
}
angular
	.module('components.cards')
	.component('cardNew', component);