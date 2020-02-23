let dataRegister2 = {
	formRegis1: function(){
		return axios.get('pages/template/register2.htm')
		.then(res => {
			$("#view").html(res.data);
		})
	}
}

function registerLanjutan(){
	dataRegister2.formRegis1();
}

loadView.on("click", "#register-save", function(){
	// start loading function here

	$("#view #regis").val(JSON.stringify(historyRegist1.data)); 

	console.log("start here");
	save.formData("#view #form-regis2");
	save.setUrl("http://localhost:8080/data.php?key=data-login-save");
	save.post()
	// end of action here
	.then(function(response){
		myRouter.call('/login');		
	})
})