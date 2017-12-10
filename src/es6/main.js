import myFirstClass from './first-module';
//import angular from 'angular';
import angular from '../../bower_components/angular/angular.js';

function test() {
	// console.log('blabal')
	var g = new myFirstClass();
	g.calculate(33);
}