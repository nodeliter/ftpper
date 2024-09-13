var Client = require('ftp');
var ftpClient = require('ftp-client')
const fs = require('fs');



class ftpper {
	
	_configs;
	_ftps;
	
	constructor(configs) {
		this._configs = configs;
		this._ftps = this._configs.map(c=>new Client());
	}
	
	connect = func => {
		
		this._ftps.forEach((ftp,i)=>{
			ftp.on('ready', ()=> func(ftp));
			ftp.connect(this._configs[i]);
		});		
	};
	
	chmod = (code,file, callback) => this.connect(ftp=>{
		ftp.site('chmod '+code+' '+file, (err,rt,rc)=> {
			if (callback)
				callback(err,rt,rc);
			ftp.end();
		});
	});
	
	upload = (local,dest, result_f) => {
		var ps = [];
		this._configs.forEach(config=>{
			ps.push(new Promise((resolve,reject)=> {
				var client = new ftpClient(config);
				client.connect(()=>client.upload(local,dest, {override: 'older'}, (res)=>resolve(res)));
			}));
		});
		Promise.all(ps).then(results=>result_f(results));
	};

	download = (dest,local, result_f) => {
		this._configs.forEach(config=>{
			var client = new ftpClient(config);
			client.connect(()=>client.download(dest,local, {override: 'all'}, result_f));
		});
	};
	
	
}


module.exports = configs => new ftpper(configs);