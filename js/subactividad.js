Ext.onReady(function() {
   var frmSubactividad = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmSubactividad',
       frame:true,
       url: 'cargarSubactividad.php',
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       //height : 620,
      //autoScroll : true,
       items: [
       {
	 id: 'codSubactividad',
         fieldLabel: 'SubActividad Nro',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codSubactividad', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       },  
       {
        xtype:'fieldset', //***************Subactividad*******************
        title: 'Sub-Actividad',
        collapsible: true,
        autoHeight:true,
        items :[
         {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name: 'nombreSubactividad',
            id: 'nombreSubactividad',
            allowBlank: false,
            //maxLength:100,
            //style: {textTransform: "uppercase"},
            anchor:'90%',
            emptyText: 'Nombre de la SubActividad...'                           
         },
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
           }),
            listeners: {
              'select': function(c,r,i){
                Ext.getCmp('cmbActividad').clearValue();
                Ext.getCmp('cmbActividad').getStore().removeAll();
                st = Ext.getCmp('cmbActividad').getStore();
                st.load({
                  params:{
                    co_servicio: r.data.co_servicio
                  }
                })
              }
            }
         },         
         {
            xtype: 'combo',
            layout: 'form',            
            id: 'cmbActividad',
            fieldLabel: 'Actividad',
            displayField: 'tx_nombre_actividad',
            valueField: 'co_actividad',
            emptyText:'Seleccione una Actividad...',
            allowBlank: false,
            typeAhead: true,
            selectOnFocus:true,
            editable: true,
            forceSelection: true,               
            triggerAction: 'all',
            anchor:'92%',
            mode: 'local',
            store : new Ext.data.JsonStore({
              url: 'datosSolicitados.php',
              //autoLoad: true,
              root: 'datos',
              baseParams: {
                datos: 'actividad'
              },
              fields: [  
                {name:'co_actividad'},
                {name:'tx_nombre_actividad'}   
              ]  
            })
        },
        {
            xtype: 'combo',
            layout: 'form',
            id: 'cmbIndicador',
            fieldLabel: 'Indicador de Gestión',
            displayField: 'tx_nombre_indicador_gestion',
            valueField: 'co_indicador_gestion',
            emptyText:'Seleccione un Indicador...',
            allowBlank: false,
            typeAhead: true,
            forceSelection: true,
            selectOnFocus:true,
            triggerAction: 'all',
            anchor:'95%',
            mode: 'local',
            store : new Ext.data.JsonStore({
              url: 'datosSolicitados.php',
              autoLoad: true,
              root: 'datos',
              baseParams: {
                datos: 'indicador'
              },
              fields: [  
                {name:'tx_nombre_indicador_gestion'},  
                {name:'co_indicador_gestion'}  
              ]  
            })
         },
         {
            xtype: 'combo',
            id: 'cmbMatriz',
            fieldLabel: 'Matriz de Datos',
            displayField: 'tx_nombre_dato_matriz',
            valueField: 'co_dato_matriz',
            emptyText:'Seleccione un valor en Matriz de Datos...',
            allowBlank: false,
            typeAhead: true,
            forceSelection: true,
            selectOnFocus:true,
            triggerAction: 'all',
            anchor:'95%',
            mode: 'local',
            store : new Ext.data.JsonStore({
              url: 'datosSolicitados.php',
              autoLoad: true,
              root: 'datos',
              baseParams: {
                datos: 'datoMatriz'
              },
              fields: [  
                {name:'tx_nombre_dato_matriz'},  
                {name:'co_dato_matriz'}  
              ]  
            })
         },
        {//observaciones
             xtype:'textarea',
             layout: 'form',
             anchor:'95%',
             fieldLabel: 'Observaciones',
             id: 'obsSubactividad',
             style: {textTransform: "uppercase"},
             allowBlank: false,
             name: 'obsSubactividad'   
        }
       ]
      } 
      ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
 
              
            if (Ext.getCmp('frmSubactividad').getForm().isValid()) {//
                     var Oper='';
                     //verifica si se trata de una actualizacion o un registro nuevo 
                     if (Ext.getCmp('codSubactividad').getValue() == '0')
                       Oper = 'NUEVO';
                     else
                       Oper = 'ACTUALIZAR';
                     var servicio=Ext.getCmp('cmbServicio').getValue();
                     var actividad=Ext.getCmp('cmbActividad').getValue();
                     var indicador=Ext.getCmp('cmbIndicador').getValue();
                     var matriz=Ext.getCmp('cmbMatriz').getValue();
                  Ext.getCmp('frmSubactividad').getForm().submit({						
                     method: 'POST',
                     params:{ operacion:Oper,servicio:servicio,actividad:actividad,indicador:indicador,matriz:matriz}, //colocar los datos en formato json para enviarlos
                     waitTitle: 'Validando datos',
                     waitMsg: 'Enviando datos..',
                     success: function(form, action){
                         var data = Ext.util.JSON.decode(action.response.responseText);
                         Ext.Msg.alert('Confirmación', data.message.reason);
                         Ext.getCmp('frmSubactividad').getForm().reset();
                         Ext.getCmp('cmbServicio').clearValue();
                         Ext.getCmp('cmbServicio').getStore().removeAll();
                         Ext.getCmp('cmbServicio').store.reload();            
                         Ext.getCmp('cmbActividad').clearValue();
                         Ext.getCmp('cmbActividad').getStore().removeAll();
                         Ext.getCmp('cmbIndicador').clearValue();
                         Ext.getCmp('cmbIndicador').getStore().removeAll();
                         Ext.getCmp('cmbIndicador').store.reload();                                     
                         Ext.getCmp('cmbMatriz').clearValue();
                         Ext.getCmp('cmbMatriz').getStore().removeAll();
                         Ext.getCmp('cmbMatriz').store.reload();
                         
                         Ext.getCmp('gridSubactividad').store.reload();
                         Ext.getCmp('codSubactividad').setValue('0');
                         Ext.getCmp('codSubactividad').hide();
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
               Ext.getCmp('frmSubactividad').getForm().reset();
               Ext.getCmp('cmbServicio').clearValue();
               Ext.getCmp('cmbServicio').getStore().removeAll();
               Ext.getCmp('cmbServicio').store.reload();            
               Ext.getCmp('cmbActividad').clearValue();
               Ext.getCmp('cmbActividad').getStore().removeAll();
               Ext.getCmp('cmbIndicador').clearValue();
               Ext.getCmp('cmbIndicador').getStore().removeAll();
               Ext.getCmp('cmbIndicador').store.reload();                                     
               Ext.getCmp('cmbMatriz').clearValue();
               Ext.getCmp('cmbMatriz').getStore().removeAll();
               Ext.getCmp('cmbMatriz').store.reload();
               
               Ext.getCmp('gridSubactividad').store.reload();
               Ext.getCmp('codSubactividad').setValue('0');
               Ext.getCmp('codSubactividad').hide();
           }

        }],


   /*     buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
 
              

            }
        },{
           xtype: 'button',
           text: 'Cancelar',
           handler: function(){

           }

        }],*/





        buttons: [{
    xtype: 'button',
    text: 'Guardar',
    handler: function() {
                                if (Ext.getCmp('frmSubactividad').getForm().isValid()) {//
                                  var Oper='';
                                  //verifica si se trata de una actualizacion o un registro nuevo 
                                  if (Ext.getCmp('codSubactividad').getValue() == '0')
                                    Oper = 'NUEVO';
                                  else
                                    Oper = 'ACTUALIZAR';
                                  var servicio=Ext.getCmp('cmbServicio').getValue();
                                  var actividad=Ext.getCmp('cmbActividad').getValue();
                                  var indicador=Ext.getCmp('cmbIndicador').getValue();
                                  var matriz=Ext.getCmp('cmbMatriz').getValue();
                              Ext.getCmp('frmSubactividad').getForm().submit({						
                                  method: 'POST',
                                  params:{ operacion:Oper,servicio:servicio,actividad:actividad,indicador:indicador,matriz:matriz}, //colocar los datos en formato json para enviarlos
                                  waitTitle: 'Validando datos',
                                  waitMsg: 'Enviando datos..',
                                  success: function(form, action){
                                      var data = Ext.util.JSON.decode(action.response.responseText);
                                      Ext.Msg.alert('Confirmación', data.message.reason);
                                      Ext.getCmp('frmSubactividad').getForm().reset();
                                      Ext.getCmp('cmbServicio').clearValue();
                                      Ext.getCmp('cmbServicio').getStore().removeAll();
                                      Ext.getCmp('cmbServicio').store.reload();            
                                      Ext.getCmp('cmbActividad').clearValue();
                                      Ext.getCmp('cmbActividad').getStore().removeAll();
                                      Ext.getCmp('cmbIndicador').clearValue();
                                      Ext.getCmp('cmbIndicador').getStore().removeAll();
                                      Ext.getCmp('cmbIndicador').store.reload();                                     
                                      Ext.getCmp('cmbMatriz').clearValue();
                                      Ext.getCmp('cmbMatriz').getStore().removeAll();
                                      Ext.getCmp('cmbMatriz').store.reload();
                                      
                                      Ext.getCmp('gridSubactividad').store.reload();
                                      Ext.getCmp('codSubactividad').setValue('0');
                                      Ext.getCmp('codSubactividad').hide();
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
}, {
    xtype: 'button',
    text: 'Cancelar',
    handler: function() {
        // código para cancelar la operación

        Ext.getCmp('frmSubactividad').getForm().reset();
        Ext.getCmp('cmbServicio').clearValue();
        Ext.getCmp('cmbServicio').getStore().removeAll();
        Ext.getCmp('cmbServicio').store.reload();            
        Ext.getCmp('cmbActividad').clearValue();
        Ext.getCmp('cmbActividad').getStore().removeAll();
        Ext.getCmp('cmbIndicador').clearValue();
        Ext.getCmp('cmbIndicador').getStore().removeAll();
        Ext.getCmp('cmbIndicador').store.reload();                                     
        Ext.getCmp('cmbMatriz').clearValue();
        Ext.getCmp('cmbMatriz').getStore().removeAll();
        Ext.getCmp('cmbMatriz').store.reload();
        
        Ext.getCmp('gridSubactividad').store.reload();
        Ext.getCmp('codSubactividad').setValue('0');
        Ext.getCmp('codSubactividad').hide();
    }
}, {
    xtype: 'button',
    text: 'Eliminar',
    handler: function() {
        var selectedRecord = Ext.getCmp('gridSubactividad').getSelectionModel().getSelection()[0];
        if (selectedRecord) {
            Ext.Msg.confirm('Confirmación', '¿Estás seguro que deseas eliminar este registro?', function(btn) {
                if (btn == 'yes') {
                    selectedRecord.erase({
                        success: function(record, operation) {
                            Ext.getCmp('gridSubactividad').getStore().reload();
                            Ext.Msg.alert('Confirmación', 'Registro eliminado exitosamente.');
                        },
                        failure: function(record, operation) {
                            Ext.Msg.alert('Error', 'No se pudo eliminar el registro.');
                        }
                    });
                }
            });
        } else {
            Ext.Msg.alert('Advertencia', 'Debes seleccionar un registro para eliminar.');
        }
    }
}]











    });

 
 
 //**********cargar del grid con los Subactividades cargados********
   var storeSubactividad = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaSubactividad',
              z:350
        },
        fields: [  
           {name:'co_subactividad'},
           {name:'tx_nombre_subactividad'},
           {name:'tx_nombre_servicio'},           
           {name:'tx_nombre_actividad'},           
           {name:'tx_obs_subactividad'},
           {name:'co_servicio'},
           {name:'co_actividad'},
           {name:'co_indicador_gestion'},
           {name:'tx_nombre_dato_matriz'},
           {name:'co_dato_matriz'},           
           {name:'tx_nombre_indicador_gestion'},
           {name:'activo'}
        ]  
        });
   storeSubactividad.load({params:{datos:'listaSubactividad',z:350,start:0,limit:350}});//z:30,start:0,limit:5,
   
   var pagerSubactividad = new Ext.PagingToolbar({
           store: storeSubactividad, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} SubActividades Cargadas',
           emptyMsg: 'No hay SubActividades para mostrar',
           pageSize: 350
   });

   pagerSubactividad.on('beforechange',function(bar,params){
           params.z = 350;
   });
   
   

   
   
   var gridSubactividad = new Ext.grid.GridPanel({
        store : storeSubactividad,
        id:'gridSubactividad',
        height:400,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_subactividad', type: 'integer', width:55, align:'right', sortable: true},
            {header:'SubActividad', dataIndex:'tx_nombre_subactividad', width:300, sortable:true}, //, hidden: true, hideable:false
            {header:'Servicio', dataIndex:'tx_nombre_servicio', width:200, sortable: true},
            {header:'Actividad', dataIndex:'tx_nombre_actividad',width:200, sortable: true},
            {header:'Indicador', dataIndex:'tx_nombre_indicador_gestion',width:200, sortable: true},
            {header:'Matriz', dataIndex:'tx_nombre_dato_matriz',width:200, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_subactividad', width:200, sortable: true},
            {header:'Activo', dataIndex:'activo', width:100, sortable: true},             
            {header:'Cod. Servico', dataIndex:'co_servicio', width:150, sortable:true, hidden: true, hideable:false},
            {header:'Cod. Actividad', dataIndex:'co_actividad', width:100, sortable:true, hidden: true, hideable:false},
            {header:'Cod. Matriz', dataIndex:'co_dato_matriz', width:100, sortable:true, hidden: true, hideable:false},
            {header:'Cod. Indicador', dataIndex:'co_indicador_gestion', width:100, sortable:true, hidden: true, hideable:false},
         ],
         tbar: pagerSubactividad, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridSubactividad.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                     Ext.getCmp('codSubactividad').setValue(sel.data.co_subactividad); //sel.data.co_Subactividad+
                     Ext.getCmp('codSubactividad').show();
                     Ext.getCmp('nombreSubactividad').setValue(sel.data.tx_nombre_subactividad);
                     Ext.getCmp('cmbServicio').setValue(sel.data.co_servicio);
                     Ext.getCmp('cmbActividad').setValue(sel.data.co_actividad);
                     Ext.getCmp('cmbIndicador').setValue(sel.data.co_indicador_gestion);
                     Ext.getCmp('cmbMatriz').setValue(sel.data.co_dato_matriz);
                     Ext.getCmp('obsSubactividad').setValue(sel.data.tx_obs_subactividad);
                     st = Ext.getCmp('cmbActividad').getStore();
                     st.load({
                        params:{
                          co_servicio: sel.data.co_servicio
                        },
                        callback: function(){
                           Ext.getCmp('cmbActividad').setValue(sel.data.co_actividad);
                        }
                      });
                  
                  Ext.getCmp('nombreSubactividad').focus();
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila de la SubActividad que desea modificar');}
             }
           }
           
           , /* boton eliminarrrrr*/
           {
            xtype: 'button',
            text: 'Eliminar',
            handler: function() {
                var selectedRecord = gridSubactividad.getSelectionModel();/*Ext.getCmp('gridSubactividad').getSelectionModel().getSelection()[0]*/
                var sel = selectedRecord.getSelected();
                if (selectedRecord.hasSelection()) {
                    Ext.Msg.confirm('Confirmación', '¿Estás seguro que deseas eliminar este registro?', function(btn) {
                        if (btn == 'yes') {
                            selectedRecord.erase({
                                success: function(record, operation) {
                                    Ext.getCmp('gridSubactividad').getStore().reload();
                                    Ext.Msg.alert('Confirmación', 'Registro eliminado exitosamente.');
                                },
                                failure: function(record, operation) {
                                    Ext.Msg.alert('Error', 'No se pudo eliminar el registro.');
                                }
                            });
                        }
                    });
                } else {
                    Ext.Msg.alert('Advertencia', 'Debes seleccionar un registro para eliminar.');
                }
            }
        }






         ]         
      });
   

   
   var winReq = new Ext.Panel({
           layout: 'fit',
           width: 799,
           height:450,
           bodyStyle:'padding:10px 5px 0',
           //autoScroll : true,
           items:[
            {
               xtype:'fieldset', //***************Subactividad*******************
               title: 'Subactividads Registrados',
               collapsible: true,
               autoHeight:true,
               items :[
                 gridSubactividad 
               ]
            }
           ]
   });

 //*********fin grid*****************
 
  var winSubactividads = new Ext.Panel({  
      //layout: 'border',
      //height:800,
      //autoScroll : true,
      id: 'winRegistros',
      items: [
              frmSubactividad,
              winReq// listaSubactividads
      ]
  });
  
   winSubactividads.render(document.body);
   Ext.getCmp('codSubactividad').hide();
   
});


