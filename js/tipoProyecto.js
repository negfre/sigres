Ext.onReady(function() {
   var frmTipoProyecto = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmTipoProyecto',
       frame:true,
       url: 'cargarTipoProyecto.php',
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       //height : 430,
       items: [
       {
	 id: 'codTipoProyecto',
         fieldLabel: 'Tipo Proyecto Nro',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codTipoProyecto', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       },  
       {
         xtype:'fieldset', //************datos del tipo de proyecto*************
         title: 'Datos del Tipo de Proyecto',
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
                  name: 'nombreTipoProyecto',
                  id: 'nombreTipoProyecto',
                  allowBlank: false,
                  maxLength:150,
                  style: {textTransform: "uppercase"},
                  emptyText: 'Nombre del Tipo de Proyecto...'
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
                  name: 'aliasTipoProyecto',
                  id: 'aliasTipoProyecto',
                  maxLength:50,
                  style: {textTransform: "uppercase"},
                  allowBlank: false,
                  emptyText: 'Alias del Tipo de Proyecto...'
                }
                ] //********columna 2*******
             },
             {
                   columnWidth:.40,
                   layout: 'form',
                   items: [
                   {
                     xtype: 'combo',
                     id: 'cmbUnidadNegocioTipoProyecto',
                     fieldLabel: 'Unidad de Negocio',
                     displayField: 'tx_nombre_unidad_negocio',
                     valueField: 'co_unidad_negocio',
                     emptyText:'Seleccione una Unidad de Negocio...',
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
                     })
                   }              
                   ] //********columna 3*******
              }             
             ]         
          },
          {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              id: 'obsTipoProyecto',
              style: {textTransform: "uppercase"},
              //allowBlank: false,
              name: 'obsTipoProyecto'   
          }               
         ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmTipoProyecto').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codTipoProyecto').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var unidadNegocioTipoProyecto=Ext.getCmp('cmbUnidadNegocioTipoProyecto').getValue();
                 var obsTipoProyecto=Ext.getCmp('obsTipoProyecto').getValue();
                 var nombreTipoProyecto=Ext.getCmp('nombreTipoProyecto').getValue(); 
                 var aliasTipoProyecto=Ext.getCmp('aliasTipoProyecto').getValue();

                 Ext.getCmp('frmTipoProyecto').getForm().submit({						
                 method: 'POST',
                 params:{ operacion:Oper,unidadNegocioTipoProyecto:unidadNegocioTipoProyecto,obsTipoProyecto:obsTipoProyecto,aliasTipoProyecto:aliasTipoProyecto}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     
                     Ext.getCmp('cmbUnidadNegocioTipoProyecto').clearValue();
                     Ext.getCmp('cmbUnidadNegocioTipoProyecto').getStore().removeAll();
                     Ext.getCmp('cmbUnidadNegocioTipoProyecto').store.reload();
      
                     Ext.getCmp('frmTipoProyecto').getForm().reset();

                     
                     Ext.getCmp('gridTipoProyecto').store.reload();
                     Ext.getCmp('codTipoProyecto').setValue('0');
                     Ext.getCmp('codTipoProyecto').hide();
                         
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
            Ext.getCmp('frmTipoProyecto').getForm().reset();
            
            Ext.getCmp('cmbUnidadNegocioTipoProyecto').clearValue();
            Ext.getCmp('cmbUnidadNegocioTipoProyecto').getStore().removeAll();
            Ext.getCmp('cmbUnidadNegocioTipoProyecto').store.reload();           

            Ext.getCmp('codTipoProyecto').setValue('0');
            Ext.getCmp('codTipoProyecto').hide();
           }

        }]
    });
 
 
 //**********cargar del grid con los tipos de proyectos cargados********
   var storeTipoProyecto = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaTipoProyecto',
              z:30
        },
        fields: [  
           {name:'co_tipo_proyecto'},
           {name:'tx_nombre_tipo_proyecto'},
           {name:'tx_alias_tipo_proyecto'},
           {name:'tx_obs_tipo_proyecto'},
           {name:'co_unidad_negocio'},
           {name:'tx_nombre_unidad_negocio'}
        ]  
        });
   storeTipoProyecto.load({params:{datos:'listaTipoProyecto',z:30,start:0,limit:50}});//z:30,start:0,limit:5,
   
   var pagerTipoProyecto = new Ext.PagingToolbar({
           store: storeTipoProyecto, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Tipos de Proyectos Cargados',
           emptyMsg: 'No hay Tipos de Proyectos para mostrar',
           pageSize: 50
   });

   pagerTipoProyecto.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridTipoProyecto = new Ext.grid.GridPanel({
        store : storeTipoProyecto,
        id:'gridTipoProyecto',
        height:320,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_tipo_proyecto', type: 'integer', width:60, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_tipo_proyecto', width:350, sortable:true}, //, hidden: true, hideable:false
            {header:'Alias', dataIndex:'tx_alias_tipo_proyecto', width:100, sortable: true},
            {header:'Unidad de Negocio', dataIndex:'tx_nombre_unidad_negocio', width:100, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_tipo_proyecto', width:200, sortable: true},
            
            {header:'Cod. UnidadNegocio', dataIndex:'co_unidad_negocio', width:100, sortable:true, hidden: true, hideable:false}
         ],
         tbar: pagerTipoProyecto, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridTipoProyecto.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                     Ext.getCmp('codTipoProyecto').setValue(sel.data.co_tipo_proyecto); 
                     Ext.getCmp('codTipoProyecto').show();
                     Ext.getCmp('cmbUnidadNegocioTipoProyecto').setValue(sel.data.co_unidad_negocio);
                     Ext.getCmp('obsTipoProyecto').setValue(sel.data.tx_obs_tipo_proyecto);
                     Ext.getCmp('nombreTipoProyecto').setValue(sel.data.tx_nombre_tipo_proyecto);
                     Ext.getCmp('aliasTipoProyecto').setValue(sel.data.tx_alias_tipo_proyecto);
                     Ext.getCmp('nombreTipoProyecto').focus();     
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }           
         ]         
      });
   
   var listaTipoProyecto = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
          xtype:'fieldset', //***************tipo proyecto*******************
          title: 'Tipos de Proyectos Registrados',
          collapsible: true,
          autoHeight:true,
          items :[
            gridTipoProyecto
          ]
       }
      ]
   }); //*********fin grid*****************
 
  var winTipoProyecto = new Ext.Panel({  
      id: 'winTipoProyecto',
      items: [
              frmTipoProyecto,
              listaTipoProyecto// listaTipoProyecto
      ]
  });
  
   winTipoProyecto.render(document.body);
   Ext.getCmp('codTipoProyecto').hide();
   
});


