function dataWanitaSebelumnya(){
	let dataWanitaLoad = localData.get('dataWanita')
	if (dataWanitaLoad != undefined) {
		dataWanitaLoad = JSON.parse(dataWanitaLoad);

		dataWanita.foto = dataWanitaLoad.foto;
		$("#view #foto-wanita-view").attr('src', dataWanitaLoad.foto);
		$("#view #nama").val(dataWanitaLoad.nama);
		$("#view #umur").val(dataWanitaLoad.umur);
		$("#view #nama_ayah").val(dataWanitaLoad.nama_ayah);
		$("#view #nama_ibu").val(dataWanitaLoad.nama_ibu);
	}
}

function formpasanganwanita() {
	setTimeout(function(){
		axios.get('pages/template/formwanita.htm')
		.then(res => {
			$("#view").html(res.data);
		})
		.then(function(){
			dataWanitaSebelumnya();
		})
	}, 100);
}

$("#view").on("click", "#pasangan-pria", function(){
	myRouter.call('/data-pasangan-wanita');
});



let dataWanita = {

}


function bacaGambarnyaWanita(input){
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e){
			$("#view #foto-wanita-view").attr('src', e.target.result);
			dataWanita.foto = e.target.result;
		}
		reader.readAsDataURL(input.files[0]);

	}
}


$("#view").on("change", "#foto-wanita", function(){
	bacaGambarnyaWanita(this);
})

$("#view").on("click", "#bersihkan-data-wanita", function(){
	localData.del('dataWanita');
	dataWanita.foto = null;
	$("#view #foto-wanita-view").attr('src', "");
	$("#view #nama").val("");
	$("#view #umur").val("");
	$("#view #nama_ayah").val("");
	$("#view #nama_ibu").val("");
});

$("#view").on("click", "#kembali-ke-data-pria", function(){
	myRouter.call('/buat-undangan');
})


$("#view").on("click", "#save-data-wanita", function(){

	let dataBefore = localData.get("dataWanita");
	
	let data = {
		foto : dataWanita.foto,
		nama : $("#view #nama").val(),
		umur : $("#view #umur").val(),
		nama_ayah : $("#view #nama_ayah").val(),
		nama_ibu : $("#view #nama_ibu").val()
	}

	if (dataBefore == JSON.stringify(data)) {
		console.log("data sama");
		myRouter.call('/data-pernikahan');
	}else{
		localData.create("dataWanita", JSON.stringify(data));
		myRouter.call('/data-pernikahan');
	}

})