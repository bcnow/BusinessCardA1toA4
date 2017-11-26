namespace Common {

	export class MyTsClass {
		getArea(width: number): number {
			return width + 20;
		}
	}
	function bla() {

	}
}
namespace Best {
	class Bu {
		constructor() {
			let g = new Common.MyTsClass();
			g.getArea(3);
		}
	}
}