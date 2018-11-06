export class Url{
	

	public static getUrl(){
		let array = window.location.href.split('/');
		return array[0]+"//"+array[2]+"/api/";
  	}
}