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


Ext.onReady(function() {
   var frmProyecto = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmProyecto',
       frame:true,
       url: 'cargarProyecto.php',
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       //height : 430,
       items: [
       {
	 id: 'codProy',
         fieldLabel: 'Proyecto Nro',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codProy', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       },  
       {
         xtype:'fieldset', //************datos del proyecto*************
         title: 'Datos del Proyecto',
         collapsible: true,
         autoHeight:true,
         layout: 'form',
         items :[
         {
             layout:'column',
             items:[
             {
                columnWidth:.30,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Nombre',
                  name: 'nombreProyecto',
                  id: 'nombreProyecto',
                  maxLength:150,
                  style: {textTransform: "uppercase"},
                  allowBlank: false,
                  emptyText: 'Nombre del Proyecto...'
                }
                ] //********columna 1*******
             },               
             {
                columnWidth:.30,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Alias',
                  name: 'aliasProyecto',
                  id: 'aliasProyecto',
                  maxLength:50,
                  style: {textTransform: "uppercase"},
                  emptyText: 'Alias del Proyecto...'
                }
                ] //********columna 2*******
             },
             {
                 columnWidth:.18,
                 layout: 'form',
                 items: [
                 {
                   xtype: 'datefield',
                   fieldLabel: 'Fecha Inicio',
                   name: 'inicioProyecto',
                   id: 'inicioProyecto',
                   vtype: 'daterange',
                   allowBlank: false,
                   endDateField: 'finProyecto' // id of the end date field
                 }
                 ] //********columna 3*******
             },
             {
                 columnWidth:.18,
                 layout: 'form',
                 defaultType: 'datefield',
                 items: [
                 {
                   fieldLabel: 'Fecha Fin',
                   name: 'finProyecto',
                   id: 'finProyecto',
                   vtype: 'daterange',
                   allowBlank: false,
                   startDateField: 'inicioProyecto' // id of the start date field
                 }
                 ] //********columna 4********
             }
             ]         
         },
         {
            layout:'column',
            items:[         
               {
                   columnWidth:.25,
                   layout: 'form',
                   items: [
                   {
                     xtype: 'combo',
                     id: 'cmbUnidadNegocioProyecto',
                     fieldLabel: 'Unidad de Negocio',
                     displayField: 'tx_nombre_unidad_negocio',
                     valueField: 'co_unidad_negocio',
                     emptyText:'Seleccione una Unidad...',
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
                         datos: 'un'
                       },
                       fields: [  
                         {name:'tx_nombre_unidad_negocio'},  
                         {name:'co_unidad_negocio'}  
                       ]  
                     }),
                     listeners: {
                       'select': function(c,r,i){
                         Ext.getCmp('cmbGerenciaProyecto').clearValue();
                         Ext.getCmp('cmbGerenciaProyecto').getStore().removeAll();
                         Ext.getCmp('cmbTipoProyecto').clearValue();
                         Ext.getCmp('cmbTipoProyecto').getStore().removeAll();


                         st = Ext.getCmp('cmbGerenciaProyecto').getStore();
                         st.load({
                           params:{
                             co_unidad_negocio: r.data.co_unidad_negocio
                           }
                         });
                         
                         st = Ext.getCmp('cmbTipoProyecto').getStore();
                         st.load({
                           params:{
                             co_unidad_negocio: r.data.co_unidad_negocio
                           }
                         });                         
                       }
                     }
                   }              
                   ] //********columna 2*******
               },               
               {
                   columnWidth:.75,
                   layout: 'form',
                   items: [
                   {
                     xtype: 'combo',
                     id: 'cmbGerenciaProyecto',
                     fieldLabel: 'Gerencia',
                     displayField: 'tx_nombre_gerencia',
                     valueField: 'co_gerencia',
                     emptyText:'Seleccione una Gerencia...',
                     allowBlank: false,
                     typeAhead: true,
                     forceSelection: true,
                     selectOnFocus:true,
                     triggerAction: 'all',
                     anchor:'90%',
                     mode: 'local',
                     store : new Ext.data.JsonStore({
                       url: 'datosSolicitados.php',
                       //autoLoad: true,
                       root: 'datos',
                       baseParams: {
                         datos: 'gerencia'
                       },
                       fields: [  
                         {name:'tx_nombre_gerencia'},  
                         {name:'co_gerencia'}  
                       ]  
                     })
                   }              
                   ] //********columna 1*******
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
                    id: 'cmbTipoProyecto',
                    fieldLabel: 'Tipo',
                    displayField: 'tx_nombre_tipo_proyecto',
                    valueField: 'co_tipo_proyecto',
                    emptyText:'Seleccione un Tipo...',
                    allowBlank: false,
                    typeAhead: true,
                    forceSelection: true,
                    selectOnFocus:true,
                    triggerAction: 'all',
                    anchor:'90%',
                    mode: 'local',
                    store : new Ext.data.JsonStore({
                      url: 'datosSolicitados.php',
                      //autoLoad: true,
                      root: 'datos',
                      baseParams: {
                        datos: 'tipoProyecto'
                      },
                      fields: [  
                        {name:'tx_nombre_tipo_proyecto'},  
                        {name:'co_tipo_proyecto'}  
                      ]  
                    })
                  }              
                  ] //********columna 1*******
               },           
               {
                  columnWidth:.50,
                  layout: 'form',
                  items: [
                  {
                    xtype: 'combo',
                    id: 'cmbGrupoProyecto',
                    fieldLabel: 'Grupo',
                    displayField: 'tx_nombre_grupo_proyecto',
                    valueField: 'co_grupo_proyecto',
                    emptyText:'Seleccione un Grupo...',
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
                        datos: 'grupoProyecto'
                      },
                      fields: [  
                        {name:'tx_nombre_grupo_proyecto'},  
                        {name:'co_grupo_proyecto'}  
                      ]  
                    })
                  }              
                  ] //********columna 2*******
               }                  
            ]         
         },
         {
           xtype: 'combo',
           id: 'cmbDivisionProyecto',
           fieldLabel: 'División',
           displayField: 'tx_nombre_division',
           valueField: 'co_division',
           emptyText:'Seleccione una División...',
           allowBlank: false,
           typeAhead: true,
           forceSelection: true,
           selectOnFocus:true,
           triggerAction: 'all',
           anchor:'40%',
           mode: 'local',
           store : new Ext.data.JsonStore({
             url: 'datosSolicitados.php',
             autoLoad: true,
             root: 'datos',
             baseParams: {
               datos: 'division'
             },
             fields: [  
               {name:'tx_nombre_division'},  
               {name:'co_division'}  
             ]  
           })
         },
         {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              style: {textTransform: "uppercase"},
              id: 'obsProyecto',
              //allowBlank: false,
              name: 'obsProyecto'   
         }               
         ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmProyecto').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codProy').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var gerenciaProyecto=Ext.getCmp('cmbGerenciaProyecto').getValue();
                 var divisionProyecto=Ext.getCmp('cmbDivisionProyecto').getValue();
                 var tipoProyecto=Ext.getCmp('cmbTipoProyecto').getValue();
                 var grupoProyecto=Ext.getCmp('cmbGrupoProyecto').getValue();
                 var obsProyecto=Ext.getCmp('obsProyecto').getValue();
                 var nombreProyecto=Ext.getCmp('nombreProyecto').getValue(); 
                 var aliasProyecto=Ext.getCmp('aliasProyecto').getValue();

                 Ext.getCmp('frmProyecto').getForm().submit({						
                 method: 'POST',
                 params:{ operacion:Oper,gerenciaProyecto:gerenciaProyecto,divisionProyecto:divisionProyecto,tipoProyecto:tipoProyecto,grupoProyecto:grupoProyecto,obsProyecto:obsProyecto,aliasProyecto:aliasProyecto}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     
                     Ext.getCmp('cmbUnidadNegocioProyecto').clearValue();
                     Ext.getCmp('cmbUnidadNegocioProyecto').getStore().removeAll();
                     Ext.getCmp('cmbUnidadNegocioProyecto').store.reload();
      
                     Ext.getCmp('frmProyecto').getForm().reset();
                     Ext.getCmp('cmbGerenciaProyecto').clearValue();
                     Ext.getCmp('cmbGerenciaProyecto').getStore().removeAll();
                     Ext.getCmp('cmbGerenciaProyecto').store.reload();
                     
                     Ext.getCmp('cmbTipoProyecto').clearValue();
                     Ext.getCmp('cmbTipoProyecto').getStore().removeAll();
                     Ext.getCmp('cmbTipoProyecto').store.reload();
                     
                     Ext.getCmp('cmbDivisionProyecto').clearValue();
                     Ext.getCmp('cmbDivisionProyecto').getStore().removeAll();
                     Ext.getCmp('cmbDivisionProyecto').store.reload();
                     
                     Ext.getCmp('cmbGrupoProyecto').clearValue();
                     Ext.getCmp('cmbGrupoProyecto').getStore().removeAll();
                     Ext.getCmp('cmbGrupoProyecto').store.reload();
                     
                     Ext.getCmp('gridProyectos').store.reload();
                     Ext.getCmp('codProy').setValue('0');
                     Ext.getCmp('codProy').hide();
                         
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
            Ext.getCmp('frmProyecto').getForm().reset();
            
            Ext.getCmp('cmbUnidadNegocioProyecto').clearValue();
            Ext.getCmp('cmbUnidadNegocioProyecto').getStore().removeAll();
            Ext.getCmp('cmbUnidadNegocioProyecto').store.reload();
            
            Ext.getCmp('cmbGerenciaProyecto').clearValue();
            Ext.getCmp('cmbGerenciaProyecto').getStore().removeAll();
            Ext.getCmp('cmbGerenciaProyecto').store.reload();
            
            Ext.getCmp('cmbTipoProyecto').clearValue();
            Ext.getCmp('cmbTipoProyecto').getStore().removeAll();
            Ext.getCmp('cmbTipoProyecto').store.reload();
            
            Ext.getCmp('cmbGrupoProyecto').clearValue();
            Ext.getCmp('cmbGrupoProyecto').getStore().removeAll();
            Ext.getCmp('cmbGrupoProyecto').store.reload();

            Ext.getCmp('cmbDivisionProyecto').clearValue();
            Ext.getCmp('cmbDivisionProyecto').getStore().removeAll();
            Ext.getCmp('cmbDivisionProyecto').store.reload();            

            Ext.getCmp('codProy').setValue('0');
            Ext.getCmp('codProy').hide();
           }

        }]
    });
 
 
 //**********cargar del grid con los proyectos cargados********
   var storeProy = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaProyecto',
              z:150
        },
        fields: [  
           {name:'co_proyecto'},
           {name:'tx_nombre_proyecto'},
           {name:'tx_alias_proyecto'},
           {name:'fecha_ini'},
           {name:'fecha_fin'},
           {name:'tx_obs_proyecto'},
           {name:'co_gerencia'},
           {name:'tx_nombre_gerencia'},
           {name:'co_division'},
           {name:'tx_nombre_division'},
           {name:'co_grupo_proyecto'},
           {name:'tx_nombre_grupo_proyecto'},
           {name:'co_tipo_proyecto'},
           {name:'tx_nombre_tipo_proyecto'},
           {name:'co_unidad_negocio'},
           {name:'tx_nombre_unidad_negocio'}
        ]  
        });
   storeProy.load({params:{datos:'listaProyecto',z:150,start:0,limit:150}});//z:30,start:0,limit:5,
   
   var pagerProy = new Ext.PagingToolbar({
           store: storeProy, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Proyectos Cargados',
           emptyMsg: 'No hay Proyectos para mostrar',
           pageSize: 150
   });

   pagerProy.on('beforechange',function(bar,params){
           params.z = 150;
   });
   
   var gridProyectos = new Ext.grid.GridPanel({
        store : storeProy,
        id:'gridProyectos',
        height:320,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'Proyecto. Nro.', dataIndex:'co_proyecto', type: 'integer', width:80, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_proyecto', width:150, sortable:true}, //, hidden: true, hideable:false
            {header:'Alias', dataIndex:'tx_alias_proyecto', width:130, sortable: true},
            {header:'Gerencia', dataIndex:'tx_nombre_gerencia',width:150, sortable: true},
            {header:'Unidad de Negocio', dataIndex:'tx_nombre_unidad_negocio', width:100, sortable: true},
            {header:'División', dataIndex:'tx_nombre_division', width:100, sortable: true},
            {header:'Tipo', dataIndex:'tx_nombre_tipo_proyecto', width:100, sortable: true},
            {header:'Grupo', dataIndex:'tx_nombre_grupo_proyecto', width:100, sortable: true},
            {header:'Fecha Inicio', dataIndex:'fecha_ini', align:'right', width:70, sortable: true},
            {header:'Fecha Fin', dataIndex:'fecha_fin', align:'right', width:70, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_proyecto', width:200, sortable: true},
            
            {header:'Cod. UnidadNegocio', dataIndex:'co_unidad_negocio', width:100, sortable:true, hidden: true, hideable:false},
            {header:'Cod. Gerencia', dataIndex:'co_gerencia', width:100, sortable:true, hidden: true, hideable:false},
            {header:'Cod. Division', dataIndex:'co_division', width:100, sortable:true, hidden: true, hideable:false},
            {header:'Cod. Tipo', dataIndex:'co_tipo_proyecto', width:100, sortable:true, hidden: true, hideable:false},
            {header:'Cod. Grupo', dataIndex:'co_grupo_proyecto', width:100, sortable:true, hidden: true, hideable:false},
         ],
         tbar: pagerProy, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridProyectos.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                     Ext.getCmp('codProy').setValue(sel.data.co_proyecto); 
                     Ext.getCmp('codProy').show();
                     Ext.getCmp('cmbUnidadNegocioProyecto').setValue(sel.data.co_unidad_negocio);
                     Ext.getCmp('cmbDivisionProyecto').setValue(sel.data.co_division);
                     Ext.getCmp('cmbTipoProyecto').setValue(sel.data.co_tipo_proyecto);
                     Ext.getCmp('cmbGrupoProyecto').setValue(sel.data.co_grupo_proyecto);
                     Ext.getCmp('inicioProyecto').setValue(sel.data.fecha_ini);
                     Ext.getCmp('finProyecto').setValue(sel.data.fecha_fin);
                     Ext.getCmp('obsProyecto').setValue(sel.data.tx_obs_proyecto);
                     Ext.getCmp('nombreProyecto').setValue(sel.data.tx_nombre_proyecto);
                     Ext.getCmp('aliasProyecto').setValue(sel.data.tx_alias_proyecto);
                     Ext.getCmp('nombreProyecto').focus();
                     st = Ext.getCmp('cmbGerenciaProyecto').getStore();
                     st.load({
                        params:{
                          co_unidad_negocio: sel.data.co_unidad_negocio
                        },
                        callback: function(){
                           Ext.getCmp('cmbGerenciaProyecto').setValue(sel.data.co_gerencia);
                        }
                      });
                     
                     st = Ext.getCmp('cmbTipoProyecto').getStore();
                     st.load({
                        params:{
                          co_unidad_negocio: sel.data.co_unidad_negocio
                        },
                        callback: function(){
                           Ext.getCmp('cmbTipoProyecto').setValue(sel.data.co_tipo_proyecto);
                        }
                      });                     
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }           
         ]         
      });
   
   var listaProy = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
          xtype:'fieldset', //***************proyecto*******************
          title: 'Proyectos Registrados',
          collapsible: true,
          autoHeight:true,
          items :[
            gridProyectos
          ]
       }
      ]
   }); //*********fin grid*****************
 
  var winProyectos = new Ext.Panel({  
      id: 'winProyectos',
      items: [
              frmProyecto,
              listaProy// listaProyecto
      ]
  });
  
   winProyectos.render(document.body);
   Ext.getCmp('codProy').hide();
   
});


