export class Meta{
	public current_page:number;
	public from:number; 
	public last_page:number;
	public path: string;
	public per_page:number;
	public to:number;
	public total: number;
	constructor(current_page:number = 0,from:number=0, last_page: number=0,
		path:string="", per_page:number=0, to:number=0,	total:number=0){
		
		this.current_page = current_page;
		this.from = from;
		this.last_page = last_page;
		this.path = path;
		this.per_page = per_page;
		this.to = to;
		this.total = total;
	}
}