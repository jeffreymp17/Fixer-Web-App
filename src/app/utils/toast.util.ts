declare var M:any;

export class Toast{
	public static DURATION_SHORT = 1500;
	public static DURATION_LONG  = 3000;
	private static dangerColor   = "rounded gradient-45deg-red-pink";
	private static successColor  = "rounded gradient-45deg-green-teal";
	private static infoColor = "rounded gradient-45deg-light-blue-indigo";

	public static danger(html:string,duration:number){
      M.toast({html: html, classes: this.dangerColor, timeRemaining:duration});
  	}

  	public static success(html:string,duration:number){
      M.toast({html: html, classes: this.successColor, timeRemaining:duration});
	}

	public static info(html:string){
		M.toast({html: html, classes: this.infoColor});
	}
}