function cardsService() {
	return {
		getAll: function (limit) {
			console.log('getAll cards - arg', arguments)
			return [{
					Id: '45',
					Name: 'Andrew Berrimor',
					Workplace: 'GoToCarting',
					Address: 'Brighton, Main street 15'
				},
				{
					Id: '55',
					Name: 'Tom Berrimor',
					Workplace: 'Consulting',
					Address: 'Brighton, Yellow sttret 100'
				}, {
					Id: '90',
					Name: 'Inga Berrimor',
					Workplace: 'Agency',
					Address: 'London, Green sttret 100'
				}

			]
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