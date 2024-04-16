
Ext.onReady(function() {
   
   var frmMedida = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmMedida',
       frame:true,
       url: 'cargarMedida.php', //**********************
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 500,
       items: [
       {
	 id: 'codMedida',
         fieldLabel: 'ID Medida',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codMedida', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       }, //**********fin usuario********
       {
        xtype:'fieldset', //***************usuario*******************
        title: 'Datos de la Medida',
        collapsible: true,
        autoHeight:true,
        items :[
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name: 'nombreMedida',
            id: 'nombreMedida',
            allowBlank: false,
            maxLength:50,
            style: {textTransform: "uppercase"},
              anchor:'70%',            
            emptyText: 'Nombre de la Medida...'
        }       
        ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmMedida').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codMedida').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var nombreMedida=Ext.getCmp('nombreMedida').getValue();
                 


                 Ext.getCmp('frmMedida').getForm().submit({						
                 method: 'POST',
                 params:{ operacion:Oper,nombreMedida:nombreMedida}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     Ext.getCmp('frmMedida').getForm().reset();
                     Ext.getCmp('gridMedida').store.reload();
                     Ext.getCmp('codMedida').setValue('0');
                     Ext.getCmp('codMedida').hide();
                         
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
            Ext.getCmp('frmMedida').getForm().reset();
            Ext.getCmp('codMedida').setValue('0');
            Ext.getCmp('codMedida').hide();
           }

        }]
    });
 
 //**********cargar del grid con las unidades de negocio registradas********
   var storeMedida = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaMedida',
              z:30
        },
        fields: [  
           {name:'co_unidad_medida'},
           {name:'tx_nombre_medida'}         
        ]  
        });
   storeMedida.load({params:{datos:'listaMedida',z:30,start:0,limit:100}});//z:30,start:0,limit:5,
   
   var pagerMedida = new Ext.PagingToolbar({
           store: storeMedida, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Medidas Registradas',
           emptyMsg: 'No hay Medidas para mostrar',
           pageSize: 100
   });

   pagerMedida.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridMedida = new Ext.grid.GridPanel({
        store : storeMedida,
        id:'gridMedida',
        height:400,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_unidad_medida', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_medida', width:200, sortable: true}
         ],
         tbar: pagerMedida, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridMedida.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                  Ext.getCmp('codMedida').setValue(sel.data.co_unidad_medida); 
                  Ext.getCmp('codMedida').show();
                  Ext.getCmp('nombreMedida').setValue(sel.data.tx_nombre_medida);
                  Ext.getCmp('nombreMedida').focus();
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }          
         ]         
      });
     
   var listaMedida = new Ext.Panel({
      layout: 'fit',
      width: 500,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
         xtype:'fieldset', //***************lista Medidas*******************
         title: 'Medidas Registradas',
         collapsible: true,
         autoHeight:true,
         items :[
           gridMedida
         ]
       }
      ]
   }); //*********fin grid*****************
 
   var winMedida = new Ext.Panel({  
      //layout: 'border',
      id: 'winMedida',
      items: [
              frmMedida,
              listaMedida// lista de Medidaes
      ]
   });
  
   winMedida.render(document.body);
   Ext.getCmp('codMedida').hide();
   
});


