
Ext.onReady(function() {
   var frmIndicador = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmIndicador',
       frame:true,
       url: 'cargarIndicador.php',
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       //height : 430,
       items: [
       {
	 id: 'codIndicador',
         fieldLabel: 'ID Indicador',
         xtype:'textfield',//<-- Renglon oculto (hidden)  
         name:'codIndicador', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       },  
       {
         xtype:'fieldset', //************datos del **********
         title: 'Indicador de Gestión',
         collapsible: true,
         autoHeight:true,
         layout: 'form',
         items :[
         {
            layout:'column',
            items:[         
               {
                   columnWidth:.4,
                   layout: 'form',
                   items: [
                   {
                     xtype: 'textfield',
                     fieldLabel: 'Nombre',
                     name: 'nombreIndicador',
                     id: 'nombreIndicador',
                     allowBlank: false,
                     maxLength:60,
                     style: {textTransform: "uppercase"},
                     anchor:'90%',
                     emptyText: 'Nombre del Indicador de Gestión...'                     
                   }              
                   ] //********columna 2*******
               },               
               {
                   columnWidth:.6,
                   layout: 'form',
                   items: [
                   {
                     xtype: 'combo',
                     id: 'cmbGrupoIndicador',
                     fieldLabel: 'Grupo del Indicador',
                     displayField: 'tx_nombre_grupo_indicador',
                     valueField: 'co_grupo_indicador',
                     emptyText:'Seleccione un grupo...',
                     allowBlank: false,
                     typeAhead: true,
                     forceSelection: true,
                     selectOnFocus:true,
                     triggerAction: 'all',
                     anchor:'98%',
                     mode: 'local',
                     store : new Ext.data.JsonStore({
                       url: 'datosSolicitados.php',
                       autoLoad: true,
                       root: 'datos',
                       baseParams: { 
                         datos: 'grupoIndicador'
                       },
                       fields: [  
                         {name:'tx_nombre_grupo_indicador'},  
                         {name:'co_grupo_indicador'}  
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
              id: 'obsIndicador',
              style: {textTransform: "uppercase"},
              //allowBlank: false,
              name: 'obsIndicador'   
         }               
         ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmIndicador').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codIndicador').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var grupoIndicador=Ext.getCmp('cmbGrupoIndicador').getValue();
                 var obsIndicador=Ext.getCmp('obsIndicador').getValue();
                 var nombreIndicador=Ext.getCmp('nombreIndicador').getValue(); 

                 Ext.getCmp('frmIndicador').getForm().submit({
                 method: 'POST',
                 params:{ operacion:Oper,grupoIndicador:grupoIndicador,nombreIndicador:nombreIndicador,obsIndicador:obsIndicador}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     
                     Ext.getCmp('frmIndicador').getForm().reset();
                     Ext.getCmp('cmbGrupoIndicador').clearValue();
                     Ext.getCmp('cmbGrupoIndicador').getStore().removeAll();
                     Ext.getCmp('cmbGrupoIndicador').store.reload();
                     
                     Ext.getCmp('gridIndicador').store.reload();
                     Ext.getCmp('codIndicador').setValue('0');
                     Ext.getCmp('codIndicador').hide();
                         
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
                Ext.Msg.alert('Guardar','Los Renglons del formulario marcados en rojo son obligatorios!');
             }
            }
        },{
           xtype: 'button',
           text: 'Cancelar',
           handler: function(){
            Ext.getCmp('frmIndicador').getForm().reset();
            
            Ext.getCmp('cmbGrupoIndicador').clearValue();
            Ext.getCmp('cmbGrupoIndicador').getStore().removeAll();
            Ext.getCmp('cmbGrupoIndicador').store.reload();           

            Ext.getCmp('codIndicador').setValue('0');
            Ext.getCmp('codIndicador').hide();
           }

        }]
    });
 
 
 //**********cargar del grid con los Renglons cargados********
   var storeIndicador = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaIndicador',
              z:30
        },
        fields: [  
           {name:'co_indicador_gestion'},
           {name:'tx_nombre_indicador_gestion'},
           {name:'co_grupo_indicador'},
           {name:'tx_nombre_grupo_indicador'},
           {name:'tx_obs_indicador_gestion'}
        ]  
        });
   storeIndicador.load({params:{datos:'listaIndicador',z:30,start:0,limit:50}});//z:30,start:0,limit:5,
   
   var pagerIndicador = new Ext.PagingToolbar({
           store: storeIndicador, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Indicadores Cargados',
           emptyMsg: 'No hay Indicadores para mostrar',
           pageSize: 50
   });

   pagerIndicador.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridIndicador = new Ext.grid.GridPanel({
        store : storeIndicador,
        id:'gridIndicador',
        height:420,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_indicador_gestion', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_indicador_gestion', width:150, sortable:true}, //, hidden: true, hideable:false
            {header:'Grupo Indicador', dataIndex:'tx_nombre_grupo_indicador', width:470, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_indicador_gestion', width:200, sortable: true},
            {header:'Cod. GrupoIndicador', dataIndex:'co_grupo_indicador', width:100, sortable:true, hidden: true, hideable:false},

         ],
         tbar: pagerIndicador, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridIndicador.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                     Ext.getCmp('codIndicador').setValue(sel.data.co_indicador_gestion); 
                     Ext.getCmp('codIndicador').show();
                     Ext.getCmp('nombreIndicador').setValue(sel.data.tx_nombre_indicador_gestion);
                     Ext.getCmp('cmbGrupoIndicador').setValue(sel.data.co_grupo_indicador);
                     Ext.getCmp('obsIndicador').setValue(sel.data.tx_obs_indicador_gestion);

                     Ext.getCmp('nombreIndicador').focus();              
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }           
         ]         
      });
   
   var listaIndicador = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:500,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
          xtype:'fieldset', //*******************************
          title: 'Indicadores de Gestión',
          collapsible: true,
          autoHeight:true,
          items :[
            gridIndicador
          ]
       }
      ]
   }); //*********fin grid*****************
 
  var winIndicador = new Ext.Panel({  
      id: 'winProyectos',
      items: [
              frmIndicador,
              listaIndicador// lista
      ]
  });
  
   winIndicador.render(document.body);
   Ext.getCmp('codIndicador').hide();
   
});


