function loginPage() {
	setTimeout(function(){
		axios.get('pages/template/login.htm')
		.then(res => {

			$("#view").html(res.data);

		});
	}, 500);
}

// go register

$("#view").on("click", "#register", function(){
	myRouter.call('/register');
})


$("#view").on("keyup", "#login-client #username", function(){
	var params = new URLSearchParams();
	params.append('username', $(this).val());
	axios.post('http://localhost:8080/data.php?key=data-client-gambar', params)
	.then(res => {
		$("#view #foto").attr("src", res.data);
	})
})


// go login

$("#view").on("click", "#go-login", function(){
	// start loading function here
	console.log("start here");
	save.formData("#view #login-client");
	save.setUrl("http://localhost:8080/data.php?key=go-login");
	save.post()
	// end of action here
	.then(function(response){
		localData.create("dataClientLogin", response);
		myRouter.call('/');
	})
})
