
Ext.onReady(function() {
   

 //**********cargar del grid con los analistas registrados********
   var storeAnalista = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaAnalistas',
              z:30
        },
        fields: [  
           {name:'co_analista'},
           {name:'tx_nombre'},
           {name:'tx_indicador_analista'},
           {name:'tx_cedula_analista'},
           {name:'fecha_nacimiento'},
           {name:'tx_supervisor'},
           {name:'tx_extension_analista'},
           {name:'tx_celular_analista'},
           {name:'tx_oficina_analista'},
           {name:'tx_nombre_subproceso'},
           {name:'activo'}
        ]  
        });
   storeAnalista.load({params:{datos:'listaAnalistas',z:30,start:0,limit:100}});//z:30,start:0,limit:5,
   
   var pagerAnalista = new Ext.PagingToolbar({
           store: storeAnalista, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Analistas Registrados',
           emptyMsg: 'No hay analistas para mostrar',
           pageSize: 100
   });

   pagerAnalista.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridAnalistas = new Ext.grid.GridPanel({
        store : storeAnalista,
        id:'gridAnalista',
        height:650,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_analista', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre y Apellido', dataIndex:'tx_nombre', width:150, sortable: true},            
            {header:'Indicador', dataIndex:'tx_indicador_analista', width:100, sortable:true},
            {header:'Cédula', dataIndex:'tx_cedula_analista', width:80, align:'right', sortable: true},            
            {header:'Sub-Proceso', dataIndex:'tx_nombre_subproceso', width:200, sortable: true},            
            {header:'Supervisor', dataIndex:'tx_supervisor',width:160, sortable: true},
            {header:'Fecha de Nac.', dataIndex:'fecha_nacimiento',width:80, align:'right', sortable: true},
            {header:'Extension', dataIndex:'tx_extension_analista',width:80, align:'right', sortable: true},            
            {header:'Celular', dataIndex:'tx_celular_analista', width:100, align:'right', sortable: true},
            {header:'Oficna', dataIndex:'tx_oficina_analista', width:150, sortable: true},
            {header:'Estatus', dataIndex:'activo', width:50, sortable: true},
         ],
         tbar: pagerAnalista, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true      
      });
     
   var listaAnalistas = new Ext.Panel({
      layout: 'fit',
      width: 900,
      height:700,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
         xtype:'fieldset', //***************lista analista*******************
         title: 'Analistas Registrados',
         collapsible: true,
         autoHeight:true,
         items :[
           gridAnalistas
         ]
       }
      ]
   }); //*********fin grid*****************
 
  var winAnalista = new Ext.Panel({  
      //layout: 'border',
      id: 'winAnalista',
      items: [
              listaAnalistas// lista de Analistas
      ]
  });
  
   winAnalista.render(document.body);
   
});


