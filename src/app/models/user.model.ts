import { Date } from './date.model'; 
import { Settings } from './settings.model';
export class User{

	public id:number;
	public name:string;
	public lastname:string;
	public picture:string;
	public phone:string;
	public type:string;
	public email:string;
	public userable: any;
	public register_date:string;
	public birthdate: string;
	public token:string;
	public isOnline:boolean;
	public gender:string;
	public password:string;
	public settings:Settings;
	public created_at:Date;

	constructor(id:number=-1, name:string="",
		lastname:string="", picture:string="",
		phone:string="", type:string="",
		email:string="", userable:any = null,
		register_date:string = "",
		birthdate:string="",
		token:string="",
		gender:string="", created_at:Date =null,
		settings:Settings= new Settings(), isOnline:boolean=false){
		this.id=id;
		this.name=name;
		this.lastname=lastname;
		this.picture=picture;
		this.phone=phone;
		this.type = type;
		this.email = email;
		this.userable = userable;
		this.register_date = register_date;
		this.birthdate = birthdate;
		this.gender = gender;
		this.created_at=created_at;
		this.settings = settings;
		this.isOnline = isOnline;
	}
}