function cardDetailController(cardsService) {
	var ctrl = this;
	ctrl.card = {};
	ctrl.$onInit = function () {
		console.log('onInit card detail', ctrl.cardItem, ctrl.cardId);
		if (_.isNil(ctrl.cardId)) {
			throw 'card id or item must be set';
		}
		ctrl.card = cardsService.getById(ctrl.cardId);

		// if (_.isNil(ctrl.cardItem)) {
		// 	ctrl.card = cardsService.getById(ctrl.cardId);
		// } else {
		// 	// ctrl.card = {				Name: 'vvv'			};
		// 	ctrl.card = ctrl.cardItem;
		// 	console.log('card ', ctrl.card);
		// }
		// ctrl.filteredContacts = $filter('contactsFilter')(ctrl.contacts, ctrl.filter);
	};

}
angular
	.module('components.cards')
	.controller('cardDetailController', cardDetailController);

var component = {
	bindings: {
		//cardItem: '<',
		cardId: '@',
		// test3: '@'
	},
	templateUrl: 'app/components/cards/card-detail/card-detail.html',
	controller: 'cardDetailController'
}
angular
	.module('components.cards')
	.component('cardDetail', component);