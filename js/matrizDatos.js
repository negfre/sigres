
Ext.onReady(function() {
   var frmMatrizDatos = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmMatrizDatos',
       frame:true,
       url: 'cargarMatrizDatos.php',
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       //height : 430,
       items: [
       {
	 id: 'codMatrizDatos',
         fieldLabel: 'ID Dato Matriz',
         xtype:'textfield',//<-- Renglon oculto (hidden)  
         name:'codMatrizDatos', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       },  
       {
         xtype:'fieldset', //************datos del **********
         title: 'Renglon de la Matriz',
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
                     name: 'nombreMatrizDatos',
                     id: 'nombreMatrizDatos',
                     allowBlank: false,
                     maxLength:60,
                     style: {textTransform: "uppercase"},
                     anchor:'90%',
                     emptyText: 'Nombre del Renglonr de la Matriz...'                     
                   }              
                   ] //********columna 2*******
               },               
               {
                   columnWidth:.6,
                   layout: 'form',
                   items: [
                   {
                     xtype: 'combo',
                     id: 'cmbGrupoMatriz',
                     fieldLabel: 'Grupo de la Matriz',
                     displayField: 'tx_nombre_grupo_matriz',
                     valueField: 'co_grupo_matriz',
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
                         datos: 'grupoMatriz'
                       },
                       fields: [  
                         {name:'tx_nombre_grupo_matriz'},  
                         {name:'co_grupo_matriz'}  
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
              id: 'obsMatrizDatos',
              style: {textTransform: "uppercase"},
              //allowBlank: false,
              name: 'obsMatrizDatos'   
         }               
         ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmMatrizDatos').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codMatrizDatos').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var GrupoMatriz=Ext.getCmp('cmbGrupoMatriz').getValue();
                 var obsMatrizDatos=Ext.getCmp('obsMatrizDatos').getValue();
                 var nombreMatrizDatos=Ext.getCmp('nombreMatrizDatos').getValue(); 

                 Ext.getCmp('frmMatrizDatos').getForm().submit({
                 method: 'POST',
                 params:{ operacion:Oper,GrupoMatriz:GrupoMatriz,nombreMatrizDatos:nombreMatrizDatos,obsMatrizDatos:obsMatrizDatos}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     
                     Ext.getCmp('frmMatrizDatos').getForm().reset();
                     Ext.getCmp('cmbGrupoMatriz').clearValue();
                     Ext.getCmp('cmbGrupoMatriz').getStore().removeAll();
                     Ext.getCmp('cmbGrupoMatriz').store.reload();
                     
                     Ext.getCmp('gridMatrizDatos').store.reload();
                     Ext.getCmp('codMatrizDatos').setValue('0');
                     Ext.getCmp('codMatrizDatos').hide();
                         
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
            Ext.getCmp('frmMatrizDatos').getForm().reset();
            
            Ext.getCmp('cmbGrupoMatriz').clearValue();
            Ext.getCmp('cmbGrupoMatriz').getStore().removeAll();
            Ext.getCmp('cmbGrupoMatriz').store.reload();           

            Ext.getCmp('codMatrizDatos').setValue('0');
            Ext.getCmp('codMatrizDatos').hide();
           }

        }]
    });
 
 
 //**********cargar del grid con los Renglons cargados********
   var storeMatrizDatos = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaMatrizDatos',
              z:30
        },
        fields: [  
           {name:'co_dato_matriz'},
           {name:'tx_nombre_dato_matriz'},
           {name:'co_grupo_matriz'},
           {name:'tx_nombre_grupo_matriz'},
           {name:'tx_obs_dato_matriz'}
        ]  
        });
   storeMatrizDatos.load({params:{datos:'listaMatrizDatos',z:30,start:0,limit:50}});//z:30,start:0,limit:5,
   
   var pagerMatrizDatos = new Ext.PagingToolbar({
           store: storeMatrizDatos, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Renglons Cargados',
           emptyMsg: 'No hay Renglones para mostrar',
           pageSize: 50
   });

   pagerMatrizDatos.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridMatrizDatos = new Ext.grid.GridPanel({
        store : storeMatrizDatos,
        id:'gridMatrizDatos',
        height:420,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_dato_matriz', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_dato_matriz', width:150, sortable:true}, //, hidden: true, hideable:false
            {header:'Grupo Matriz', dataIndex:'tx_nombre_grupo_matriz', width:470, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_dato_matriz', width:200, sortable: true},
            {header:'Cod. GrupoMatriz', dataIndex:'co_grupo_matriz', width:100, sortable:true, hidden: true, hideable:false},

         ],
         tbar: pagerMatrizDatos, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridMatrizDatos.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                     Ext.getCmp('codMatrizDatos').setValue(sel.data.co_dato_matriz); 
                     Ext.getCmp('codMatrizDatos').show();
                     Ext.getCmp('nombreMatrizDatos').setValue(sel.data.tx_nombre_dato_matriz);
                     Ext.getCmp('cmbGrupoMatriz').setValue(sel.data.co_grupo_matriz);
                     Ext.getCmp('obsMatrizDatos').setValue(sel.data.tx_obs_dato_matriz);

                     Ext.getCmp('nombreMatrizDatos').focus();              
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }           
         ]         
      });
   
   var listaMatrizDatos = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:500,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
          xtype:'fieldset', //*******************************
          title: 'Renglones de la Matriz Registrados',
          collapsible: true,
          autoHeight:true,
          items :[
            gridMatrizDatos
          ]
       }
      ]
   }); //*********fin grid*****************
 
  var winMatrizDatos = new Ext.Panel({  
      id: 'winProyectos',
      items: [
              frmMatrizDatos,
              listaMatrizDatos// lista
      ]
  });
  
   winMatrizDatos.render(document.body);
   Ext.getCmp('codMatrizDatos').hide();
   
});


