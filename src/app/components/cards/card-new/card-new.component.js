function cardNewController(cardsService, $state) {
	var ctrl = this;
	ctrl.card = {};

	ctrl.$onInit = function () {};

	ctrl.submit = function () {
		cardsService.post(ctrl.card).then(function (result) {
			$state.go('cards.detail', {
				cardId: result.Id
			});
		});
	}
}
angular
	.module('components.cards')
	.controller('cardNewController', cardNewController);

var component = {
	templateUrl: 'app/components/cards/card-new/card-new.html',
	controller: 'cardNewController'
}
angular
	.module('components.cards')
	.component('cardNew', component);