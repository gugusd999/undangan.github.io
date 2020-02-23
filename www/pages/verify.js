
function cekDataClient() {
	if (localData.get("dataClientLogin") == null) {
		console.log(localData.get("dataClientLogin")); 
		myRouter.call("/login");		
	}else{
		$("#main").css("width", "100vw");
	}
}