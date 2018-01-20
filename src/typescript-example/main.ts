import Stream from './my.module'
export default class Bethoven {
	public Id: string;
	public save() {
		let s = new Stream();
		s.Write(this.Id);
	}
}

console.log(new Bethoven());