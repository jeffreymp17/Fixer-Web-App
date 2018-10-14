import {Category} from './category.model';
export class Breakdown  {
	id:number;
	price:number;
	description:string
	category_id:Category;
	constructor(id:number=-1,description:string="",price:number=null,category:Category=null) {
		this.id=id;
		this.description=description;
		this.price=price;
		this.category_id=category;
	}
}