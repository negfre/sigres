
Ext.onReady(function() {
   
   var frmUnidadNegocio = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmUnidadNegocio',
       frame:true,
       url: 'cargarUnidadNegocio.php', //**********************
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       items: [
       {
	 id: 'codUnidadNegocio',
         fieldLabel: 'ID UN',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codUnidadNegocio', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       }, //**********fin usuario********
       {
        xtype:'fieldset', //***************usuario*******************
        title: 'Datos de la Undiad de Negocio',
        collapsible: true,
        autoHeight:true,
        items :[
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name: 'nombreUnidadNegocio',
            id: 'nombreUnidadNegocio',
            allowBlank: false,
            maxLength:70,
            tyle: {textTransform: "uppercase"},
              anchor:'70%',            
            emptyText: 'Nombre de la Unidad de Negocio...'
        },
        {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              id: 'obsUnidadNegocio',
              tyle: {textTransform: "uppercase"},
              //allowBlank: false,
              maxLength:160,
              name: 'obsUnidadNegocio',
              mptyText: 'Observaciones de la Unidad de Negocio...'
       
        }        
        ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmUnidadNegocio').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codUnidadNegocio').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var nombreUnidadNegocio=Ext.getCmp('nombreUnidadNegocio').getValue();
                 var obsUnidadNegocio=Ext.getCmp('obsUnidadNegocio').getValue();



                 Ext.getCmp('frmUnidadNegocio').getForm().submit({						
                 method: 'POST',
                 params:{ operacion:Oper,nombreUnidadNegocio:nombreUnidadNegocio,obsUnidadNegocio:obsUnidadNegocio}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     Ext.getCmp('frmUnidadNegocio').getForm().reset();
                     Ext.getCmp('gridUnidadNegocio').store.reload();
                     Ext.getCmp('codUnidadNegocio').setValue('0');
                     Ext.getCmp('codUnidadNegocio').hide();
                         
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
        },
        {
           xtype: 'button',
           text: 'Cancelar',
           handler: function(){
            Ext.getCmp('frmUnidadNegocio').getForm().reset();
            Ext.getCmp('codUnidadNegocio').setValue('0');
            Ext.getCmp('codUnidadNegocio').hide();
           }

        }]
    });
 
 //**********cargar del grid con las unidades de negocio registradas********
   var storeUnidadNegocio = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaUnidadNegocio',
              z:30
        },
        fields: [  
           {name:'co_unidad_negocio'},
           {name:'tx_nombre_unidad_negocio'},
           {name:'tx_obs_unidad_negocio'},         
        ]  
        });
   storeUnidadNegocio.load({params:{datos:'listaUnidadNegocio',z:30,start:0,limit:100}});//z:30,start:0,limit:5,
   
   var pagerUnidadNegocio = new Ext.PagingToolbar({
           store: storeUnidadNegocio, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Unidades Registradas',
           emptyMsg: 'No hay Unidades de Negocio para mostrar',
           pageSize: 100
   });

   pagerUnidadNegocio.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridUnidadNegocio = new Ext.grid.GridPanel({
        store : storeUnidadNegocio,
        id:'gridUnidadNegocio',
        height:400,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_unidad_negocio', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_unidad_negocio', width:160, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_unidad_negocio', width:400, sortable: false}
         ],
         tbar: pagerUnidadNegocio, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridUnidadNegocio.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                  Ext.getCmp('codUnidadNegocio').setValue(sel.data.co_unidad_negocio); 
                  Ext.getCmp('codUnidadNegocio').show();
                  Ext.getCmp('nombreUnidadNegocio').setValue(sel.data.tx_nombre_unidad_negocio);
                  Ext.getCmp('obsUnidadNegocio').setValue(sel.data.tx_obs_unidad_negocio);
                  Ext.getCmp('nombreUnidadNegocio').focus();
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }          
         ]         
      });
     
   var listaUnidadNegocio = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
         xtype:'fieldset', //***************lista Unidades de Negocio*******************
         title: 'Unidades de Negocio Registradas',
         collapsible: true,
         autoHeight:true,
         items :[
           gridUnidadNegocio
         ]
       }
      ]
   }); //*********fin grid*****************
 
  var winUnidadNegocio = new Ext.Panel({  
      //layout: 'border',
      id: 'winUnidadNegocio',
      items: [
              frmUnidadNegocio,
              listaUnidadNegocio// lista de Unidades de Negocio
      ]
  });
  
   winUnidadNegocio.render(document.body);
   Ext.getCmp('codUnidadNegocio').hide();
   
});


