
Ext.onReady(function() {
   
   var frmProceso = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmProceso',
       frame:true,
       url: 'cargarProceso.php', //**********************
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       items: [
       {
	 id: 'codProceso',
         fieldLabel: 'ID Proceso',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codProceso', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       }, //**********fin usuario********
       {
        xtype:'fieldset', //***************usuario*******************
        title: 'Datos del Proceso',
        collapsible: true,
        autoHeight:true,
        items :[
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name: 'nombreProceso',
            id: 'nombreProceso',
            allowBlank: false,
            maxLength:30,
            style: {textTransform: "uppercase"},
              anchor:'70%',            
            emptyText: 'Nombre del Proceso...'
        },
        {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              id: 'obsProceso',
              style: {textTransform: "uppercase"},
              //allowBlank: false,
              name: 'obsProceso',
              mptyText: 'Observaciones del Proceso...'
       
        }        
        ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmProceso').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codProceso').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var nombreProceso=Ext.getCmp('nombreProceso').getValue();
                 var obsProceso=Ext.getCmp('obsProceso').getValue();



                 Ext.getCmp('frmProceso').getForm().submit({						
                 method: 'POST',
                 params:{ operacion:Oper,nombreProceso:nombreProceso,obsProceso:obsProceso}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     Ext.getCmp('frmProceso').getForm().reset();
                     Ext.getCmp('gridProceso').store.reload();
                     Ext.getCmp('codProceso').setValue('0');
                     Ext.getCmp('codProceso').hide();
                         
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
            Ext.getCmp('frmProceso').getForm().reset();
            Ext.getCmp('codProceso').setValue('0');
            Ext.getCmp('codProceso').hide();
           }

        }]
    });
 
 //**********cargar del grid con los Proceso registradas********
   var storeProceso = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaProceso',
              z:30
        },
        fields: [  
           {name:'co_proceso'},
           {name:'tx_nombre_proceso'},
           {name:'tx_obs_proceso'},         
        ]  
        });
   storeProceso.load({params:{datos:'listaProceso',z:30,start:0,limit:100}});//z:30,start:0,limit:5,
   
   var pagerProceso = new Ext.PagingToolbar({
           store: storeProceso, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Procesos Registrados',
           emptyMsg: 'No hay Procesos para mostrar',
           pageSize: 100
   });

   pagerProceso.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridProceso = new Ext.grid.GridPanel({
        store : storeProceso,
        id:'gridProceso',
        height:400,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_proceso', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_proceso', width:350, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_proceso', width:300, sortable: false}
         ],
         tbar: pagerProceso, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridProceso.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                  Ext.getCmp('codProceso').setValue(sel.data.co_proceso); 
                  Ext.getCmp('codProceso').show();
                  Ext.getCmp('nombreProceso').setValue(sel.data.tx_nombre_proceso);
                  Ext.getCmp('obsProceso').setValue(sel.data.tx_obs_proceso);
                  Ext.getCmp('nombreProceso').focus();
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }          
         ]         
      });
     
   var listaProceso = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
         xtype:'fieldset', //***************lista Proceso*******************
         title: 'Procesos Registrados',
         collapsible: true,
         autoHeight:true,
         items :[
           gridProceso
         ]
       }
      ]
   }); //*********fin grid*****************
 
   var winProceso = new Ext.Panel({  
      //layout: 'border',
      id: 'winProceso',
      items: [
              frmProceso,
              listaProceso// lista de Procesos
      ]
   });
  
   winProceso.render(document.body);
   Ext.getCmp('codProceso').hide();
   
});


