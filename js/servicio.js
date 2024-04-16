
Ext.onReady(function() {
   
   var frmServicio = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmServicio',
       frame:true,
       url: 'cargarServicio.php', //**********************
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       items: [
       {
	 id: 'codServicio',
         fieldLabel: 'ID Servicio',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codServicio', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         style: {textTransform: "uppercase"},
         readOnly: true
       }, //**********fin usuario********
       {
        xtype:'fieldset', //***************usuario*******************
        title: 'Datos del Servicio',
        collapsible: true,
        autoHeight:true,
        items :[
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name: 'nombreServicio',
            id: 'nombreServicio',
            allowBlank: false,
            style: {textTransform: "uppercase"},
            maxLength:150,
              anchor:'70%',            
            emptyText: 'Nombre del Servicio...'
        },
        {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              style: {textTransform: "uppercase"},
              id: 'obsServicio',
              //allowBlank: false,
              name: 'obsServicio',
              mptyText: 'Observaciones del Servicio...'
       
        }        
        ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmServicio').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codServicio').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var nombreServicio=Ext.getCmp('nombreServicio').getValue();
                 var obsServicio=Ext.getCmp('obsServicio').getValue();



                 Ext.getCmp('frmServicio').getForm().submit({						
                 method: 'POST',
                 params:{ operacion:Oper,nombreServicio:nombreServicio,obsServicio:obsServicio}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     Ext.getCmp('frmServicio').getForm().reset();
                     Ext.getCmp('gridServicio').store.reload();
                     Ext.getCmp('codServicio').setValue('0');
                     Ext.getCmp('codServicio').hide();
                         
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
            Ext.getCmp('frmServicio').getForm().reset();
            Ext.getCmp('codServicio').setValue('0');
            Ext.getCmp('codServicio').hide();
           }

        }]
    });
 
 //**********cargar del grid con los Servicio registradas********
   var storeServicio = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaServicio',
              z:30
        },
        fields: [  
           {name:'co_servicio'},
           {name:'tx_nombre_servicio'},
           {name:'tx_obs_servicio'},         
        ]  
        });
   storeServicio.load({params:{datos:'listaServicio',z:30,start:0,limit:100}});//z:30,start:0,limit:5,
   
   var pagerServicio = new Ext.PagingToolbar({
           store: storeServicio, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Servicios Registrados',
           emptyMsg: 'No hay Servicios para mostrar',
           pageSize: 100
   });

   pagerServicio.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridServicio = new Ext.grid.GridPanel({
        store : storeServicio,
        id:'gridServicio',
        height:400,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_servicio', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_servicio', width:700, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_servicio', width:200, sortable: false}
         ],
         tbar: pagerServicio, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridServicio.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                  Ext.getCmp('codServicio').setValue(sel.data.co_servicio); 
                  Ext.getCmp('codServicio').show();
                  Ext.getCmp('nombreServicio').setValue(sel.data.tx_nombre_servicio);
                  Ext.getCmp('obsServicio').setValue(sel.data.tx_obs_servicio);
                  Ext.getCmp('nombreServicio').focus();
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }          
         ]         
      });
     
   var listaServicio = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
         xtype:'fieldset', //***************lista Servicio*******************
         title: 'Servicios Registrados',
         collapsible: true,
         autoHeight:true,
         items :[
           gridServicio
         ]
       }
      ]
   }); //*********fin grid*****************
 
   var winServicio = new Ext.Panel({  
      //layout: 'border',
      id: 'winServicio',
      items: [
              frmServicio,
              listaServicio// lista de Servicios
      ]
   });
  
   winServicio.render(document.body);
   Ext.getCmp('codServicio').hide();
   
});


