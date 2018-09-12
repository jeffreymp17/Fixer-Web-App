import {Links} from './links.model'; 
import{Meta} from './meta.model';
export class ResponseModel{
	data:any[];
	links:Links;
	meta:Meta;
	constructor(data:any[],links:Links,meta:Meta){

	}
}