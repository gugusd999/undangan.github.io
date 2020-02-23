function home() {
	setTimeout(function(){
		axios.get('pages/template/dashboard.htm')
		.then(res => {
			$("#view").html(res.data);
		});
	}, 100);
}

$("#view").on("click", "#buat-undangan", function(){
	myRouter.call('/buat-undangan');
})