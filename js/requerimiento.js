Ext.apply(Ext.form.VTypes, {
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
     /*
      * Always return true since we're only using this vtype to set the
      * min/max allowed values (these are tested for after the vtype test)
      */
     return true;
  }
});



/*dias=[31,29,31,30,31,30,31,31,30,31,30,31];
function dias_mes(mes,anio){
 ultimo=0;
 if (mes==1){
   fecha=new Date(anio,1,29)
   vermes=fecha.getMonth();
   if(vermes!=mes){
     ultimo=28
    }
 }
 if(ultimo==0){
   ultimo=dias[mes]
 }
 return ultimo;
}*/

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
       xtype:'fieldset', //************usuario*************
       title: 'Usuario',
       collapsible: true,
       autoHeight:true,
       //layout: 'form',
       items :[
           {
              xtype: 'combo',
              layout: 'form',
              id: 'cmbUsuario',
              fieldLabel: 'Usuario',
              displayField: 'tx_nombre',
              valueField: 'co_usuario',
              emptyText:'Seleccione un Usuario...',
              allowBlank: false,
              typeAhead: true,
              selectOnFocus:true,
              editable: true,
              forceSelection: true,               
              triggerAction: 'all',
              anchor:'70%',
              mode: 'local',
              store : new Ext.data.JsonStore({
                url: 'datosSolicitados.php',
                autoLoad: true,
                root: 'datos',
                baseParams: {
                  datos: 'usuario'
                },
                fields: [  
                  {name:'co_usuario'},
                  {name:'tx_nombre'}  
                ]  
              })
           }
       ]
      }, //**********fin usuario********
      {
       xtype:'fieldset', //***************requerimiento*******************
       title: 'Requerimiento',
       collapsible: true,
       autoHeight:true,
       items :[                
       {
           xtype: 'combo',
           layout: 'form',            
           id: 'cmbProyecto',
           fieldLabel: 'Proyecto o Gerencia',
           displayField: 'tx_nombre',
           valueField: 'co_proyecto',
           emptyText:'Seleccione un Proyecto...',
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
             autoLoad: true,
             root: 'datos',
             baseParams: {
               datos: 'proyecto'
             },
             fields: [  
               {name:'co_proyecto'},
               {name:'tx_nombre'}   
             ]  
           })
       },
       {
           xtype: 'combo',
           layout: 'form',
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
           anchor:'95%',
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
                  Ext.getCmp('cmbSubactividad').clearValue();
                  Ext.getCmp('cmbSubactividad').getStore().removeAll();
                  Ext.getCmp('cmbMedida').clearValue();
                  Ext.getCmp('cmbMedida').getStore().removeAll();                      
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
           layout:'column',
           items:[
           {
               columnWidth:.50,
               layout: 'form',
               items: [
               {
                 xtype: 'combo',
                 id: 'cmbActividad',
                 fieldLabel: 'Actividad',
                 displayField: 'tx_nombre_actividad',
                 valueField: 'co_actividad',
                 emptyText:'Seleccione una Actividad...',
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
                     datos: 'actividad'
                   },
                   fields: [  
                     {name:'tx_nombre_actividad'},  
                     {name:'co_actividad'}  
                   ]  
                 }),
                 listeners: {
                   'select': function(c,r,i){
                     Ext.getCmp('cmbSubactividad').clearValue();
                     Ext.getCmp('cmbSubactividad').getStore().removeAll();
                     Ext.getCmp('cmbMedida').clearValue();
                     Ext.getCmp('cmbMedida').getStore().removeAll();
                     st = Ext.getCmp('cmbSubactividad').getStore();
                     st.load({
                       params:{
                         co_actividad: r.data.co_actividad
                       }
                     })
                   }
                 }
               }              
               ] //********columna 1*******
           },
           {
               columnWidth:.50,
               layout: 'form',
               items: [
               {
                 xtype: 'combo',
                 id: 'cmbSubactividad',
                 fieldLabel: 'Sub-Actividad',
                 displayField: 'tx_nombre_subactividad',
                 valueField: 'co_subactividad',
                 emptyText:'Seleccione una Sub-Actividad...',
                 allowBlank: false,
                 typeAhead: true,
                 forceSelection: true,
                 selectOnFocus:true,
                 triggerAction: 'all',
                 anchor:'95%',
                 mode: 'local',
                 store : new Ext.data.JsonStore({
                   url: 'datosSolicitados.php',
                   root: 'datos',
                   baseParams: {
                     datos: 'subactividad'
                   },
                   fields: [  
                     {name:'co_subactividad'},
                     {name:'tx_nombre_subactividad'}  
                   ]  
                 }),
                 listeners: {
                   'select': function(c,r,i){
                     Ext.getCmp('cmbMedida').clearValue();
                     Ext.getCmp('cmbMedida').getStore().removeAll();
                     st = Ext.getCmp('cmbMedida').getStore();
                     st.load({
                       params:{
                         co_subactividad: r.data.co_subactividad
                       }
                     })
                   }
                 }
               }
               ] //********columna 2********
           }
           ]
       },
       {
           layout:'column',
           items:[
             {
               columnWidth:.50,
               layout: 'form',                
               items: [
               {
                 xtype: 'combo',
                 id: 'cmbMedida',
                 fieldLabel: 'Medida',
                 displayField: 'tx_nombre_medida',
                 valueField: 'co_unidad_medida',
                 emptyText:'Seleccione una Medida...',
                 allowBlank: false,
                 typeAhead: true,
                 forceSelection: true,
                 selectOnFocus:true,
                 triggerAction: 'all',
                 anchor:'95%',
                 mode: 'local',
                 store : new Ext.data.JsonStore({
                   url: 'datosSolicitados.php',
                   root: 'datos',
                   baseParams: {
                     datos: 'medida'
                   },
                   fields: [  
                     {name:'co_unidad_medida'},
                     {name:'tx_nombre_medida'} 
                   ]  
                 })
               }
               ]
              },
              {
               columnWidth:.50,
               layout: 'form',
               items: [
                 {
                   xtype:'numberfield',
                   layout: 'form',
                   allowDecimals: false,
                   allowNegative: false, 
                   maxLength:6,
                   allowBlank: false,
                   anchor:'30%',
                   style: 'text-align: right',
                   fieldLabel: 'Volumen',
                   id: 'volumen',
                   name: 'volumen'
                 }                
               ]
              }
           ]        
       },
       //********columna 1********
       {   
           layout:'column',
           items:[
            {
              columnWidth:.25,
              layout: 'form',
              items: [
                {
              xtype: 'datefield',
              fieldLabel: 'Fecha Inicio',
              name: 'startdt',
              id: 'startdt',
              vtype: 'daterange',
              endDateField: 'enddt',
              allowBlank: false,
              //value: new Date(),
              minValue: new Date(FechaCierre()), // Fecha mínima: 2024-03-10

            },]}, //********columna 2********
          
           {
               columnWidth:.25,
               layout: 'form',
               defaultType: 'datefield',
               items: [
               {
                 fieldLabel: 'Fecha Fin',
                 name: 'enddt',
                 id: 'enddt',
                 vtype: 'daterange',
                 maxValue: new Date(),
                 startDateField: 'startdt',
                 //minValue: min_fecha(),
                 //startDateField: min_fecha(),//'startdt', // id of the start date field
                 allowBlank: false,
                 value: new Date()
               }
               ] //********columna 3********
           },
           {
               columnWidth:.40,
               layout: 'form',
               items: [
               {
                 //tiempo efectivo
                 xtype:'numberfield',
                 allowDecimals: false,
                 allowNegative: false, 
                 maxLength:6,
                 //allowBlank: false,
                 anchor:'30%',
                 style: 'text-align: right',
                 fieldLabel: 'Tiempo Efectivo (minutos)',
                 id: 'timeEfectivo',
                 name: 'timeEfectivo'              
               }
               ]
           }
           ]         
        
       },
       {
             xtype: 'combo',
             layout: 'form',
             id: 'cmbAplicacion',
             fieldLabel: 'Aplicación',
             displayField: 'tx_nombre',
             valueField: 'co_aplicacion',
             emptyText:'Seleccione una Aplicación...',
             allowBlank: false,
             typeAhead: true,
             selectOnFocus:true,
             editable: true,
             forceSelection: true,               
             triggerAction: 'all',
             anchor:'70%',
             mode: 'local',
             store : new Ext.data.JsonStore({
               url: 'datosSolicitados.php',
               autoLoad: true,
               root: 'datos',
               baseParams: {
                 datos: 'aplicacion'
               },
               fields: [  
                 {name:'co_aplicacion'},
                 {name:'tx_nombre'}  
               ]  
             })
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
       {
          xtype: 'combo',
          layout: 'form',
          id: 'cmbEstatus',
          fieldLabel: 'Estatus del Requerimiento',
          displayField: 'tx_nombre_estatus',
          valueField: 'co_estatus',
          emptyText:'Seleccione el estatus...',
          allowBlank: false,
          typeAhead: true,
          forceSelection: true,
          selectOnFocus:true,
          triggerAction: 'all',
          anchor:'20%',
          mode: 'local',
          store : new Ext.data.JsonStore({
            url: 'datosSolicitados.php',
            autoLoad: true,
            root: 'datos',
            baseParams: {
              datos: 'estatus'
            },
            fields: [  
              {name:'co_estatus'}  ,
              {name:'tx_nombre_estatus'}
            ]  
          })
       }
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


