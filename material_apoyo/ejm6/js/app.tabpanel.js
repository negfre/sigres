Ext.BLANK_IMAGE_URL = 'images/default/s.gif';

Ext.ns('app');

Ext.ux.IFrameComponent = Ext.extend(Ext.BoxComponent, {
     onRender : function(ct, position){
          this.el = ct.createChild({tag: 'iframe', id: 'iframe-'+ this.id, frameBorder: 0, src: this.url});
     }
});


	function confirmarCerrar(){
			  Ext.MessageBox.confirm('Confirmar','¿Seguro que desea cerrar sesión?', cerrarSesion);
		  } 
		
		
		function cerrarSesion(btn){
		if(btn=='yes'){
			 Ext.Ajax.request({  
				//url: 'cerrarSesion.php',
				waitMsg: 'Cerrando Sesion..',
				params: { 
				   task: "CERRARSESION"
				  }, 
				success: function(response){
														
							}
				 });
		 	 }  
	  }

app.mytabpanel = Ext.extend(Ext.TabPanel, {
	initComponent: function(){
		
    	app.mytabpanel.superclass.initComponent.apply(this, arguments);
    },

    addTab: function (id,title,url,type)
    {
		//alert(url);
		var open = !this.getItem(id);
		if (open)
		{

			switch (type)
			{
				case 'iframe':

					//Creamos un nuevo ifram y cargamos dentro la url
					var newPanel = new Ext.Panel({
				        id : id,
				        title: title,
				        loadScripts: true,
				        autoScroll: true,
				        closable: true,
				        iconCls:'x-icon-'+id,
				        layout:'fit',

				        items: [ new Ext.ux.IFrameComponent({ id: id, url: url, name: id}) ]
			      	});
			     	this.add(newPanel);
			      	this.setActiveTab(newPanel);
				break;
				case 'load':
					//Cargamos la pestaña por ajax
                	var newPanel = new Ext.Panel({
				        id : id,
				        title: title,
				        loadScripts: true,
				        autoScroll: true,
				        closable: true,
				        iconCls:'menu_'+id,
				        layout:'fit',

						autoLoad: {url: url, scripts: true, scope: this}

			      	});
			     	this.add(newPanel);
			     	this.setActiveTab(newPanel);
				break;
				default:
					//Ext.example.msg('Click','You clicked on "Action 1".');
					this.setActiveTab(id);
					Ext.Msg.alert('Aviso','Seleccione un opcion valida')
					//alert("Seleccione una opcion");
				break;
			}
		}
		else {
			//Si ya tenemos la pestaña creada la seleccionaremos
			this.setActiveTab(id);
		}
    }
});

// register xtype to allow for lazy initialization
Ext.reg('mytabpanel', app.mytabpanel);

app.tabpanel = new app.mytabpanel({
    
    //creamos el statusbar y le decimos ls componentes a tener
    bbar: new Ext.Toolbar({
        id: 'basic-statusbar',
        iconCls:'an-icon',
        items: [
            {
                id              : 'chkFrmWrkSession',
                xtype           : 'button',
				iconCls			:'x-icon-cerrar-sesion',
                text       		: 'Cerrar Sesión',
                listeners       : {
				    'click'     : function(scope, valor){
		                       confirmarCerrar();
                    }    
                
                }
            },'-',{
                iconCls         : 'x-icon-calendario',
                id              : 'tbFrmeWorkFecha',
                text            : new Date().format('d/n/Y')
            },'-',{
                id              : 'tbFrmeWorkClock',
                text            : new Date().format('g:i:s A')
            }
        ]
    }),
    enableTabScroll: true,
	listeners: {
        'render': {
            fn: function(){
                Ext.TaskMgr.start({
                    run: function(){
                        Ext.getCmp('tbFrmeWorkFecha').setText( new Date().format('d/n/Y') );
                        Ext.getCmp('tbFrmeWorkClock').setText( new Date().format('g:i:s A') ); 			
                    },
                    interval: 1000
                });
            }
        }
    },					  
	id: 'tabs',
    plain: true,  //remove the header border
	activeItem: 0,
	region:'center',
	margins: '0 3 3 0',
    items:[
        {
            title: 'Bienvenido',

			iconCls:'menu_home',html : '<iframe id="frame-welcome" src="welcome.php" border="0" width="100%" height="100%" style="border:0 background-color: #fcf8f7"; ></iframe>'        
			}
    ]
});	