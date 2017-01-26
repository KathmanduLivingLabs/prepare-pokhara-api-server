import xml2js from 'xml2js';

var xmlStringParser = xml2js.parseString;

export default class xmljsonParser {

	constructor(stub){
		this.stub = stub;
	}

	toJSON(){

		return new Promise((resolve,reject)=>{

			xmlStringParser(this.stub,function(err,result){
				if(err) reject(err);
				resolve(result);
			})
		})
		
	}

	toXML(){
		var builder = new xml2js.Builder();
		return builder.buildObject(this.stub);
	}	

}
