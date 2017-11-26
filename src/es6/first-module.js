import _ from 'lodash'

export default class myFirstClass {
	calculate(arg) {
		console.log(_.isArray(arg));
		return arg + 33;
	}
}