import {Links} from './links.model'; 
import{Meta} from './meta.model';

export class ResponseModel{
	public data:any;
	public links:Links;
	public meta:Meta;
	constructor(data:any=[],links:Links=new Links(),meta:Meta = new Meta()){
		this.data = data;
		this.links = links;
		this.meta = meta;
	}
}