function helper($state) {
	return {
		printAllStates: function () {
			console.log($state.get());
		}
	}
}
angular.module('root').service('helper', helper);