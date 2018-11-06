export class Date{
	public date:string;
	public timezone_type:number;
	public timezone:string;
	constructor( date:string="", timezone_type:number=0, timezone:string=""){
   this.date=date;
   this.timezone_type=timezone_type;
   this.timezone;
	}
}