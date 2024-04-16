
Ext.onReady(function() {
   var frmActividad = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmActividad',
       frame:true,
       url: 'cargarActividad.php',
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       //height : 430,
       items: [
       {
	 id: 'codActividad',
         fieldLabel: 'ID Actividad',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codActividad', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       },  
       {
         xtype:'fieldset', //************datos del proyecto*************
         title: 'Datos de la Actividad',
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
                     name: 'nombreActividad',
                     id: 'nombreActividad',
                     allowBlank: false,
                     maxLength:200,
                     tyle: {textTransform: "uppercase"},
                     anchor:'90%',
                     emptyText: 'Nombre de la Actividad...'                     
                   }              
                   ] //********columna 2*******
               },               
               {
                   columnWidth:.5,
                   layout: 'form',
                   items: [
                   {
                     xtype: 'combo',
                     id: 'cmbServicio',
                     fieldLabel: 'Servicio',
                     displayField: 'tx_nombre_servicio',
                     valueField: 'co_servicio',
                     emptyText:'Seleccione un Servicio...',
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
                         datos: 'servicio'
                       },
                       fields: [  
                         {name:'tx_nombre_servicio'},  
                         {name:'co_servicio'}  
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
              id: 'obsActividad',
              tyle: {textTransform: "uppercase"},
              //allowBlank: false,
              name: 'obsActividad'   
         }               
         ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmActividad').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codActividad').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var servicio=Ext.getCmp('cmbServicio').getValue();
                 var obsActividad=Ext.getCmp('obsActividad').getValue();
                 var nombreActividad=Ext.getCmp('nombreActividad').getValue(); 

                 Ext.getCmp('frmActividad').getForm().submit({
                 method: 'POST',
                 params:{ operacion:Oper,servicio:servicio,nombreActividad:nombreActividad,obsActividad:obsActividad}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     
                     Ext.getCmp('frmActividad').getForm().reset();
                     Ext.getCmp('cmbServicio').clearValue();
                     Ext.getCmp('cmbServicio').getStore().removeAll();
                     Ext.getCmp('cmbServicio').store.reload();
                     
                     Ext.getCmp('gridActividad').store.reload();
                     Ext.getCmp('codActividad').setValue('0');
                     Ext.getCmp('codActividad').hide();
                         
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
            Ext.getCmp('frmActividad').getForm().reset();
            
            Ext.getCmp('cmbServicio').clearValue();
            Ext.getCmp('cmbServicio').getStore().removeAll();
            Ext.getCmp('cmbServicio').store.reload();           

            Ext.getCmp('codActividad').setValue('0');
            Ext.getCmp('codActividad').hide();
           }

        }]
    });
 
 
 //**********cargar del grid con las actividades cargadas********
   var storeActividad = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaActividad',
              z:30
        },
        fields: [  
           {name:'co_actividad'},
           {name:'tx_nombre_actividad'},
           {name:'co_servicio'},
           {name:'tx_nombre_servicio'},
           {name:'tx_obs_actividad'}
        ]  
        });
   storeActividad.load({params:{datos:'listaActividad',z:30,start:0,limit:50}});//z:30,start:0,limit:5,
   
   var pagerActividad = new Ext.PagingToolbar({
           store: storeActividad, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Actividades Cargadas',
           emptyMsg: 'No hay Actividades para mostrar',
           pageSize: 50
   });

   pagerActividad.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridActividad = new Ext.grid.GridPanel({
        store : storeActividad,
        id:'gridActividad',
        height:320,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_actividad', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_actividad', width:320, sortable:true}, //, hidden: true, hideable:false
            {header:'Servicio', dataIndex:'tx_nombre_servicio', width:500, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_actividad', width:200, sortable: true},
            {header:'Cod. Servicio', dataIndex:'co_servicio', width:100, sortable:true, hidden: true, hideable:false},

         ],
         tbar: pagerActividad, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridActividad.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                     Ext.getCmp('codActividad').setValue(sel.data.co_actividad); 
                     Ext.getCmp('codActividad').show();
                     Ext.getCmp('nombreActividad').setValue(sel.data.tx_nombre_actividad);
                     Ext.getCmp('cmbServicio').setValue(sel.data.co_servicio);
                     Ext.getCmp('obsActividad').setValue(sel.data.tx_obs_actividad);

                     Ext.getCmp('nombreActividad').focus();              
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }           
         ]         
      });
   
   var listaActividad = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
          xtype:'fieldset', //*************Actividades*******************
          title: 'Actividades Registradas',
          collapsible: true,
          autoHeight:true,
          items :[
            gridActividad
          ]
       }
      ]
   }); //*********fin grid*****************
 
  var winActividad = new Ext.Panel({  
      id: 'winProyectos',
      items: [
              frmActividad,
              listaActividad// lista Actividad
      ]
  });
  
   winActividad.render(document.body);
   Ext.getCmp('codActividad').hide();
   
});


