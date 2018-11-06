export class Settings{
	public banner_img:string;
	public sidenav_img:string;
	
	constructor(banner_img:string="",sidenav_img:string=""){
		this.banner_img = banner_img;
		this.sidenav_img = sidenav_img;
	}
}