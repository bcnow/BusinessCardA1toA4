module an.Cards {
	function cardsSearchController(cardsService, $state, debugService: an.IDebugService) {
		var ctrl = this;
		ctrl.cards = {};
		ctrl.searchCriteria = {};

		ctrl.$onInit = function () {
			// cardsService.getAll(999).then(function (result) {
			// 	ctrl.cards = result;
			// });
			console.log('search init');
		};

		ctrl.search = function () {
			cardsService.search(ctrl.searchCriteria).then(function (results) {
				ctrl.cards = results;
			})
		}

	}
	angular
		.module('components.cards')
		.controller('cardsSearchController', cardsSearchController);

	var cardsSearchComponent = {
		templateUrl: 'app/components/cards/cards-search/cards-search.html',
		controller: 'cardsSearchController'
	}
	angular
		.module('components.cards')
		.component('cardsSearch', cardsSearchComponent);
}