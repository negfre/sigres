
Ext.onReady(function() {
   var frmAplicacion = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmAplicacion',
       frame:true,
       url: 'cargarAplicacion.php',
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       //height : 430,
       items: [
       {
	 id: 'codAplicacion',
         fieldLabel: 'ID Aplicacion',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codAplicacion', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       },  
       {
         xtype:'fieldset', //************datos de la Aplicacion*************
         title: 'Datos del Aplicacion',
         collapsible: true,
         autoHeight:true,
         layout: 'form',
         items :[
         {
            layout:'column',
            items:[         
               {
                   columnWidth:.5,
                   layout: 'form',
                   items: [
                   {
                     xtype: 'textfield',
                     fieldLabel: 'Nombre',
                     name: 'nombreAplicacion',
                     id: 'nombreAplicacion',
                     allowBlank: false,
                     maxLength:50,
                     style: {textTransform: "uppercase"},
                     anchor:'90%',
                     emptyText: 'Nombre de la Aplicacion...' 
                   }              
                   ] //********columna 2*******
               },               
               {
                   columnWidth:.5,
                   layout: 'form',
                   items: [
                   {
                     xtype: 'combo',
                     id: 'cmbProveedor',
                     fieldLabel: 'Proveedor',
                     displayField: 'tx_nombre_proveedor',
                     valueField: 'co_proveedor',
                     emptyText:'Seleccione un Proveedor...',
                     allowBlank: false,
                     typeAhead: true,
                     forceSelection: true,
                     selectOnFocus:true,
                     triggerAction: 'all',
                     anchor:'90%',
                     mode: 'local',
                     store : new Ext.data.JsonStore({
                       url: 'datosSolicitados.php',
                       autoLoad: true,
                       root: 'datos',
                       baseParams: { 
                         datos: 'proveedor'
                       },
                       fields: [  
                         {name:'tx_nombre_proveedor'},  
                         {name:'co_proveedor'}  
                       ]  
                     })
                   }              
                   ] //********columna 1*******
               }                  
            ]         
         },
         {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              id: 'obsAplicacion',
              tyle: {textTransform: "uppercase"},
              //allowBlank: false,
              name: 'obsAplicacion'   
         }               
         ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmAplicacion').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codAplicacion').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var proveedorAplicacion=Ext.getCmp('cmbProveedor').getValue();
                 var observAplicacion=Ext.getCmp('obsAplicacion').getValue();
                 var nombreAplicacion=Ext.getCmp('nombreAplicacion').getValue(); 

                 Ext.getCmp('frmAplicacion').getForm().submit({
                 method: 'POST',
                 params:{ operacion:Oper,proveedorAplicacion:proveedorAplicacion,nombreAplicacion:nombreAplicacion,observAplicacion:observAplicacion}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     
                     Ext.getCmp('frmAplicacion').getForm().reset();
                     Ext.getCmp('cmbProveedor').clearValue();
                     Ext.getCmp('cmbProveedor').getStore().removeAll();
                     Ext.getCmp('cmbProveedor').store.reload();
                     
                     Ext.getCmp('gridAplicacion').store.reload();
                     Ext.getCmp('codAplicacion').setValue('0');
                     Ext.getCmp('codAplicacion').hide();
                         
                 },
                 failure: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.show({
                     title:'Error',
                     msg: data.errors.reason,
                     buttons: Ext.Msg.OK,
                     icon: Ext.MessageBox.ERROR
                   });  
                 }
              });
             }
             else{
                Ext.Msg.alert('Guardar','Los campos del formulario marcados en rojo son obligatorios!');
             }
            }
        },{
           xtype: 'button',
           text: 'Cancelar',
           handler: function(){
            Ext.getCmp('frmAplicacion').getForm().reset();
            
            Ext.getCmp('cmbProveedor').clearValue();
            Ext.getCmp('cmbProveedor').getStore().removeAll();
            Ext.getCmp('cmbProveedor').store.reload();           

            Ext.getCmp('codAplicacion').setValue('0');
            Ext.getCmp('codAplicacion').hide();
           }

        }]
    });
 
 
 //**********cargar del grid con las Aplicaciones cargadas********
   var storeAplicacion = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaAplicacion',
              z:30
        },
        fields: [  
           {name:'co_aplicacion'},
           {name:'tx_nombre_aplicacion'},
           {name:'co_proveedor'},
           {name:'tx_nombre_proveedor'},
           {name:'tx_obs_aplicacion'}
        ]  
        });
   storeAplicacion.load({params:{datos:'listaAplicacion',z:30,start:0,limit:50}});//z:30,start:0,limit:5,
   
   var pagerAplicacion = new Ext.PagingToolbar({
           store: storeAplicacion, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Aplicaciones Cargadas',
           emptyMsg: 'No hay Aplicaciones para mostrar',
           pageSize: 50
   });

   pagerAplicacion.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridAplicacion = new Ext.grid.GridPanel({
        store : storeAplicacion,
        id:'gridAplicacion',
        height:320,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_aplicacion', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_aplicacion', width:200, sortable:true}, //, hidden: true, hideable:false
            {header:'Proveedor', dataIndex:'tx_nombre_proveedor', width:250, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_aplicacion', width:200, sortable: true},
            {header:'Cod. Proveedor', dataIndex:'co_proveedor', width:100, sortable:true, hidden: true, hideable:false},

         ],
         tbar: pagerAplicacion, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridAplicacion.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                     Ext.getCmp('codAplicacion').setValue(sel.data.co_aplicacion); 
                     Ext.getCmp('codAplicacion').show();
                     Ext.getCmp('nombreAplicacion').setValue(sel.data.tx_nombre_aplicacion);
                     Ext.getCmp('cmbProveedor').setValue(sel.data.co_proveedor);
                     Ext.getCmp('obsAplicacion').setValue(sel.data.tx_obs_aplicacion);

                     Ext.getCmp('nombreAplicacion').focus();              
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }           
         ]         
      });
   
   var listaAplicacion = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
          xtype:'fieldset', //**************Aplicacion*******************
          title: 'Aplicaciones Registrados',
          collapsible: true,
          autoHeight:true,
          items :[
            gridAplicacion
          ]
       }
      ]
   }); //*********fin grid*****************
 
  var winAplicacion = new Ext.Panel({  
      id: 'winAplicacion',
      items: [
              frmAplicacion,
              listaAplicacion// lista
      ]
  });
  
   winAplicacion.render(document.body);
   Ext.getCmp('codAplicacion').hide();
   
});


