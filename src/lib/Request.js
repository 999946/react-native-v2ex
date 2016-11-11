
class RequestError {
	constructor(code, object, description){
		this.code = code;
		this.object = object;
		this.description = description;
	}
}

class Request {
	constructor(params) {
		this.url           = params.url || '';
		this.method        = params.method || 'POST';
		this.headers       = params.headers || {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		};
		this.body_type     = params.bodyType || 'form';
		this.bodys         = params.data || {};
		this.return_type   = params.returnType || 'json';
		this.timeout       = params.timeout || 12000;
		this.show_error	   = params.show_error || true;
	}
	fetch(){
		let options         = {};
		options.method      = this.method;

		options.headers = this.headers;

		if({} != this.bodys){
			if('form' == this.body_type){
				let data = '';
				Object.keys(this.bodys).map((index) => {
					const value = (this.bodys[index] == null || this.bodys[index] == undefined) ? '' : this.bodys[index];
					let param = encodeURI(value);
					data += `${index}=${param}&`;
				});
				if(data.length > 0)data = data.substring(0, data.length-1);
				if(this.method == 'GET'){
					if(data != ''){
						this.url += '?' + data;
					}
				}else{
					options.body = data;
				}
			}else if('file' == this.body_type){
				let data = new FormData();
				Object.keys(this.bodys).map((index) => {
					data.append(index, this.bodys[index]);
				});
				options.body = data;
			}
		}

		if(__DEV__)console.log('fetch=>', this, 'options => ', options);
		this.timer = undefined;
		return Promise.race([
					fetch(this.url, options),
					new Promise((resolve, reject) => {
					    this.timer = setTimeout(() => {
							reject(new Error('request timeout'))
						}, this.timeout);
					})
				]).then(
					(data)=>{
						clearTimeout(this.timer);
						return data;
					},
					(err)=>{
						clearTimeout(this.timer);
						return err;
					}
				).then((response) => {
					if(response instanceof TypeError){
						return Promise.reject(response);
					}else{
						if('json' == this.return_type){
							return response.json();
						}else if('text' == this.return_type){
							return response.text();
						}else if('blob' == this.return_type){
							return response.blob();
						}else if('formData' == this.return_type){
							return response.formData();
						}else if('arrayBuffer' == this.return_type){
							return response.arrayBuffer();
						}
					}
				}).then((response) => {
					if(__DEV__)console.log('fetch url = %s', this.url, response);
					return response;
				})
	}
}



export default {
	get: (url, data)=>{
		return new Request({url: url, data: data, method:'GET'}).fetch();
	},
	post:(url, data)=>{
		return new Request({url: url, data: data, method:'POST'}).fetch();
	},
	getHtml:(url, data)=>{
		return new Request({
			url: url, 
			data: data, 
			method:'GET',
			returnType : 'text'
		}).fetch();
	},
	ajax:(options)=>{
		return new Request(options).fetch();
	}
}

