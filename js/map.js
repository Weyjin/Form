
function Map(){
     if(Map.unique !== undefined ){
           return Map.unique; 
       }
	   this.arr=[],
	   this.keys=[]
	

}
function Node(key,value){
	   this.key=key;
	   this.value=value;
	}

Map.prototype = {
    put:function(key,value){
	   this.arr[this.arr.length] = new Node(key, value);
	   this.keys[this.keys.length]=key;
       this.keys=this.unique(this.keys);
	},
	get:function(key){
	  var arr=this.toArray();      
     return arr[key];
	},
	unique:function(arr){
	  var hash=[];
	  for (var i = 0; i < arr.length; i++) {
		for (var j = i+1; j < arr.length; j++) {
		  if(arr[i]===arr[j]){
			++i;
		  }
		}
		  hash.push(arr[i]);
	  }
	  return hash;
	},
	toString:function(){
		var s='{';
	    for(var i=0;i<this.keys.length;i++){
			s+='"'+this.keys[i]+'":';
			var child=[];
		    for(var j=0;j<this.arr.length;j++){
			    if(this.keys[i]===this.arr[j].key){
				    child[child.length]='"'+this.arr[j].value+'"';
				}
			}
			s+='['+child+'],';
		
		}
		s=s.substr(0,s.length-1);
		s+='}';
		return s;
	},
	toArray:function(){
	  var s=JSON.parse(this.toString());
	  return s;
	}
	
 
}
