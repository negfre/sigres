
Ext.onReady(function() {
   var frmGerenciaNegocio = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmGerenciaNegocio',
       frame:true,
       url: 'cargarGerenciaNegocio.php',
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       //height : 430,
       items: [
       {
	 id: 'codGerenciaNegocio',
         fieldLabel: 'ID Gerencia',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codGerenciaNegocio', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       },  
       {
         xtype:'fieldset', //************datos del proyecto*************
         title: 'Datos de la Gerencia',
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
                     name: 'nombreGerenciaNegocio',
                     id: 'nombreGerenciaNegocio',
                     allowBlank: false,
                     maxLength:50,
                     style: {textTransform: "uppercase"},
                     anchor:'90%',
                     emptyText: 'Nombre de la Gerencia del Negocio...'                     
                   }              
                   ] //********columna 2*******
               },               
               {
                   columnWidth:.5,
                   layout: 'form',
                   items: [
                   {
                     xtype: 'combo',
                     id: 'cmbUnidadNegocio',
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
                   ] //********columna 1*******
               }                  
            ]         
         },
         {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              id: 'obsGerenciaNegocio',
              style: {textTransform: "uppercase"},
              //allowBlank: false,
              name: 'obsGerenciaNegocio'   
         }               
         ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmGerenciaNegocio').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codGerenciaNegocio').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var unidadNegocio=Ext.getCmp('cmbUnidadNegocio').getValue();
                 var obsGerenciaNegocio=Ext.getCmp('obsGerenciaNegocio').getValue();
                 var nombreGerenciaNegocio=Ext.getCmp('nombreGerenciaNegocio').getValue(); 

                 Ext.getCmp('frmGerenciaNegocio').getForm().submit({
                 method: 'POST',
                 params:{ operacion:Oper,unidadNegocio:unidadNegocio,nombreGerenciaNegocio:nombreGerenciaNegocio,obsGerenciaNegocio:obsGerenciaNegocio}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     
                     Ext.getCmp('frmGerenciaNegocio').getForm().reset();
                     Ext.getCmp('cmbUnidadNegocio').clearValue();
                     Ext.getCmp('cmbUnidadNegocio').getStore().removeAll();
                     Ext.getCmp('cmbUnidadNegocio').store.reload();
                     
                     Ext.getCmp('gridGerenciaNegocio').store.reload();
                     Ext.getCmp('codGerenciaNegocio').setValue('0');
                     Ext.getCmp('codGerenciaNegocio').hide();
                         
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
            Ext.getCmp('frmGerenciaNegocio').getForm().reset();
            
            Ext.getCmp('cmbUnidadNegocio').clearValue();
            Ext.getCmp('cmbUnidadNegocio').getStore().removeAll();
            Ext.getCmp('cmbUnidadNegocio').store.reload();           

            Ext.getCmp('codGerenciaNegocio').setValue('0');
            Ext.getCmp('codGerenciaNegocio').hide();
           }

        }]
    });
 
 
 //**********cargar del grid con las gerencias cargadas********
   var storeGerenciaNegocio = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaGerenciaNegocio',
              z:30
        },
        fields: [  
           {name:'co_gerencia'},
           {name:'tx_nombre_gerencia'},
           {name:'co_unidad_negocio'},
           {name:'tx_nombre_unidad_negocio'},
           {name:'tx_obs_gerencia'}
        ]  
        });
   storeGerenciaNegocio.load({params:{datos:'listaGerenciaNegocio',z:30,start:0,limit:1000}});//z:30,start:0,limit:5,
   
   var pagerGerenciaNegocio = new Ext.PagingToolbar({
           store: storeGerenciaNegocio, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Gerencias Cargadas',
           emptyMsg: 'No hay Gerencias para mostrar',
           pageSize: 1000
   });

   pagerGerenciaNegocio.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridGerenciaNegocio = new Ext.grid.GridPanel({
        store : storeGerenciaNegocio,
        id:'gridGerenciaNegocio',
        height:320,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_gerencia', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_gerencia', width:320, sortable:true}, //, hidden: true, hideable:false
            {header:'Unidad Negocio', dataIndex:'tx_nombre_unidad_negocio', width:200, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_gerencia', width:200, sortable: true},
            {header:'Cod. UnidadNegocio', dataIndex:'co_unidad_negocio', width:100, sortable:true, hidden: true, hideable:false},

         ],
         tbar: pagerGerenciaNegocio, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridGerenciaNegocio.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                     Ext.getCmp('codGerenciaNegocio').setValue(sel.data.co_gerencia); 
                     Ext.getCmp('codGerenciaNegocio').show();
                     Ext.getCmp('nombreGerenciaNegocio').setValue(sel.data.tx_nombre_gerencia);
                     Ext.getCmp('cmbUnidadNegocio').setValue(sel.data.co_unidad_negocio);
                     Ext.getCmp('obsGerenciaNegocio').setValue(sel.data.tx_obs_gerencia);

                     Ext.getCmp('nombreGerenciaNegocio').focus();              
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }           
         ]         
      });
   
   var listaGerenciaNegocio = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
          xtype:'fieldset', //**************gerencia del negocio*******************
          title: 'Gerencias Registradas',
          collapsible: true,
          autoHeight:true,
          items :[
            gridGerenciaNegocio
          ]
       }
      ]
   }); //*********fin grid*****************
 
  var winGerenciaNegocio = new Ext.Panel({  
      id: 'winProyectos',
      items: [
              frmGerenciaNegocio,
              listaGerenciaNegocio// listaGerencia
      ]
  });
  
   winGerenciaNegocio.render(document.body);
   Ext.getCmp('codGerenciaNegocio').hide();
   
});


