function cardListController(cardsService, $state, helper) {
	var ctrl = this;
	ctrl.card = {};
	ctrl.$onInit = function () {
		cardsService.getAll(999).then(function (result) {
			ctrl.cards = result;
		});
	};

}
angular
	.module('components.cards')
	.controller('cardListController', cardListController);

var component = {
	templateUrl: 'app/components/cards/cards/cards-list.html',
	controller: 'cardListController'
}
angular
	.module('components.cards')
	.component('cardsList', component);