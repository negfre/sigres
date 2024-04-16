
//opcion 1
//Ext.require('requerimiento');
/*
Ext.onReady('CambiarFechaCierre', {
    extend: 'Ext.window.Window',
    title: 'Cambiar Fecha de Cierre',
    modal: true,
    width: 300,
    height: 200,
    layout: 'fit',
    items: [{
      xtype: 'form',
      border: false,
      bodyPadding: 10,
      items: [{
        xtype: 'datefield',
        fieldLabel: 'Nueva Fecha de Cierre',
        name: 'nuevaFechaCierre',
        id: 'nuevaFechaCierre',
        allowBlank: false,
        value: this.FechaCierre(), // Valor inicial: fecha de cierre actual
      }]
    }],
    buttons: [{
      text: 'Guardar',
      handler: function() {
        var form = this.up('form').getForm();
        if (form.isValid()) {
          var nuevaFechaCierre = form.getValues().nuevaFechaCierre;

          FechaCierre() = nuevaFechaCierre ();
          // Código para actualizar la variable fec_cierre en el servidor
          // ...
          this.close();
        }
      }
    }, {
      text: 'Cancelar',
      handler: function() {
        this.close();
      }
    }]
  });
  
  // Mostrar el formulario
  var win = Ext.create('CambiarFechaCierre');
  win.show();*/
  
//opcion 2
 /* Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
       var date = field.parseDate(val);
  
       if(!date){
           return;
       }
       
       if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
           var start = Ext.getCmp(field.startDateField);
           start.setMaxValue(date);
           start.validate();
           this.dateRangeMax = date;
       } 
       else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
           var end = Ext.getCmp(field.endDateField);
           end.setMinValue(date);
           end.validate();
           this.dateRangeMin = date;          
       }

       return true;
    }
  });
  
  
  

  
  function min_fecha(){
   var hoy = new Date();
   hoy.setDate(1);
   return hoy;	
  
  }
  
  function FechaCierre(){
  
    var fec_cierre = '2024-01-01';
  
    return fec_cierre;
  }
  
  
  
  Ext.onReady(function() {
    var frmRequerimiento = new Ext.FormPanel({
        labelAlign: 'top',
        id: 'frmRequerimiento',
        frame:true,
        url: 'cargarRequerimiento.php',
        method: 'POST',
        bodyStyle:'padding:5px 5px 0',
        width: 799,
        //height : 620,
        //autoScroll : true,
        items: [
        {
    id: 'codReq',
          fieldLabel: 'Requerimiento Nro',
          xtype:'textfield',//<-- campo oculto (hidden)  
          name:'codReq', //el nombre con que se envia al servidor  
          value: '0',//el valor que contenda
          style: 'text-align: right',
          readOnly: true
        },  

        {
         xtype:'fieldset', //***************requerimiento*******************
         title: 'Requerimiento',
         collapsible: true,
         autoHeight:true,
         items :[                

        
         {   
             layout:'column',
             items:[
              {
                columnWidth:.25,
                layout: 'form',
                items: [
                  {
                xtype: 'datefield',
                fieldLabel: 'Fecha de Cierre',
                name: 'enddate', //startdt
                id: 'enddate', //startdt
                vtype: 'daterange',
                endDateField: 'enddt',
                allowBlank: false,
                //value: new Date(),
                minValue: new Date(FechaCierre()), // Fecha mínima: 2024-03-10
  
              },]}, //********columna 2********
            
             ]         
          
         },
         {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              id: 'observaciones',
              allowBlank: false,
              name: 'observaciones'   
         },        

        ]
       } 
       ],
        buttons: [{
             xtype: 'button',
             text: 'Guardar',
             handler: function(){
                                   // Ext.Msg.alert('Error','xxx'); 
               
               if (Ext.getCmp('frmRequerimiento').getForm().isValid()) {
                  var Oper='';
                  //verifica si se trata de una actualizacion o un registro nuevo 
                  if (Ext.getCmp('codReq').getValue() == '0')
                    Oper = 'NUEVO';
                  else
                    Oper = 'ACTUALIZAR';
                  var usuario=Ext.getCmp('cmbUsuario').getValue();
                  var proyecto=Ext.getCmp('cmbProyecto').getValue();
                  var subactividad=Ext.getCmp('cmbSubactividad').getValue();
                  var medida=Ext.getCmp('cmbMedida').getValue();
                  var aplicacion=Ext.getCmp('cmbAplicacion').getValue();
                  var estatus=Ext.getCmp('cmbEstatus').getValue(); //pendiente o cerrado
                  var volumen=Ext.getCmp('volumen').getValue();
                  var tiempoEfectivo=Ext.getCmp('timeEfectivo').getValue();
                  var feFin = Ext.getCmp('enddt').getValue();
                  if (estatus == 2 && feFin == '')
                      Ext.Msg.alert('Error','Se debe indicar la Fecha Fin cuando el estatus del requerimientos es CERRADO!');   
                  else 
                   Ext.getCmp('frmRequerimiento').getForm().submit({						
                      method: 'POST',
                      params:{ operacion:Oper,usuario:usuario,proyecto:proyecto,subactividad:subactividad,medida:medida,aplicacion:aplicacion,estatus:estatus,volumen:volumen,tiempoEfectivo:tiempoEfectivo}, //colocar los datos en formato json para enviarlos
                      waitTitle: 'Validando datos',
                      waitMsg: 'Enviando datos..',
                      success: function(form, action){
                          var data = Ext.util.JSON.decode(action.response.responseText);
                          Ext.Msg.alert('Confirmación', data.message.reason);
                          Ext.getCmp('frmRequerimiento').getForm().reset();
                          Ext.getCmp('enddt').setValue(new Date());
                          Ext.getCmp('startdt').setValue(new Date());
                          Ext.getCmp('cmbUsuario').clearValue();
                          Ext.getCmp('cmbUsuario').getStore().removeAll();
                          Ext.getCmp('cmbUsuario').store.reload();            
                          Ext.getCmp('cmbProyecto').clearValue();
                          Ext.getCmp('cmbProyecto').getStore().removeAll();
                          Ext.getCmp('cmbProyecto').store.reload();
                          Ext.getCmp('cmbServicio').clearValue();
                          Ext.getCmp('cmbServicio').getStore().removeAll();
                          Ext.getCmp('cmbServicio').store.reload();
                          Ext.getCmp('cmbActividad').clearValue();
                          Ext.getCmp('cmbActividad').getStore().removeAll();
                          Ext.getCmp('cmbSubactividad').clearValue();
                          Ext.getCmp('cmbSubactividad').getStore().removeAll();
                          Ext.getCmp('cmbMedida').clearValue();
                          Ext.getCmp('cmbMedida').getStore().removeAll();
                          Ext.getCmp('cmbAplicacion').clearValue();
                          Ext.getCmp('cmbAplicacion').getStore().removeAll();
                          Ext.getCmp('cmbAplicacion').store.reload();
                          Ext.getCmp('cmbEstatus').clearValue();
                          Ext.getCmp('cmbEstatus').getStore().removeAll();
                          Ext.getCmp('cmbEstatus').store.reload();
                          Ext.getCmp('gridRequerimientos').store.reload();
                          Ext.getCmp('codReq').setValue('0');
                          Ext.getCmp('codReq').hide();
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
             Ext.getCmp('frmRequerimiento').getForm().reset();
             Ext.getCmp('enddt').setValue(new Date());
             Ext.getCmp('startdt').setValue(new Date());            
             Ext.getCmp('cmbUsuario').clearValue();
             Ext.getCmp('cmbUsuario').getStore().removeAll();
             Ext.getCmp('cmbUsuario').store.reload();            
             Ext.getCmp('cmbProyecto').clearValue();
             Ext.getCmp('cmbProyecto').getStore().removeAll();
             Ext.getCmp('cmbProyecto').store.reload();
             Ext.getCmp('cmbServicio').clearValue();
             Ext.getCmp('cmbServicio').getStore().removeAll();
             Ext.getCmp('cmbServicio').store.reload();
             Ext.getCmp('cmbActividad').clearValue();
             Ext.getCmp('cmbActividad').getStore().removeAll();;
             Ext.getCmp('cmbSubactividad').clearValue();
             Ext.getCmp('cmbSubactividad').getStore().removeAll();
             Ext.getCmp('cmbMedida').clearValue();
             Ext.getCmp('cmbMedida').getStore().removeAll();
             Ext.getCmp('cmbAplicacion').clearValue();
             Ext.getCmp('cmbAplicacion').getStore().removeAll();
             Ext.getCmp('cmbAplicacion').store.reload();
             Ext.getCmp('cmbEstatus').clearValue();
             Ext.getCmp('cmbEstatus').getStore().removeAll();
             Ext.getCmp('cmbEstatus').store.reload();
             Ext.getCmp('codReq').setValue('0');
             Ext.getCmp('codReq').hide();
            }
  
         }]
     });
  
  
  
  //**********cargar del grid con los requerimientos cargados********
    var storeReq = new Ext.data.JsonStore({
         url: 'datosSolicitados.php',
         root: 'data',
         totalProperty: 'total',
         baseParams: {
               datos: 'listaRequerimiento',
               z:50
         },
         fields: [  
            {name:'co_requerimiento'},
            {name:'tx_nombre'},
            {name:'tx_nombre_proyecto'},
            {name:'tx_nombre_subactividad'},
            {name:'nu_volumen'},
            {name:'fecha_ini'},
            {name:'fecha_fin'},
            {name:'tx_obs_requerimiento'},
            {name:'tx_nombre_estatus'},
            {name:'co_usuario'},
            {name:'co_proyecto'},
            {name:'co_servicio'},
            {name:'co_actividad'},
            {name:'co_subactividad'},
            {name:'co_unidad_medida'},
            {name:'nu_volumen'},
            {name:'fecha_ini'},
            {name:'fecha_fin'},
            {name:'nu_tiempo_efectivo'},
            {name:'co_aplicacion'},
            {name:'tx_obs_requerimiento'},
            {name:'co_estatus'}
            
         ]  
         });
    storeReq.load({params:{datos:'listaRequerimiento',z:50,start:0,limit:2000}});//z:30,start:0,limit:5,
    
    var pager = new Ext.PagingToolbar({
            store: storeReq, // <--grid and PagingToolbar using same store
            displayInfo: true,
            displayMsg: '{0} - {1} of {2} Requerimientos Cargados',
            emptyMsg: 'No hay requerimientos para mostrar',
            pageSize: 2000
    });
  
    pager.on('beforechange',function(bar,params){
            params.z = 50;
    });
    
    
  
    
    
    var gridRequerimientos = new Ext.grid.GridPanel({
         store : storeReq,
         id:'gridRequerimientos',
         height:310,
          // <--grid and PagingToolbar using same store
          columns: [
             new Ext.grid.RowNumberer(),
             {header:'Req. Nro.', dataIndex:'co_requerimiento', type: 'integer', width:55, align:'right', sortable: true},
             {header:'Estatus', dataIndex:'tx_nombre_estatus', width:100, sortable:true}, //, hidden: true, hideable:false
             {header:'Usuario', dataIndex:'tx_nombre', width:130, sortable: true},
             {header:'Proyecto', dataIndex:'tx_nombre_proyecto',width:150, sortable: true},
             {header:'Sub-Actividad', dataIndex:'tx_nombre_subactividad', width:150, sortable: true},
             {header:'Vol.', dataIndex:'nu_volumen', width:50, align:'right', sortable: true},
             {header:'Fecha Inicio', dataIndex:'fecha_ini', align:'right', width:80, sortable: true},
             {header:'Fecha Fin', dataIndex:'fecha_fin', align:'right', width:80, sortable: true},
             {header:'T. Efectivo', dataIndex:'nu_tiempo_efectivo', width:70, align:'right', sortable:true},            
             {header:'Observaciones', dataIndex:'tx_obs_requerimiento', width:200, sortable: true}, 
             {header:'Cod. Usuario', dataIndex:'co_usuario', width:100, sortable:true, hidden: true, hideable:false},
             {header:'Cod. Proyecto', dataIndex:'co_proyecto', width:100, sortable:true, hidden: true, hideable:false},
             {header:'Cod. Servico', dataIndex:'co_servicio', width:100, sortable:true, hidden: true, hideable:false},
             {header:'Cod. Actividad', dataIndex:'co_actividad', width:100, sortable:true, hidden: true, hideable:false},
             {header:'Cod. Subactividad', dataIndex:'co_subactividad', width:100, sortable:true, hidden: true, hideable:false},
             {header:'Cod. Medida', dataIndex:'co_unidad_medida', width:100, sortable:true, hidden: true, hideable:false},
             {header:'Volumen', dataIndex:'nu_volumen', width:100, sortable:true, hidden: true, hideable:false},
             {header:'Cod. Aplicacion', dataIndex:'co_aplicacion', width:100, sortable:true, hidden: true, hideable:false},
          ],
          tbar: pager, // <--agregamos el pagingtoolbar al grid
          border: false,
          stripeRows: true,
          bbar: [
            {
             text: 'Modificar',
             align: 'center',
             iconCls	: 'x-icon-menu-modificar',
             handler: function() {
                var sm = gridRequerimientos.getSelectionModel();
                var sel = sm.getSelected();
                if (sm.hasSelection()){
                   if (sel.data.co_estatus == 1){
                      Ext.getCmp('codReq').setValue(sel.data.co_requerimiento); //sel.data.co_requerimiento+
                      Ext.getCmp('codReq').show();
                      Ext.getCmp('cmbUsuario').setValue(sel.data.co_usuario);
                      Ext.getCmp('cmbProyecto').setValue(sel.data.co_proyecto);
                      Ext.getCmp('cmbServicio').setValue(sel.data.co_servicio);
                      Ext.getCmp('volumen').setValue(sel.data.nu_volumen);
                      Ext.getCmp('startdt').setValue(sel.data.fecha_ini);
                      Ext.getCmp('enddt').setValue(sel.data.fecha_fin);
                      Ext.getCmp('timeEfectivo').setValue(sel.data.nu_tiempo_efectivo);
                      Ext.getCmp('cmbAplicacion').setValue(sel.data.co_aplicacion);
                      Ext.getCmp('observaciones').setValue(sel.data.tx_obs_requerimiento);
                      Ext.getCmp('cmbEstatus').setValue(sel.data.co_estatus);
                      st = Ext.getCmp('cmbActividad').getStore();
                      st.load({
                         params:{
                           co_servicio: sel.data.co_servicio
                         },
                         callback: function(){
                            Ext.getCmp('cmbActividad').setValue(sel.data.co_actividad);
                         }
                       });
                      st = Ext.getCmp('cmbSubactividad').getStore();
                      st.load({
                         params:{
                           co_actividad: sel.data.co_actividad
                         },
                         callback: function(){
                            Ext.getCmp('cmbSubactividad').setValue(sel.data.co_subactividad);
                         }
                       });
                      st = Ext.getCmp('cmbMedida').getStore();
                      st.load({
                         params:{
                           co_subactividad: sel.data.co_subactividad
                         },
                         callback: function(){
                            Ext.getCmp('cmbMedida').setValue(sel.data.co_unidad_medida);
                         }
                       });
                   }
                   else
                     {Ext.Msg.alert('Modificar','Los requerimientos con estatus CERRADO no pueden ser modificados!');}
                   
                   Ext.getCmp('cmbUsuario').focus();
                }
                else
                {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
              }
            },
            {
             text: 'Duplicar',
             align: 'center',
             iconCls	:'x-icon-menu-duplicar',
             handler: function() {
                var sm = gridRequerimientos.getSelectionModel();
                var sel = sm.getSelected();
                if (sm.hasSelection()){
                      Ext.getCmp('codReq').setValue('0');
                      Ext.getCmp('codReq').hide();
                      Ext.getCmp('cmbUsuario').setValue(sel.data.co_usuario);
                      Ext.getCmp('cmbProyecto').setValue(sel.data.co_proyecto);
                      Ext.getCmp('cmbServicio').setValue(sel.data.co_servicio);
                      Ext.getCmp('volumen').setValue(sel.data.nu_volumen);
                      Ext.getCmp('startdt').setValue(sel.data.fecha_ini);
                      Ext.getCmp('enddt').setValue(sel.data.fecha_fin);
                      Ext.getCmp('timeEfectivo').setValue(sel.data.nu_tiempo_efectivo);
                      Ext.getCmp('cmbAplicacion').setValue(sel.data.co_aplicacion);
                      Ext.getCmp('observaciones').setValue(sel.data.tx_obs_requerimiento);
                      Ext.getCmp('cmbEstatus').setValue(sel.data.co_estatus);
                      st = Ext.getCmp('cmbActividad').getStore();
                      st.load({
                         params:{
                           co_servicio: sel.data.co_servicio
                         },
                         callback: function(){
                            Ext.getCmp('cmbActividad').setValue(sel.data.co_actividad);
                         }
                       });
                      st = Ext.getCmp('cmbSubactividad').getStore();
                      st.load({
                         params:{
                           co_actividad: sel.data.co_actividad
                         },
                         callback: function(){
                            Ext.getCmp('cmbSubactividad').setValue(sel.data.co_subactividad);
                         }
                       });
                      st = Ext.getCmp('cmbMedida').getStore();
                      st.load({
                         params:{
                           co_subactividad: sel.data.co_subactividad
                         },
                         callback: function(){
                            Ext.getCmp('cmbMedida').setValue(sel.data.co_unidad_medida);
                         }
                       });
                      
                      Ext.getCmp('cmbUsuario').focus();
                }
                else
                {Ext.Msg.alert('Duplicar','Debe seleccionar la fila del registro que desea duplicar');}
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
                xtype:'fieldset', //***************requerimiento*******************
                title: 'Requerimientos Registrados',
                collapsible: true,
                autoHeight:true,
                items :[
                  gridRequerimientos 
                ]
             }
            ]
    });
  
  //*********fin grid*****************
  
   var winRequerimientos = new Ext.Panel({  
       //layout: 'border',
       //height:800,
       //autoScroll : true,
       id: 'winRegistros',
       items: [
               frmRequerimiento,
               winReq// listaRequerimientos
       ]
   });
   
    winRequerimientos.render(document.body);
    Ext.getCmp('codReq').hide();
    
  });
  */
  


//CODIGO DE GENESIS
  /* 
  Ext.define('CambiarFechaCierre', {
    extend: 'Ext.window.Window',
    title: 'Cambiar Fecha de Cierre',
    modal: true,
    width: 300,
    height: 200,
    layout: 'fit',
    items: [{
      xtype: 'form',
      border: false,
      bodyPadding: 10,
      items: [{
        xtype: 'datefield',
        fieldLabel: 'Nueva Fecha de Cierre',
        name: 'nuevaFechaCierre',
        id: 'nuevaFechaCierre',
        allowBlank: false,
        value: new Date() // Valor inicial: fecha actual
      }]
    }],
    buttons: [{
      text: 'Guardar',
      handler: function() {
        var form = this.up('form').getForm();
        if (form.isValid()) {
          var nuevaFechaCierre = form.getValues().nuevaFechaCierre;
          // Código para actualizar la fecha de cierre en la base de datos
          // ...
          this.close();
        }
      }
    }, {
      text: 'Cancelar',
      handler: function() {
        this.close();
      }
    }]
  });
  */

  function FechaCierre(){

    var fec_cierre = '2024-01-01';
  
    return fec_cierre;
  }
  

  Ext.onReady(function() {
   
    var frmCambioFeCierre = new Ext.FormPanel({
        labelAlign: 'top',
        id: 'frmCambioFeCierre',
        frame:true,
        url: 'cargarProceso.php', //**********************
        method: 'POST',
        bodyStyle:'padding:5px 5px 0',
        width: 799,
        items: [
        {
          id: 'codCambioFeCierre',
          fieldLabel: 'ID Fecha de Cierre',
          xtype:'textfield',//<-- campo oculto (hidden)  
          name:'codCambioFeCierre', //el nombre con que se envia al servidor  
          value: '0',//el valor que contenda
          style: 'text-align: right',
          readOnly: true
        }, //**********fin usuario********
        {
         xtype:'fieldset', //***************usuario*******************
         title: 'Cambio de fecha de Cierre',
         collapsible: true,
         autoHeight:true,
         items :[

          {   
            layout:'column',
            items:[
             {
               columnWidth:.25,
               layout: 'form',
               items: [
                 {
               xtype: 'datefield',
               fieldLabel: 'Fecha de Cierre',
               name: 'fec_cierre',
               id: 'newfec',
               vtype: 'daterange',
               endDateField: 'enddt',
               allowBlank: false,
               value: new Date()
               //minValue: new Date(), // Fecha mínima: 2024-03-10
 
             },]}, //********columna 2********
           
 
            ]         
         
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
               if (Ext.getCmp('frmCambioFeCierre').getForm().isValid()) {
                  var Oper1='';
                  //verifica si se trata de una actualizacion o un registro nuevo 
                  if (Ext.getCmp('codCambioFeCierre').getValue() == '0')
                    Oper = 'NUEVO';
                  else
                    Oper = 'ACTUALIZAR';
                  var fecierre=Ext.getCmp('fec_cierre').getValue();
                  //var fecierre= Ext.Date.format(Ext.getCmp('fec_cierre').getValue(), "Y-m-d H:i:s"); 
 
                  Ext.getCmp('frmCambioFeCierre').getForm().submit({						
                  method: 'POST',
                  params:{ operacion:Oper1,fecierre:fecierre}, //colocar los datos en formato json para enviarlos
                  waitTitle: 'Validando datos',
                  waitMsg: 'Enviando datos..',
                  success: function(form, action){
                      var data = Ext.util.JSON.decode(action.response.responseText);
                      Ext.Msg.alert('Confirmación', data.message.reason);
                      Ext.getCmp('frmCambioFeCierre').getForm().reset();
/*                      Ext.getCmp('gridProceso').store.reload();
                      Ext.getCmp('codCambioFeCierre').setValue('0');
                      Ext.getCmp('codCambioFeCierre').hide();*/
                          
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
             Ext.getCmp('frmCambioFeCierre').getForm().reset();
             Ext.getCmp('codCambioFeCierre').setValue('0');
             Ext.getCmp('codCambioFeCierre').hide();
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
                   Ext.getCmp('codCambioFeCierre').setValue(sel.data.co_proceso); 
                   Ext.getCmp('codCambioFeCierre').show();
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
  
    var winCambioFeCierre = new Ext.Panel({  
       //layout: 'border',
       id: 'winCambioFeCierre',
       items: [
        frmCambioFeCierre,
               listaProceso// lista de Procesos
       ]
    });
   
    winCambioFeCierre.render(document.body);
    Ext.getCmp('codCambioFeCierre').hide();
    
 });
 
 
 