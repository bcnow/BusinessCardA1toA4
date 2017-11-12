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
				Address: 'Brighton, Main street 15'
			})
			children.insert({
				Id: 55,
				Name: 'Tom Berrimor',
				Workplace: 'Consulting',
				Address: 'Brighton, Yellow sttret 100'
			})
			children.insert({
				Id: 90,
				Name: 'Inga Berrimor',
				Workplace: 'Agency',
				Address: 'London, Green sttret 100'
			})
		}
		readyPromise.resolve();
		runProgramLogic();
		console.log('initialize end');
	}

	function runProgramLogic() {
		var entryCount = db.getCollection("children").count();
		console.log("number of entries in database : " + entryCount);
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
		post: function (card) {

		}
	}
}

angular
	.module('components.cards')
	.service('cardsService', cardsService);