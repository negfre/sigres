
Ext.onReady(function() {
   
   var frmGrupoMatriz = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmGrupoMatriz',
       frame:true,
       url: 'cargarGrupoMatriz.php', //**********************
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       items: [
       {
	 id: 'codGrupoMatriz',
         fieldLabel: 'ID GrupoMatriz',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codGrupoMatriz', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       }, //**********fin usuario********
       {
        xtype:'fieldset', //***************usuario*******************
        title: 'Datos del Grupo de la Matriz',
        collapsible: true,
        autoHeight:true,
        items :[
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name: 'nombreGrupoMatriz',
            id: 'nombreGrupoMatriz',
            allowBlank: false,
            maxLength:100,
            style: {textTransform: "uppercase"},
              anchor:'70%',            
            emptyText: 'Nombre del Grupo Matriz...'
        },
        {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              id: 'obsGrupoMatriz',
              style: {textTransform: "uppercase"},
              //allowBlank: false,
              name: 'obsGrupoMatriz',
              mptyText: 'Observaciones del Grupo en la Matriz...'
       
        }        
        ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmGrupoMatriz').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codGrupoMatriz').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var nombreGrupoMatriz=Ext.getCmp('nombreGrupoMatriz').getValue();
                 var obsGrupoMatriz=Ext.getCmp('obsGrupoMatriz').getValue();



                 Ext.getCmp('frmGrupoMatriz').getForm().submit({						
                 method: 'POST',
                 params:{ operacion:Oper,nombreGrupoMatriz:nombreGrupoMatriz,obsGrupoMatriz:obsGrupoMatriz}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     Ext.getCmp('frmGrupoMatriz').getForm().reset();
                     Ext.getCmp('gridGrupoMatriz').store.reload();
                     Ext.getCmp('codGrupoMatriz').setValue('0');
                     Ext.getCmp('codGrupoMatriz').hide();
                         
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
            Ext.getCmp('frmGrupoMatriz').getForm().reset();
            Ext.getCmp('codGrupoMatriz').setValue('0');
            Ext.getCmp('codGrupoMatriz').hide();
           }

        }]
    });
 
 //**********cargar del grid con los Grupos registrados********
   var storeGrupoMatriz = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaGrupoMatriz',
              z:30
        },
        fields: [  
           {name:'co_grupo_matriz'},
           {name:'tx_nombre_grupo_matriz'},
           {name:'tx_obs_grupo_matriz'},         
        ]  
        });
   storeGrupoMatriz.load({params:{datos:'listaGrupoMatriz',z:30,start:0,limit:100}});//z:30,start:0,limit:5,
   
   var pagerGrupoMatriz = new Ext.PagingToolbar({
           store: storeGrupoMatriz, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Grupos Registrados',
           emptyMsg: 'No hay Grupos para mostrar',
           pageSize: 100
   });

   pagerGrupoMatriz.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridGrupoMatriz = new Ext.grid.GridPanel({
        store : storeGrupoMatriz,
        id:'gridGrupoMatriz',
        height:400,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_grupo_matriz', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_grupo_matriz', width:500, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_grupo_matriz', width:200, sortable: false}
         ],
         tbar: pagerGrupoMatriz, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridGrupoMatriz.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                  Ext.getCmp('codGrupoMatriz').setValue(sel.data.co_grupo_matriz); 
                  Ext.getCmp('codGrupoMatriz').show();
                  Ext.getCmp('nombreGrupoMatriz').setValue(sel.data.tx_nombre_grupo_matriz);
                  Ext.getCmp('obsGrupoMatriz').setValue(sel.data.tx_obs_grupo_matriz);
                  Ext.getCmp('nombreGrupoMatriz').focus();
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }          
         ]         
      });
     
   var listaGrupoMatriz = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
         xtype:'fieldset', //***************lista GrupoMatriz*******************
         title: 'Grupos Registrados',
         collapsible: true,
         autoHeight:true,
         items :[
           gridGrupoMatriz
         ]
       }
      ]
   }); //*********fin grid*****************
 
   var winGrupoMatriz = new Ext.Panel({  
      //layout: 'border',
      id: 'winGrupoMatriz',
      items: [
              frmGrupoMatriz,
              listaGrupoMatriz// lista de GrupoMatriz
      ]
   });
  
   winGrupoMatriz.render(document.body);
   Ext.getCmp('codGrupoMatriz').hide();
   
});


