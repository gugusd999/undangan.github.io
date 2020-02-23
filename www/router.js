let loadData = {
	data: [],
	create: function(a){
		let createNew = `<script src="./${a}"/>`;
		this.createNew = createNew;
		this.cekData();
	},
	cekData:function(){
		this.dataBaru = null; 
		this.data.forEach(item => {
			if (item == this.createNew) {
				this.dataBaru = item;
			}
		})
		this.htmlNew();
	},
	htmlNew:function(){
		if (this.dataBaru == null) {
			this.data.push(this.createNew);
			$("#script").append(this.createNew);
		}
	}
}

let dataApp = {
	data: [],
	add: function(nama, data){
		let app = {
			name: nama,
			data: data
		}
		this.data.push(app);
	},
	cek: function(a){
		this.name = a;
		let data = this.data.filter(function(a) {
			return a.name == this.name;
		},this)[0];
		return data;
	}

}


let localData = {
	create: function(name, data){
		localStorage.setItem(name, data);
	},
	get: function(name){
		return localStorage.getItem(name);
	},
	del: function(name){
		localStorage.removeItem(name);
	}
}



const save = {
	setUrl: function(a){
		this.url = a;
	},
	formData: function(a){
		this.postData = $(a)[0];
	},
	getData: function(){
		var data = new FormData(this.postData);

		return data;
	},
	prosses:function(){
		return $.ajax({
			type: "POST",
			enctype: 'multipart/form-data',
			url: this.url,
			data: this.getData(),
			processData: false,
			contentType: false,
			cache: false, 
		})
	},
	post: function(){
		return this.prosses()
	}
}

var view = document.getElementById('view');

var script = document.getElementById('script');

let myRouter = {
	routes: [],
	currentPath: window.location.pathname,
	activateRoutes: Array.from(document.querySelectorAll('[root]')),
	navigate: function(event){
		let myFirstRouter = this.router();
		function navigate(event){
			event.preventDefault();
			var route = event.target.attributes['root'].value;
			var routeInfo = myFirstRouter.routes.filter(function(r){
				return r.path == route;
			})[0];
			if (!routeInfo) {
				console.log('404');
				view.innerHTML = 'nothing path';
			}
			else{
				window.history.pushState({}, 'name', routeInfo.path);
				loadData.create(routeInfo.page);
				routeInfo.run();
			}
		};
		this.activateRoutes.forEach(function(route){
			route.addEventListener('click', navigate, false);
		});
	},
	call: function(a){
		let myFirstRouter = this.router();
		function navigate(b){
			var route = b;
			var routeInfo = myFirstRouter.routes.filter(function(r){
				return r.path == route;
			})[0];
			if (!routeInfo) {
				console.log('404');
				view.innerHTML = 'nothing path';
			}
			else{
				window.history.pushState({}, 'name', routeInfo.path);
				loadData.create(routeInfo.page);
				routeInfo.run();
			}
		};

		navigate(a);
	},
	name: function(a){
		this.name = a;
	},
	router: function(){
		return {
			name: this.name,
			routes: this.routes
		}
	},
	create: function(a){
		this.routes.push(a);
	},
	run:function(){
		this.navigate();
		console.log(this.router().routes);
		if (this.currentPath === '/') {
			var route = this.router().routes.filter(function(r){
				return r.path == this.currentPath
			}, this)[0];
			loadData.create(route.page);
			route.run();
		}
		else{
			var route = this.router().routes.filter(function(r){
				return r.path === this.currentPath
			},this)[0];
			if (route) {
				loadData.create(route.page);
				route.run();
			}else{
				view.innerHTML = '404';
			}
		}
	}
}