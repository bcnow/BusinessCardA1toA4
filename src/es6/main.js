import myFirstClass from './first-module';
//import angular from 'angular';
// import angular from '../../bower_components/angular/angular.js';
import angular from 'angular';
import blob from './myFirstClass'

function test() {
    console.log('blabal');
    var g = new myFirstClass();
    g.calculate(33);
    angular.module('ss').controller();
}