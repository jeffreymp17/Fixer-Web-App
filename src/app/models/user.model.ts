import { Date } from './date.model'; 
export class User{

	public id:number;
	public name:string;
	public lastname:string;
	public picture:string;
	public phone:string;
	public type:string;
	public userable: any;
	public created_at:Date;

	constructor(id:number=-1, name:string="",
		lastname:string="", picture:string="",
		phone:string="", 
		type:string="",
		userable:any = null,
		created_at:Date =null){
		this.id=id;
		this.name=name;
		this.lastname=lastname;
		this.picture=picture;
		this.phone=phone;
		this.type = type;
		this.userable = userable;
		this.created_at=created_at;
	}

}