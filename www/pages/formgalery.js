function formgalery() {
	setTimeout(function(){
		axios.get('pages/template/formgalery.htm')
		.then(res => {
			$("#view").html(res.data);
		})
		.then(function(){
			// dataPernikahanSebelumnya();
			dataGalery.pecahData();
		})
	}, 100);
}

let dataGalery = {
	data: [],
	replay: function(item){
		this.item = item;
		// console.log(item.name);
		let dataFilter = this.data.filter(function(index) {
			return index.name == this.item.name;
		},this)[0];

		if (dataFilter == undefined) {
			this.data.push(this.item);
		}
	},
	loadData: function(){
		console.log(this.data);
	},
	get: function(input){
		for (var i = input.files.length - 1; i >= 0; i--) {
			
			this.replay(input.files[i]);

		}
		this.pecahData();
	},
	pecahData: function(){

		$("#view #galery-view").html("");

		for (var i = this.data.length - 1; i >= 0; i--) {
			
			let dataFile = new FileReader();
			dataFile.readAsDataURL(this.data[i]);
			dataFile.onload = function(e){
				let html = `
					<div class="col s6">
						<img style="width:100%;" src="${e.target.result}"></img>
					</div>
				`;
				$("#view #galery-view").append(html);
			}

			console.log(this.html);


		}


		// this.data.forEach(item => {
		// 	console.log(item);
		// }this);

	}
};





$("#view").on("change", "#foto-galery", function(){
	dataGalery.get(this);
})

$("#view").on("click", "#simpan-all-data", function(){
	console.log("halllo");
	console.log(dataGalery);
})

$("#view").on("click", "#back-to-datapernikahan", function(){
	myRouter.call('/data-pernikahan');
})