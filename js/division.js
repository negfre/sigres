
Ext.onReady(function() {
   
   var frmDivision = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmDivision',
       frame:true,
       url: 'cargarDivision.php', //**********************
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 499,
       items: [
       {
	 id: 'codDivision',
         fieldLabel: 'ID División',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codDivision', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       }, //**********fin usuario********
       {
        xtype:'fieldset', //***************usuario*******************
        title: 'Datos de la División',
        collapsible: true,
        autoHeight:true,
        items :[
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name: 'nombreDivision',
            id: 'nombreDivision',
            allowBlank: false,
            style: {textTransform: "uppercase"},
            maxLength:30,
              anchor:'70%',            
            emptyText: 'Nombre de la División...'
        },
        {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              style: {textTransform: "uppercase"},
              id: 'obsDivision',
              //allowBlank: false,
              name: 'obsDivision',
              mptyText: 'Observaciones de la Division...'
       
        }        
        ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmDivision').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codDivision').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var nombreDivision=Ext.getCmp('nombreDivision').getValue();
                 var obsDivision=Ext.getCmp('obsDivision').getValue();



                 Ext.getCmp('frmDivision').getForm().submit({						
                 method: 'POST',
                 params:{ operacion:Oper,nombreDivision:nombreDivision,obsDivision:obsDivision}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     Ext.getCmp('frmDivision').getForm().reset();
                     Ext.getCmp('gridDivision').store.reload();
                     Ext.getCmp('codDivision').setValue('0');
                     Ext.getCmp('codDivision').hide();
                         
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
            Ext.getCmp('frmDivision').getForm().reset();
            Ext.getCmp('codDivision').setValue('0');
            Ext.getCmp('codDivision').hide();
           }

        }]
    });
 
 //**********cargar del grid con las unidades de negocio registradas********
   var storeDivision = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaDivision',
              z:30
        },
        fields: [  
           {name:'co_division'},
           {name:'tx_nombre_division'},
           {name:'tx_obs_division'},         
        ]  
        });
   storeDivision.load({params:{datos:'listaDivision',z:30,start:0,limit:100}});//z:30,start:0,limit:5,
   
   var pagerDivision = new Ext.PagingToolbar({
           store: storeDivision, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Divisiones Registradas',
           emptyMsg: 'No hay Divisiones para mostrar',
           pageSize: 100
   });

   pagerDivision.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridDivision = new Ext.grid.GridPanel({
        store : storeDivision,
        id:'gridDivision',
        height:400,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_division', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_division', width:160, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_division', width:400, sortable: false}
         ],
         tbar: pagerDivision, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridDivision.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                  Ext.getCmp('codDivision').setValue(sel.data.co_division); 
                  Ext.getCmp('codDivision').show();
                  Ext.getCmp('nombreDivision').setValue(sel.data.tx_nombre_division);
                  Ext.getCmp('obsDivision').setValue(sel.data.tx_obs_division);
                  Ext.getCmp('nombreDivision').focus();
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }          
         ]         
      });
     
   var listaDivision = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
         xtype:'fieldset', //***************lista Divisiones*******************
         title: 'Divisiones Registradas',
         collapsible: true,
         autoHeight:true,
         items :[
           gridDivision
         ]
       }
      ]
   }); //*********fin grid*****************
 
   var winDivision = new Ext.Panel({  
      //layout: 'border',
      id: 'winDivision',
      items: [
              frmDivision,
              listaDivision// lista de Divisiones
      ]
   });
  
   winDivision.render(document.body);
   Ext.getCmp('codDivision').hide();
   
});


