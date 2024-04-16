Ext.onReady(function() {
   var frmProveedor = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmProveedor',
       frame:true,
       url: 'cargarProveedor.php',
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       //height : 430,
       items: [
       {
	 id: 'codProveedor',
         fieldLabel: 'Proveedor Nro',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codProveedor', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       },  
       {
         xtype:'fieldset', //************datos del Proveedor*************
         title: 'Datos del Proveedor',
         collapsible: true,
         autoHeight:true,
         layout: 'form',
         items :[
         {
             layout:'column',
             items:[
             {
                columnWidth:.30,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Nombre',
                  name: 'nombreProveedor',
                  id: 'nombreProveedor',
                  maxLength:50,
                  style: {textTransform: "uppercase"},
                  allowBlank: false,
                  emptyText: 'Nombre del Proveedor...'
                }
                ] //********columna 1*******
             },               
             {
                columnWidth:.30,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Contacto',
                  name: 'contactoProveedor',
                  id: 'contactoProveedor',
                  maxLength:50,
                  style: {textTransform: "uppercase"},
                  emptyText: 'Persona Contacto...'
                }
                ] //********columna 2*******
             },
             {
                 columnWidth:.3,
                 layout: 'form',
                 items: [
                  {
                    xtype: 'textfield',
                    fieldLabel: 'Teléfono',
                    name: 'telefonoProveedor',
                    id: 'telefonoProveedor',
                    maxLength:13,
                    style: {textTransform: "uppercase"},
                    emptyText: 'Teléfono del Proveedor...'
                }
                 ] //********columna 3*******
             }
             ]         
         },
         {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              id: 'obsProveedor',
              style: {textTransform: "uppercase"},
              //allowBlank: false,
              name: 'obsProveedor'   
         }               
         ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmProveedor').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codProveedor').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var obserProveedor=Ext.getCmp('obsProveedor').getValue();
                 var nombreProveedor=Ext.getCmp('nombreProveedor').getValue();
                 var contacProveedor=Ext.getCmp('contactoProveedor').getValue(); 
                 var telProveedor=Ext.getCmp('telefonoProveedor').getValue();

                 Ext.getCmp('frmProveedor').getForm().submit({						
                 method: 'POST',
                 params:{ operacion:Oper,obserProveedor:obserProveedor,nombreProveedor:nombreProveedor,telProveedor:telProveedor,contacProveedor:contacProveedor}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                        
                     Ext.getCmp('frmProveedor').getForm().reset();
                     
                     Ext.getCmp('gridProveedor').store.reload();
                     Ext.getCmp('codProveedor').setValue('0');
                     Ext.getCmp('codProveedor').hide();
                         
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
            Ext.getCmp('frmProveedor').getForm().reset();

            Ext.getCmp('codProveedor').setValue('0');
            Ext.getCmp('codProveedor').hide();
           }

        }]
    });
 
 
 //**********cargar del grid con los Proveedores cargados********
   var storeProveedor = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaProveedor',
              z:30
        },
        fields: [  
           {name:'co_proveedor'},
           {name:'tx_nombre_proveedor'},
           {name:'tx_contacto_proveedor'},           
           {name:'tx_telefono_proveedor'},
           {name:'tx_obs_proveedor'}
        ]  
        });
   storeProveedor.load({params:{datos:'listaProveedor',z:30,start:0,limit:50}});//z:30,start:0,limit:5,
   
   var pagerProveedor = new Ext.PagingToolbar({
           store: storeProveedor, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Proveedores Cargados',
           emptyMsg: 'No hay Proveedores para mostrar',
           pageSize: 50
   });

   pagerProveedor.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridProveedor = new Ext.grid.GridPanel({
        store : storeProveedor,
        id:'gridProveedor',
        height:320,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_proveedor', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_proveedor', width:200, sortable:true}, //, hidden: true, hideable:false
            {header:'Contacto', dataIndex:'tx_contacto_proveedor', width:130, sortable: true},
            {header:'Teléfono', dataIndex:'tx_telefono_proveedor', width:100, sortable: true},            
            {header:'Observaciones', dataIndex:'tx_obs_proveedor', width:200, sortable: true}
         ],
         tbar: pagerProveedor, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridProveedor.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                     Ext.getCmp('codProveedor').setValue(sel.data.co_proveedor); 
                     Ext.getCmp('codProveedor').show();
                     Ext.getCmp('obsProveedor').setValue(sel.data.tx_obs_proveedor);
                     Ext.getCmp('nombreProveedor').setValue(sel.data.tx_nombre_proveedor);
                     Ext.getCmp('contactoProveedor').setValue(sel.data.tx_contacto_proveedor);
                     Ext.getCmp('telefonoProveedor').setValue(sel.data.tx_telefono_proveedor);                     
                     Ext.getCmp('nombreProveedor').focus();                     
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }           
         ]         
      });
   
   var listaProveedor = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
          xtype:'fieldset', //***************Proveedor*******************
          title: 'Proveedores Registrados',
          collapsible: true,
          autoHeight:true,
          items :[
            gridProveedor
          ]
       }
      ]
   }); //*********fin grid*****************
 
  var winProveedor = new Ext.Panel({  
      id: 'winProveedor',
      items: [
              frmProveedor,
              listaProveedor// listaProveedor
      ]
  });
  
   winProveedor.render(document.body);
   Ext.getCmp('codProveedor').hide();
   
});


