//the namespace for this tutorial
Ext.ns('com.quizzpot.tutorial');

com.quizzpot.tutorial.Store = {
	init: function(){
		/*
		//this is the method number one (to many lines of code)
		//create the "Person" record
		var Person = Ext.data.Record.create([
			{name: 'name', mapping: 'name'},// "mapping" property not needed if it's the same as "name"
			{name: 'occupation'}, // This field will use "occupation" as the mapping.
			{name: 'age', type:'float'}, // this field will use "age" as the mapping and its a float type
			{name: 'gender'}
		]);
		
		//creates the reader for the XML data
		var reader = new Ext.data.JsonReader({
		   totalProperty: 'total', // The element which contains the total dataset size (optional)
		   root: 'data',        // The repeated element which contains row information
		   id: 'id'                 // The element within the row that provides an ID for the record (optional)
		}, Person);
		
		//creates the proxy
		var proxy = new Ext.data.HttpProxy({
			method:'POST', //configure the http method GET or POST
			url: 'jsondata.php' //the URL for the ajax call
		}); 
		
		//creates the Ext.data.Store
		this.store = new Ext.data.Store({
			proxy: proxy, //setting the proxy
			reader: reader //setting the reader
		});
		*/
		
		//this way it is more easy (a few lines of code to do the same)
		this.store = new Ext.data.JsonStore({
			url: 'jsondata.php',
			root: 'data',
			fields: ['name','occupation','gender',{name:'age',type:'float'}]
		});
		
		//loading the data
		Ext.Msg.wait('Loading... please wait!','Wait');
		this.store.load({params:{param1:'value'}});
		this.store.on('load',function(){
			//delay the message 2 seconds
			setTimeout(function(){ 
				Ext.Msg.hide(); // just to see the waiting message XD (don't do it in real world)
			},2000);
		});
		
		//listeners for the buttons
		Ext.fly('personBtn').on('click',this.find,this);
		Ext.fly('txt').on('keyup',function(event,cmd){
			if(event.getKey() === event.ENTER){ //when press ENTER
				this.find(); // perform the search
			}
		},this);
		Ext.fly('ascBtn').on('click',this.orderAsc,this);
		Ext.fly('descBtn').on('click',this.orderDesc,this);
		Ext.fly('older2030Btn').on('click',this.query,this);
		Ext.fly('older30Btn').on('click',this.filter,this);
		Ext.fly('countBtn').on('click',this.count,this);
		
	},
	
	orderAsc: function(){
		this.store.sort('name','ASC'); // sort the store ASC
		this.store.each(function(record){
			this.log(record.get('name')); //print each name
		},this);
		this.log('___________________________________');
	},
	
	orderDesc: function(){
		this.store.sort('name','DESC'); //sort the sotore DESC
		this.store.each(function(record){
			this.log(record.get('name')); //print each name
		},this);
		this.log('___________________________________');
	},
	
	filter: function(){
		//filter people...
		this.store.filterBy(function(record,id){
			return record.get('age') >= 30; //older than 30 years old
		});
		
		this.store.each(function(record){
			//print on screen
			this.log(record.get('name')+' is older than 30 '+(record.get('gender')=='f'?'she':'he')+' is '+record.get('age'));
		},this);
		//clear the filters
		this.store.clearFilter();
		this.log('___________________________________');
	},
	
	query: function(){
		//query the store, search for people older than 20 and younger than 30
		var collection = this.store.queryBy(function(record,id){
			return record.get('age') >20 && record.get('age')<30;
		});
		
		//for each item found...
		collection.each(function(item,index){
			//print the info on the screen
			this.log(item.get('name')+' is '+item.get('age')+ ' and '+(item.get('gender')=='f'?'she':'he')+' is younger than 30');
		},this);
		this.log('___________________________________');
	},
	
	count: function(){
		//count the records in the store
		this.log('<strong>Total records: '+this.store.getCount()+'</strong>');
	},
	
	find: function(){
		var value = Ext.fly('txt').getValue();
		if(Ext.isEmpty(value)) return;
		//if the value is a number
		if(/^\d+$/.test(value)){
			//find by ID
			var record = this.store.getById(value);
			if(!Ext.isEmpty(record)){
				//if found log it
				this.log(record.get('name')+' work as a '+record.get('occupation')+' and '+(record.get('gender')=='f'?'she':'he')+' is '+record.get('age')+' years old');
			}else{
				//alert the user if nothing found
				this.log('<strong>Record with id: '+value+' was not found!</strong>');
			}
		}else{
			//if it is text search the name property
			var index = this.store.find('name',value,0,true,false);
			//if something found...
			if(index>=0){
				//get the record by the index...
				var record = this.store.getAt(index);
				//and print the information
				this.log(record.get('name')+' work as a '+record.get('occupation')+' and '+(record.get('gender')=='f'?'she':'he')+' is '+record.get('age')+' years old');
			}else{
				//alert the user if nothing found
				this.log('<strong>'+value+' not found!</strong>');
			}
		}
	},
	
	log: function(txt){
		var el = Ext.get('response'); // get the LOG
		el.select('p.newest').removeClass('newest'); // remove last update
		Ext.DomHelper.append(el,'<p class="newest">'+txt+'</p>'); //update the log
		el.scrollTo('top',el.dom.scrollHeight); //scroll down
		el.select('p.newest').highlight('F5FC49',{duration:0.5}); //highlight the last message
	}
}

Ext.onReady(com.quizzpot.tutorial.Store.init,com.quizzpot.tutorial.Store);