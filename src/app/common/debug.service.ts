module an {
	export interface IDebugService {
		printAllStates: () => void;
	}
	export class DebugService implements IDebugService {
		static inject = ['$state'];
		constructor(private $state: ng.ui.IStateService) {
		}
		public printAllStates(): void {
			console.log(this.$state.get());
		}
	}
	// function helper($state) {
	// 	return {
	// 		printAllStates: function () {
	// 			console.log($state.get());
	// 		}
	// 	}
	// }
	angular.module('root').service('debugService', DebugService);
}