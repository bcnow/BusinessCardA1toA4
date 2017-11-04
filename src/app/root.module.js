angular.module('root', ['ui.router', 'components.cards'])
	.config(function ($stateProvider, $urlRouterProvider) {

		/////////////////////////////
		// Redirects and Otherwise //
		/////////////////////////////

		// Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
		$urlRouterProvider

			// The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
			// Here we are just setting up some convenience urls.
			.when('/c?id', '/contacts/:id')
			.when('/user/:id', '/contacts/:id')

			// If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
			.otherwise('/');


		//////////////////////////
		// State Configurations //
		//////////////////////////
		// Use $stateProvider to configure your states.
		$stateProvider

			//////////
			// Home //
			//////////

			.state("home", {

				// Use a url of "/" to set a state as the "index".
				url: "/",

				// Example of an inline template string. By default, templates
				// will populate the ui-view within the parent state's template.
				// For top level states, like this one, the parent template is
				// the index.html file. So this template will be inserted into the
				// ui-view within index.html.

				// views: {
				// 	'': {
				// 		//template: 'some content from home route <div ui-view>dd</div>',
				// 		templateUrl: 'app/home.view.html'

				// 	}
				// }
				templateUrl: 'app/home.view.html',
				resolve: {
					cards: ['cardsService',
						function (cardsService) {
							return cardsService.getAll(3);
						}
					]
				},
				controller: ['$scope', 'cards', function ($scope, cards) {
					$scope.cards = cards;
				}]

			}).state({
				name: 'hello',
				url: '/hello',
				component: 'hello',
				// views: {
				// 	'topNav': {
				// 		template: '<ul class="nav navbar-nav">				<li>					<a href="#">About 2</a>				</li>				<li>					<a href="#">Services</a>				</li>			</ul>'
				// 	}
				// }
			}).state({
				name: 'about',
				url: '/about',
				views: {
					// 'footer': {
					// 	template: '<div>footer from about</div><about></about>'
					// },
					'': {
						template: '<about></about>'
					}
				}
			}).state({
				name: 'contact-us',
				url: '/contact-us',
				views: {
					// 'footer': {
					// 	template: '<div>footer from about</div><about></about>'
					// },
					'': {
						template: '<contact-us></contact-us>'
					}
				}
			})
	}).run(function ($rootScope, $trace, $state, $stateParams) {

		// console.log('module root run');
		// $trace.enable("TRANSITION", "VIEWCONFIG");

		// It's very handy to add references to $state and $stateParams to the $rootScope
		// so that you can access them from any scope within your applications.For example,
		// <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
		// to active whenever 'contacts.list' or one of its decendents is active.
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	});