export class Links{
	public first:string;
	public last:string;
	public prev:string;
	public next:string;

	constructor(first:string="",last:string="",prev:string="",next:string=""){
		this.first=first;
		this.last=last;
		this.prev=prev;
		this.next = next;
	}
}