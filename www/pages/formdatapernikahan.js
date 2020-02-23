function dataPernikahanSebelumnya(){
	let dataPernikahanLoad = localData.get('dataPernikahan')
	if (dataPernikahanLoad != undefined) {
		dataPernikahanLoad = JSON.parse(dataPernikahanLoad);

		dataPernikahan.foto = dataPernikahanLoad.foto;
		$("#view #foto-pernikahan-view").attr('src', dataPernikahanLoad.foto);
		$("#view #alamat_resepsi").val(dataPernikahanLoad.alamat_resepsi);
		$("#view #alamat_akad").val(dataPernikahanLoad.alamat_akad);
		$("#view #tanggal_acara").val(dataPernikahanLoad.tanggal_acara);
	}
}

function formdatapernikahan() {
	setTimeout(function(){
		axios.get('pages/template/datapernikahan.htm')
		.then(res => {
			$("#view").html(res.data);
		})
		.then(function(){
			dataPernikahanSebelumnya();
		})
	}, 100);
}

// $("#view").on("click", "#pasangan-pria", function(){
// 	myRouter.call('/data-pasangan-wanita');
// });



let dataPernikahan = {

}


function bacaGambarnyaPernikahan(input){
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e){
			$("#view #foto-pernikahan-view").attr('src', e.target.result);
			dataPernikahan.foto = e.target.result;
		}
		reader.readAsDataURL(input.files[0]);

	}
}


$("#view").on("change", "#foto-pernikahan", function(){
	bacaGambarnyaPernikahan(this);
})

$("#view").on("click", "#bersihkan-data-pernikahan", function(){
	localData.del('dataPernikahan');
	dataPernikahan.foto = null;
	$("#view #foto-pernikahan-view").attr('src', "");
	$("#view #alamat_resepsi").val("");
	$("#view #alamat_akad").val("");
	$("#view #tanggal_acara").val("");
});

$("#view").on("click", "#kembali-ke-data-wanita", function(){
	myRouter.call('/data-pasangan-wanita');
})


$("#view").on("click", "#save-data-pernikahan", function(){

	let dataBefore = localData.get("dataPernikahan");
	
	let data = {
		foto : dataPernikahan.foto,
		alamat_resepsi : $("#view #alamat_resepsi").val(),
		alamat_akad : $("#view #alamat_akad").val(),
		tanggal_acara : $("#view #tanggal_acara").val(),
	}

	if (dataBefore == JSON.stringify(data)) {
		console.log("data sama");
		myRouter.call('/data-galery');
	}else{
		localData.create("dataPernikahan", JSON.stringify(data));
		myRouter.call('/data-galery');
	}

})