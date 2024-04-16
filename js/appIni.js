
Ext.onReady(function(){
  //Indicador de Cargando
  setTimeout(function(){
     Ext.get('loading').remove();
     Ext.get('loading-mask').fadeOut({remove:true});
  }, 250);
  Ext.form.Field.prototype.msgTarget = 'side';
  
  Ext.Ajax.request({
    url: 'datosAnalista.php',
    success: function(response){
      var info = Ext.decode(response.responseText);
      //**********************************
      var loadTreeMask = null;
    
      //definicion del menu
      var mn_Principal= {
	id:'menu_principal',
	xtype: 'treepanel',
	title:'Men&uacute; Principal',
	iconCls:'x-icon-menu-horario',
	rootVisible: false,
	lines: false,
	singleExpand: false,
	useArrows: true,
	autoScroll : true,
	isExpandTag : true,
	listeners: {
	  click : {
	    scope : this,
	    fn : function( n, e ) {
	      if (!n.hasChildNodes()){
		if (n.attributes.url){
		  url = n.attributes.url;
		}
		else {
		    url = n.id+'/'+n.id+'.html';
		}
	        tabpanel.addTab(n.id, n.text,url,n.attributes.tabType);
	      }
	      else{
	        if (n.isExpanded()){
		  n.collapse();
		}
		else{
		  n.expand();
		}
	      }
	    }
	  }
	},
	loader: new Ext.tree.TreeLoader({
	  dataUrl:'treeMenu.php'
	}),
	root: new Ext.tree.AsyncTreeNode({
	  expanded  :true
	})
      }
         //contenedor del menu
      var navigation = {
	iconCls:'logoIconUsp',
	title: 'SIGRES V3.0',
	region: 'west',
	id:'navigation',
	split:true,
	width: 235,
	minSize: 175,
	maxSize: 400,
	margins:'0 0 3 3',
	collapsible: true,
	layout:'accordion',
	layoutConfig:{
	  animate:false
        },
        items: [mn_Principal]	
      }
	
      //************************
      Ext.ux.IFrameComponent = Ext.extend(Ext.BoxComponent, {
	 onRender : function(ct, position){
	    this.el = ct.createChild({tag: 'iframe', id: 'iframe-'+ this.id, frameBorder: 0, src: this.url});
	 }
      });
      //funcion para conformar el cierre de la sesion
   
      function confirmarCerrar(){
	Ext.MessageBox.confirm('Confirmar','¿Seguro que desea cerrar sesi&oacute;n?', cerrarSesion);
      }

      //funcion para cerrar la sesion
      function cerrarSesion(btn){
	if(btn=='yes'){
	  Ext.Ajax.request({
	    url: 'cerrarSesion.php',
	    waitMsg: 'Cerrando Sesi&oacute;n..',
	    //params: {
	    //   task: "CERRARSESION"
	    //  },
	    success: function(response){
	       document.location.href="index.html"
	    }
	  });
	}
      }
      
      //definicion del tabPanel
      var mytabpanel = Ext.extend(Ext.TabPanel, {
	initComponent: function(){
	  mytabpanel.superclass.initComponent.apply(this, arguments);
	},
	addTab: function (id,title,url,type){
	  var open = !this.getItem(id);
	  if (open){
	    switch (type){
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
		//Cargamos la pesta�a por ajax
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
	        this.setActiveTab(id);
	        Ext.Msg.alert('Aviso','Seleccione un opci&oacute;n valida')
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
      Ext.reg('mytabpanel', mytabpanel);
   
      //Configurando tabPanel
      var tabpanel = new mytabpanel({
        //creamos el statusbar y le decimos ls componentes a tener
        bbar: new Ext.Toolbar({
	  id: 'basic-statusbar',
	  iconCls:'an-icon',
          items: [
	  {
	    id : 'tbUser',
	    iconCls : 'x-icon-menu-user',
	    text : info.nombre
	  },'-',
	  {
	    iconCls : 'x-icon-calendario',
	    id : 'tbFrmeWorkFecha',
	    text : new Date().format('d/m/Y')
	  },'-',
	  {
	    id : 'tbFrmeWorkClock',
	    iconCls :'x-icon-reloj',
	    text : new Date().format('g:i:s A')
	  },'-',
	  {
	    id : 'chkFrmWrkSession',
	    xtype : 'button',
	    iconCls :'x-icon-cerrar-sesion',
	    text : 'Cerrar Sesi&oacute;n',
	    listeners : {
		'click': function(scope, valor){
		  confirmarCerrar();
		}
	    }
	  },
	  {
	    id :'indicadorAnalista',
	    xtype :'hidden',//<-- campo oculto (hidden)
	    name :'indicadorAnalista', //el nombre con que se envia al servidor
	    value : info.indicador//el valor que contendr�
	  },
	  {
	    id      :'nivelAnalista',
	    xtype   :'hidden',//<-- campo oculto (hidden)
	    name    :'nivelAnalista', //el nombre con que se envia al servidor
	    value   : info.nivel//el valor que contendr�
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
	autoScroll : true,
	activeItem: 0,
	region:'center',
	margins: '0 3 3 0',
	items:[
	{
	  title: 'Bienvenido',
	  iconCls:'menu_home',html : '<iframe id="frame-welcome" src="bienvenida.php" border="0" width="100%" height="100%" style="border:0" ></iframe>'
	}
	]
      });
      
   
      //Generamos el viewport
      var viewport = new Ext.Viewport({
         layout:'border',
         defaults: {
           split: false
         },
         items: [
         {
          xtype: 'box',
          region: 'north',
          applyTo: 'header',
	  	  height:90
         }
         ,navigation,tabpanel
	 ],
	 listeners   : {
	   'afterrender'   : function (compontente){
	     (function(){ }).defer(6000);
	   }
         }
      });
    } //success
  }); //ajax
});
