module an.Cards {

	function cardEditController(cardsService, $state) {
		var ctrl = this;
		ctrl.card = {};
		ctrl.$onInit = function () {
			console.log('onInit card edit ', ctrl.cardItem, ctrl.cardId);
			if (_.isNil(ctrl.cardId)) {
				throw 'card id or item must be set';
			}
			cardsService.getById(ctrl.cardId).then(function (result) {
				ctrl.card = result;
			});
		};
		ctrl.submit = function () {
			cardsService.post(ctrl.card).then(function (result) {
				$state.go('^');
			});
		}

	}
	angular
		.module('components.cards')
		.controller('cardEditController', cardEditController);

	var component = {
		bindings: {
			cardId: '@',
		},
		templateUrl: 'app/components/cards/card-edit/card-edit.html',
		controller: 'cardEditController'
	}
	angular
		.module('components.cards')
		.component('cardEdit', component);
}