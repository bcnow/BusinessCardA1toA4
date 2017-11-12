function cardEditController(cardsService) {
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

		// if (_.isNil(ctrl.cardItem)) {
		// 	ctrl.card = cardsService.getById(ctrl.cardId);
		// } else {
		// 	// ctrl.card = {				Name: 'vvv'			};
		// 	ctrl.card = ctrl.cardItem;
		// 	console.log('card ', ctrl.card);
		// }
		// ctrl.filteredContacts = $filter('contactsFilter')(ctrl.contacts, ctrl.filter);
	};
	ctrl.submit = function () {
		cardsService.post(ctrl.card).then(function (result) {
			// TODO - use relative for EDIT, so can go up to view
			console.log('success, yet to implement redirect');
		});
	}

}
angular
	.module('components.cards')
	.controller('cardEditController', cardEditController);

var component = {
	bindings: {
		//cardItem: '<',
		cardId: '@',
		// test3: '@'
	},
	templateUrl: 'app/components/cards/card-edit/card-edit.html',
	controller: 'cardEditController'
}
angular
	.module('components.cards')
	.component('cardEdit', component);