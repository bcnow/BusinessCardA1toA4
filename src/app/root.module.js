angular.module('root', ['ui.router'])
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
				views: {
					'topLevel': {
						template: '<root>hello inside</root>'
					}
				}


			}).state({
				name: 'home.hello',
				url: '/hello',
				// template: '<h3>hello world!</h3>',
				views: {
					'topNav': {
						template: '<ul class="nav navbar-nav">				<li>					<a href="#">About 2</a>				</li>				<li>					<a href="#">Services</a>				</li>			</ul>'
					}
				}
			}).state({
				name: 'home.about',
				url: '/about',
				views: {
					// 'topLevel': {
					// 	template: '<h3>Its the UI-Router hello world app!</h3>'
					// },
					'footer': {
						template: '<div>doe sist ss</div>'
					}
				}
				//template: '<h3>Its the UI-Router hello world app!</h3>'
			})

		// $stateProvider.state(helloState);
		// $stateProvider.state(aboutState);

		// let trace = window["angular-ui-router"].trace; // or "ui-router-ng2"
		// trace.enable(); // Trace everything (very verbose)
	}).run(function ($rootScope, $trace) {

		console.log('module root run');
		$trace.enable("TRANSITION", "VIEWCONFIG");
		// $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		// 	console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
		// });

		// $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
		// 	console.log('$stateChangeError - fired when an error occurs during transition.');
		// 	console.log(arguments);
		// });

		// $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		// 	console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
		// });

		// $rootScope.$on('$viewContentLoaded', function (event) {
		// 	console.log('$viewContentLoaded - fired after dom rendered', event);
		// });

		// $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
		// 	console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
		// 	console.log(unfoundState, fromState, fromParams);
		// });
	});