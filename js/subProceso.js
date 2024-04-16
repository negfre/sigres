
Ext.onReady(function() {
   var frmSubProceso = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmSubProceso',
       frame:true,
       url: 'cargarSubProceso.php',
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       //height : 430,
       items: [
       {
	 id: 'codSubProceso',
         fieldLabel: 'ID SubProceso',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codSubProceso', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       },  
       {
         xtype:'fieldset', //************datos del SubProceso*************
         title: 'Datos del SubProceso',
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
                     name: 'nombreSubProceso',
                     id: 'nombreSubProceso',
                     allowBlank: false,
                     maxLength:50,
                     style: {textTransform: "uppercase"},
                     anchor:'90%',
                     emptyText: 'Nombre del SubProceso...' 
                   }              
                   ] //********columna 2*******
               },               
               {
                   columnWidth:.5,
                   layout: 'form',
                   items: [
                   {
                     xtype: 'combo',
                     id: 'cmbProceso',
                     fieldLabel: 'Proceso',
                     displayField: 'tx_nombre_proceso',
                     valueField: 'co_proceso',
                     emptyText:'Seleccione un Proceso...',
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
                         datos: 'proceso'
                       },
                       fields: [  
                         {name:'tx_nombre_proceso'},  
                         {name:'co_proceso'}  
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
              id: 'obsSubProceso',
              style: {textTransform: "uppercase"},
              //allowBlank: false,
              name: 'obsSubProceso'   
         }               
         ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmSubProceso').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codSubProceso').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var procesoSubProceso=Ext.getCmp('cmbProceso').getValue();
                 var obsSubProceso=Ext.getCmp('obsSubProceso').getValue();
                 var nombreSubProceso=Ext.getCmp('nombreSubProceso').getValue(); 

                 Ext.getCmp('frmSubProceso').getForm().submit({
                 method: 'POST',
                 params:{ operacion:Oper,procesoSubProceso:procesoSubProceso,nombreSubProceso:nombreSubProceso,obsSubProceso:obsSubProceso}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     
                     Ext.getCmp('frmSubProceso').getForm().reset();
                     Ext.getCmp('cmbProceso').clearValue();
                     Ext.getCmp('cmbProceso').getStore().removeAll();
                     Ext.getCmp('cmbProceso').store.reload();
                     
                     Ext.getCmp('gridSubProceso').store.reload();
                     Ext.getCmp('codSubProceso').setValue('0');
                     Ext.getCmp('codSubProceso').hide();
                         
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
            Ext.getCmp('frmSubProceso').getForm().reset();
            
            Ext.getCmp('cmbProceso').clearValue();
            Ext.getCmp('cmbProceso').getStore().removeAll();
            Ext.getCmp('cmbProceso').store.reload();           

            Ext.getCmp('codSubProceso').setValue('0');
            Ext.getCmp('codSubProceso').hide();
           }

        }]
    });
 
 
 //**********cargar del grid con las SubProceso cargadas********
   var storeSubProceso = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaSubProceso',
              z:30
        },
        fields: [  
           {name:'co_subproceso'},
           {name:'tx_nombre_subproceso'},
           {name:'co_proceso'},
           {name:'tx_nombre_proceso'},
           {name:'tx_obs_subproceso'}
        ]  
        });
   storeSubProceso.load({params:{datos:'listaSubProceso',z:30,start:0,limit:50}});//z:30,start:0,limit:5,
   
   var pagerSubProceso = new Ext.PagingToolbar({
           store: storeSubProceso, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} SubProcesos Cargados',
           emptyMsg: 'No hay SubProcesos para mostrar',
           pageSize: 50
   });

   pagerSubProceso.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridSubProceso = new Ext.grid.GridPanel({
        store : storeSubProceso,
        id:'gridSubProceso',
        height:320,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_subproceso',  width:60, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_subproceso', width:350, sortable:true}, //, hidden: true, hideable:false
            {header:'Proceso', dataIndex:'tx_nombre_proceso', width:200, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_subproceso', width:200, sortable: true},
            {header:'Cod. Proceso', dataIndex:'co_proceso', width:100, sortable:true, hidden: true, hideable:false},

         ],
         tbar: pagerSubProceso, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridSubProceso.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                     Ext.getCmp('codSubProceso').setValue(sel.data.co_subproceso); 
                     Ext.getCmp('codSubProceso').show();
                     Ext.getCmp('nombreSubProceso').setValue(sel.data.tx_nombre_subproceso);
                     Ext.getCmp('cmbProceso').setValue(sel.data.co_proceso);
                     Ext.getCmp('obsSubProceso').setValue(sel.data.tx_obs_subproceso);

                     Ext.getCmp('nombreSubProceso').focus();              
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }           
         ]         
      });
   
   var listaSubProceso = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
          xtype:'fieldset', //**************SubProceso*******************
          title: 'SubProcesos Registrados',
          collapsible: true,
          autoHeight:true,
          items :[
            gridSubProceso
          ]
       }
      ]
   }); //*********fin grid*****************
 
  var winSubProceso = new Ext.Panel({  
      id: 'winSubProceso',
      items: [
              frmSubProceso,
              listaSubProceso// lista
      ]
  });
  
   winSubProceso.render(document.body);
   Ext.getCmp('codSubProceso').hide();
   
});


