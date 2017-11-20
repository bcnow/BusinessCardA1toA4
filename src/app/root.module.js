angular.module('root', ['ui.router', 'lokijs', 'components.cards'])
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
							return cardsService.getAll(3).then(function (result) {
								return result;
							});
						}
					]
				},
				controller: ['$scope', 'cards', function ($scope, cards) {
					console.log('home state controller router: ', cards);
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
			}).state('cards', {

				// With abstract set to true, that means this state can not be explicitly activated.
				// It can only be implicitly activated by activating one of its children.
				abstract: true,

				// This abstract state will prepend '/contacts' onto the urls of all its children.
				url: '/cards',

				// Example of loading a template from a file. This is also a top level state,
				// so this template file will be loaded and then inserted into the ui-view
				// within index.html.
				templateUrl: 'app/cards.html',

				// Use `resolve` to resolve any asynchronous controller dependencies
				// *before* the controller is instantiated. In this case, since contacts
				// returns a promise, the controller will wait until contacts.all() is
				// resolved before instantiation. Non-promise return values are considered
				// to be resolved immediately.
				resolve: {
					contacts: function () {
						return [];
					}
				},

				// You can pair a controller to your template. There *must* be a template to pair with.
				controller: ['$scope', '$state', 'contacts',
					function ($scope, $state, contacts) {

						// // Add a 'contacts' field in this abstract parent's scope, so that all
						// // child state views can access it in their scopes. Please note: scope
						// // inheritance is not due to nesting of states, but rather choosing to
						// // nest the templates of those states. It's normal scope inheritance.
						// $scope.contacts = contacts;

						// $scope.goToRandom = function () {
						// 	var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);

						// 	// $state.go() can be used as a high level convenience method
						// 	// for activating a state programmatically.
						// 	$state.go('contacts.detail', {
						// 		contactId: randId
						// 	});
						// };
					}
				]
			})
			/////////////////////
			// cards > List //
			/////////////////////

			// Using a '.' within a state name declares a child within a parent.
			// So you have a new state 'list' within the parent 'contacts' state.
			.state('cards.list', {

				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/contacts' (because '/contacts' + '').
				url: '',

				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within contacts.html. This is the
				// most important thing to remember about templates.
				component: 'cardsList'
			})
			.state('cards.search', {

				// Using an empty url means that this child state will become active
				// when its parent's url is navigated to. Urls of child states are
				// automatically appended to the urls of their parent. So this state's
				// url is '/contacts' (because '/contacts' + '').
				url: '/search',

				// IMPORTANT: Now we have a state that is not a top level state. Its
				// template will be inserted into the ui-view within this state's
				// parent's template; so the ui-view within contacts.html. This is the
				// most important thing to remember about templates.
				component: 'cardsSearch'
			})

			///////////////////////
			// Cards > Detail //
			///////////////////////

			// You can have unlimited children within a state. Here is a second child
			// state within the 'contacts' parent state.
			.state('cards.detail', {

				// Urls can have parameters. They can be specified like :param or {param}.
				// If {} is used, then you can also specify a regex pattern that the param
				// must match. The regex is written after a colon (:). Note: Don't use capture
				// groups in your regex patterns, because the whole regex is wrapped again
				// behind the scenes. Our pattern below will only match numbers with a length
				// between 1 and 4.

				// Since this state is also a child of 'contacts' its url is appended as well.
				// So its url will end up being '/contacts/{contactId:[0-9]{1,4}}'. When the
				// url becomes something like '/contacts/42' then this state becomes active
				// and the $stateParams object becomes { contactId: 42 }.
				url: '/{cardId:[0-9]{1,4}}',

				resolve: {
					cardId: ['$stateParams', function ($stateParam) {
						return $stateParam.cardId;
					}]
				},

				// If there is more than a single ui-view in the parent template, or you would
				// like to target a ui-view from even higher up the state tree, you can use the
				// views object to configure multiple views. Each view can get its own template,
				// controller, and resolve data.

				// View names can be relative or absolute. Relative view names do not use an '@'
				// symbol. They always refer to views within this state's parent template.
				// Absolute view names use a '@' symbol to distinguish the view and the state.
				// So 'foo@bar' means the ui-view named 'foo' within the 'bar' state's template.
				views: {

					// So this one is targeting the unnamed view within the parent state's template.
					'': {
						component: 'cardDetail'
						// templateUrl: 'app/components/about/about.html',
						// controller: ['$scope', '$stateParams', 'utils',
						// 	function ($scope, $stateParams, utils) {
						// 		$scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
						// 	}
						// ]
					},

					// This one is targeting the ui-view="hint" within the unnamed root, aka index.html.
					// This shows off how you could populate *any* view within *any* ancestor state.
					'hint@': {
						template: 'This is contacts.detail populating the "hint" ui-view'
					},

					// This one is targeting the ui-view="menuTip" within the parent state's template.
					// 'menuTip': {
					// 	// templateProvider is the final method for supplying a template.
					// 	// There is: template, templateUrl, and templateProvider.
					// 	templateProvider: ['$stateParams',
					// 		function ($stateParams) {
					// 			// This is just to demonstrate that $stateParams injection works for templateProvider.
					// 			// $stateParams are the parameters for the new state we're transitioning to, even
					// 			// though the global '$stateParams' has not been updated yet.
					// 			return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
					// 		}
					// 	]
					// }
				}
			}).state('cards.detail.edit', {
				url: '/edit',
				resolve: {
					cardId: ['$stateParams', function ($stateParam) {
						return $stateParam.cardId;
					}]
				},
				views: {
					// So this one is targeting the unnamed view within the parent state's template.
					'': {
						component: 'cardEdit'
					}
				}
			}).state('cards.add', {
				url: '/add',
				// resolve: {
				// cardId: ['$stateParams', function ($stateParam) {
				// 	return $stateParam.cardId;
				// }]
				// },
				views: {
					// So this one is targeting the unnamed view within the parent state's template.
					'': {
						component: 'cardNew'
					}
				}
			});





	}).run(function ($rootScope, $trace, $state, $stateParams, $uiRouter, $transitions) {
		$transitions.onError({}, transition => {
			// $state.go('error', { error: transition.error() });
			console.log('Default error handler fired! 2 ', transition._error.detail);
		});
		$state.defaultErrorHandler(function () {
			console.log('Default error handler fired!');
		});
		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			console.log('Default error handler fired!');
		});
		// var pluginInstance = $uiRouter.plugin(window.Visualizer);
		// var Visualizer = window['@uirouter/visualizer'].Visualizer;
		// stateService.defaultErrorHandler(function () {
		// 	// Do not log transitionTo errors
		// });
		$trace.enable("TRANSITION", "VIEWCONFIG");
		// It's very handy to add references to $state and $stateParams to the $rootScope
		// so that you can access them from any scope within your applications.For example,
		// <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
		// to active whenever 'contacts.list' or one of its decendents is active.
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	});