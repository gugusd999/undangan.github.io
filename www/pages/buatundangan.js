

function dataPriaSebelumnya(){
	let dataPriaLoad = localData.get('dataPria')
	if (dataPriaLoad != undefined) {
		dataPriaLoad = JSON.parse(dataPriaLoad);

		dataPria.foto = dataPriaLoad.foto;
		$("#view #foto-pria-view").attr('src', dataPriaLoad.foto);
		$("#view #nama").val(dataPriaLoad.nama);
		$("#view #umur").val(dataPriaLoad.umur);
		$("#view #nama_ayah").val(dataPriaLoad.nama_ayah);
		$("#view #nama_ibu").val(dataPriaLoad.nama_ibu);
	}
}



function buatundangan() {
	setTimeout(function(){
		axios.get('pages/template/order.htm')
		.then(res => {
			$("#view").html(res.data);
		})
		.then(function(){
			dataPriaSebelumnya();
		})
	}, 100);
}

$("#view").on("click", "#pasangan-pria", function(){
	myRouter.call('/data-pasangan-wanita');
});



let dataPria = {

}


function bacaGambarnya(input){
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e){
			$("#view #foto-pria-view").attr('src', e.target.result);
			dataPria.foto = e.target.result;
		}
		reader.readAsDataURL(input.files[0]);

	}
}


$("#view").on("change", "#foto-pria", function(){
	bacaGambarnya(this);
})


$("#view").on("click", "#bersihkan-data-pria", function(){
	localData.del('dataPria');
	dataPria.foto = null;
	$("#view #foto-pria-view").attr('src', "");
	$("#view #nama").val("");
	$("#view #umur").val("");
	$("#view #nama_ayah").val("");
	$("#view #nama_ibu").val("");
});


$("#view").on("click", "#save-data-pria", function(){

	let dataBefore = localData.get("dataPria");
	
	let data = {
		foto : dataPria.foto,
		nama : $("#view #nama").val(),
		umur : $("#view #umur").val(),
		nama_ayah : $("#view #nama_ayah").val(),
		nama_ibu : $("#view #nama_ibu").val()
	}

	if (dataBefore == JSON.stringify(data)) {
		myRouter.call('/data-pasangan-wanita');
	}else{
		localData.create("dataPria", JSON.stringify(data));
		myRouter.call('/data-pasangan-wanita');
	}

})

