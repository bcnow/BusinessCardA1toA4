function cardFeatureController(cardsService) {
	var ctrl = this;
	ctrl.card = {};
	ctrl.$onInit = function () {
		console.log('onInit card feature ', ctrl.cardItem, ctrl.cardId);
		if (_.isNil(ctrl.cardItem) && _.isNil(ctrl.cardId)) {
			throw 'card it or item must be set';
		}
		if (_.isNil(ctrl.cardItem)) {
			ctrl.card = cardsService.getById(ctrl.cardId);
		} else {
			// ctrl.card = {				Name: 'vvv'			};
			ctrl.card = ctrl.cardItem;
			console.log('card ', ctrl.card);
		}
		// ctrl.filteredContacts = $filter('contactsFilter')(ctrl.contacts, ctrl.filter);
	};

}
angular
	.module('components.cards')
	.controller('cardFeatureController', cardFeatureController);

var component = {
	bindings: {
		cardItem: '<',
		cardId: '@',
		test3: '@'
	},
	templateUrl: 'app/components/cards/card-feature-item/card-feature.html',
	controller: 'cardFeatureController'
}
angular
	.module('components.cards')
	.component('cardFeature', component);