function cardsService() {
	return {
		getAll: function () {
			return [{
				Id: '45',
				Name: 'Andrew Berrimor',
				Workplace: 'GoToCarting',
				Address: 'Brighton, Main street 15'
			}]
		},
		getById: function (id) {
			return this.getAll().find(function (item, index, array) {
				return item.Id === id;
			})
		}
	}
}

angular
	.module('components.cards')
	.service('cardsService', cardsService);