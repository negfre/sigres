
Ext.onReady(function() {
   
   var frmGrupoIndicador = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmGrupoIndicador',
       frame:true,
       url: 'cargarGrupoIndicador.php', //**********************
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       items: [
       {
	 id: 'codGrupoIndicador',
         fieldLabel: 'ID GrupoIndicador',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codGrupoIndicador', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       }, //**********fin *******
       {
        xtype:'fieldset', //**********************************
        title: 'Datos del Grupo de Indicadores',
        collapsible: true,
        autoHeight:true,
        items :[
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name: 'nombreGrupoIndicador',
            id: 'nombreGrupoIndicador',
            allowBlank: false,
            maxLength:100,
            style: {textTransform: "uppercase"},
              anchor:'70%',            
            emptyText: 'Nombre del Grupo de Indicadores...'
        },
        {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              id: 'obsGrupoIndicador',
              style: {textTransform: "uppercase"},
              //allowBlank: false,
              name: 'obsGrupoIndicador',
              mptyText: 'Observaciones del Grupo de Indicadores...'
       
        }        
        ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmGrupoIndicador').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codGrupoIndicador').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var nombreGrupoIndicador=Ext.getCmp('nombreGrupoIndicador').getValue();
                 var obsGrupoIndicador=Ext.getCmp('obsGrupoIndicador').getValue();



                 Ext.getCmp('frmGrupoIndicador').getForm().submit({						
                 method: 'POST',
                 params:{ operacion:Oper,nombreGrupoIndicador:nombreGrupoIndicador,obsGrupoIndicador:obsGrupoIndicador}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     Ext.getCmp('frmGrupoIndicador').getForm().reset();
                     Ext.getCmp('gridGrupoIndicador').store.reload();
                     Ext.getCmp('codGrupoIndicador').setValue('0');
                     Ext.getCmp('codGrupoIndicador').hide();
                         
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
            Ext.getCmp('frmGrupoIndicador').getForm().reset();
            Ext.getCmp('codGrupoIndicador').setValue('0');
            Ext.getCmp('codGrupoIndicador').hide();
           }

        }]
    });
 
 //**********cargar del grid con los Grupos registrados********
   var storeGrupoIndicador = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaGrupoIndicador',
              z:30
        },
        fields: [  
           {name:'co_grupo_indicador'},
           {name:'tx_nombre_grupo_indicador'},
           {name:'tx_obs_grupo_indicador'},         
        ]  
        });
   storeGrupoIndicador.load({params:{datos:'listaGrupoIndicador',z:30,start:0,limit:100}});//z:30,start:0,limit:5,
   
   var pagerGrupoIndicador = new Ext.PagingToolbar({
           store: storeGrupoIndicador, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Grupos Registrados',
           emptyMsg: 'No hay Grupos para mostrar',
           pageSize: 100
   });

   pagerGrupoIndicador.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridGrupoIndicador = new Ext.grid.GridPanel({
        store : storeGrupoIndicador,
        id:'gridGrupoIndicador',
        height:400,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_grupo_indicador', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_grupo_indicador', width:500, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_grupo_indicador', width:200, sortable: false}
         ],
         tbar: pagerGrupoIndicador, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridGrupoIndicador.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                  Ext.getCmp('codGrupoIndicador').setValue(sel.data.co_grupo_indicador); 
                  Ext.getCmp('codGrupoIndicador').show();
                  Ext.getCmp('nombreGrupoIndicador').setValue(sel.data.tx_nombre_grupo_indicador);
                  Ext.getCmp('obsGrupoIndicador').setValue(sel.data.tx_obs_grupo_indicador);
                  Ext.getCmp('nombreGrupoIndicador').focus();
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }          
         ]         
      });
     
   var listaGrupoIndicador = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
         xtype:'fieldset', //***************lista GrupoIndicador*******************
         title: 'Grupos Registrados',
         collapsible: true,
         autoHeight:true,
         items :[
           gridGrupoIndicador
         ]
       }
      ]
   }); //*********fin grid*****************
 
   var winGrupoIndicador = new Ext.Panel({  
      //layout: 'border',
      id: 'winGrupoIndicador',
      items: [
              frmGrupoIndicador,
              listaGrupoIndicador// lista de GrupoIndicador
      ]
   });
  
   winGrupoIndicador.render(document.body);
   Ext.getCmp('codGrupoIndicador').hide();
   
});


