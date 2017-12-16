module an {
	function routeLinkCheck() {
		return {
			restrict: 'E',
			compile: function ($element) {
				return function ($scope, $element, $attrs, $ctrl) {
					if (_.isNil($element.attr("href")) && _.isNil($element.attr("ui-sref")) === false) {
						$element.prop("disabled", true);
						$element.attr('disabled', 'disabled');
					}
					// todo - check route permission
				};
			}
		};
	}

	/**
	 * @ngdoc directive
	 * @name lengthCheck
	 * @module components.contact
	 *
	 * @description
	 *
	 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
	 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
	 *
	 * @usage
	 *
	 * ### How to use
	 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
	 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
	 **/
	angular
		.module('root')
		.directive('a', routeLinkCheck);
}