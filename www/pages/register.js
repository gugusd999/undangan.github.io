// data register
const loadView = $("#view");

const formRegis1 = loadView.children('#form-regis1')[0];

let dataRegister = {
	formRegis1: function(){
		return axios.get('pages/template/register1.htm')
		.then(res => {
			loadView.html(res.data);
		})
	}
}

function register() {
	dataRegister.formRegis1()
	.then(function(){
		historyRegist1.callBack();
	})
}

let historyRegist1 = {
	data: null,
	callBack: function(){
		if(this.data != null){
			$("#view #username").val(this.data.username);
			$("#view #password").val(this.data.password);
		}
	}
}

// call button
loadView.on("click", "#register-one", function(){
	// start loading function here
	console.log("start here");
	save.formData("#view #form-regis1");
	save.setUrl("http://localhost:8080/data.php?key=data-login");
	save.post()
	// end of action here
	.then(function(response){
		const data = JSON.parse(response);
		historyRegist1.data = data;
		myRouter.call('/register-lanjutan');
	})
})

loadView.on("click", "#back-to-register1", function(){
	register();
})

loadView.on("click", "#back-to-login", function(){
	myRouter.call('/login');
})