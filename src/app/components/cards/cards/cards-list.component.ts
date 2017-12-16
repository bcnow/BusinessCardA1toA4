module an.Cards {
	function cardListController(cardsService, $state, debugService: an.IDebugService) {
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

	var component: ng.IComponentOptions = {
		templateUrl: 'app/components/cards/cards/cards-list.html',
		controller: 'cardListController'
	}

	angular
		.module('components.cards')
		.component('cardsList', component);
}