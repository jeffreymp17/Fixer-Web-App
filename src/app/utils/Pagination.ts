import {ResponseModel} from '../models/response.model';
export class PaginationUtils{
	static getUrl(page,responseModel:ResponseModel,listName:string){
		if(page ==  null){
			return listName;
		}
		else{
			let last_page = responseModel.meta.last_page
			page = page < last_page ? page : last_page; 
			return `${listName}?${page}=${page}`;
		}
	}
	static getPaginate(responseModel:ResponseModel){
    let pagination =[];    
    for (var i = 1; i <= responseModel.meta.last_page; ++i) {
      pagination.push(i);
    }
  }
}