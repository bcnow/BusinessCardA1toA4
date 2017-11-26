function cardsService($q) {
	// constructor() {
	// https://github.com/techfort/LokiJS/wiki/Query-Examples
	console.log('card service contrust');

	var db = new loki('loki.json', {
		autoload: true,
		autoloadCallback: databaseInitialize,
		autosave: true,
		autosaveInterval: 4000
	});

	// implement the autoloadback referenced in loki constructor
	var children;
	var readyPromise = $q.defer();

	function databaseInitialize() {
		console.log('initialize start');
		children = db.getCollection("children");
		if (children === null) {
			children = db.addCollection("children");
			children.insert({
				Id: 45,
				Name: 'Andrew Berrimor',
				Workplace: 'GoToCarting',
				Email: 'andres@boo.com',
				Address: 'Brighton, Main street 15'
			})
			children.insert({
				Id: 55,
				Name: 'Tom Berrimor',
				Workplace: 'Consulting',
				Email: 'tom@boo.com',
				Address: 'Brighton, Yellow sttret 100'
			})
			children.insert({
				Id: 90,
				Name: 'Inga Berrimor',
				Workplace: 'Agency',
				Email: 'Inga@boo.com',
				Address: 'London, Green sttret 100'
			})
		}
		runProgramLogic();
		console.log('initialize end');
	}

	function runProgramLogic() {
		var entryCount = db.getCollection("children").count();
		console.log("number of entries in database : " + entryCount);
		readyPromise.resolve();
	}

	// }
	return {
		getAll: function (limit) {
			// $q.defer;
			console.log('get-all start');
			return readyPromise.promise.then(function () {
				var results = children.chain()
					.find({
						Id: {
							'$gte': 0
						}
					})
					.limit(limit)
					.data();
				console.log('get-all end ', results);
				return results;
			});
		},
		getById: function (id) {
			return readyPromise.promise.then(function () {
				let result = children.find({
					'Id': parseInt(id)
				});
				console.log('get by id ', id, ' ', result);
				return result[0];
			});
		},
		search: function (seearchCriteria) {
			return readyPromise.promise.then(function () {
				let result = children.find({
					'Name': {
						'$contains': seearchCriteria.name ? seearchCriteria.name : ''
					},
					'Workplace': {
						'$contains': seearchCriteria.workplace ? seearchCriteria.workplace : ''
					},
					'Address': {
						'$contains': seearchCriteria.address ? seearchCriteria.address : ''
					}
				});
				console.log('search ', seearchCriteria, ' ', result);
				return result;
			});
		},
		post: function (card) {

			function biggestId(obj1, obj2) {
				if (obj1.Id < obj2.Id) return 1;
				if (obj1.Id > obj2.Id) return -1;
				return 0;
			}

			if (_.isNil(card.Id)) {
				// find biggest id
				var list = children.chain()
					.sort(biggestId)
					.limit(1)
					.data();
				var currentId = list[0].Id;
				card.Id = currentId + 1;
				return $q.when(children.insert(card));
			} else {
				return $q.when(children.update(card));
			}
		}
	}
}

angular
	.module('components.cards')
	.service('cardsService', cardsService);