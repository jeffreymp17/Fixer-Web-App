import {Category} from './category.model';
export class Breakdown  {
	id:number;
	price:number;
	description:string
	category_id:Category;
	constructor(id:number,price:number,category:Category) {
		
	}
}