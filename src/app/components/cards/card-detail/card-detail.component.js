function cardDetailController(cardsService, $state, helper) {
	var ctrl = this;
	ctrl.card = {};
	ctrl.$onInit = function () {
		console.log('onInit card detail', ctrl.cardItem, ctrl.cardId);
		if (_.isNil(ctrl.cardId)) {
			throw 'card id or item must be set';
		}
		cardsService.getById(ctrl.cardId).then(function (result) {
			ctrl.card = result;
		});
	};

}
angular
	.module('components.cards')
	.controller('cardDetailController', cardDetailController);

var component = {
	bindings: {
		cardId: '@',
	},
	templateUrl: 'app/components/cards/card-detail/card-detail.html',
	controller: 'cardDetailController'
}
angular
	.module('components.cards')
	.component('cardDetail', component);