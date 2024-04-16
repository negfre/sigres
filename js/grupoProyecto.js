
Ext.onReady(function() {
   
   var frmGrupoProyecto = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmGrupoProyecto',
       frame:true,
       url: 'cargarGrupoProyecto.php', //**********************
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       items: [
       {
	 id: 'codGrupoProyecto',
         fieldLabel: 'ID Grupo Proyecto',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codGrupoProyecto', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       }, //**********fin Grupo Proyecto********
       {
        xtype:'fieldset', //***************GrupoProyecto*******************
        title: 'Datos del Grupo de Proyectos',
        collapsible: true,
        autoHeight:true,
        items :[
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name: 'nombreGrupoProyecto',
            id: 'nombreGrupoProyecto',
            allowBlank: false,
            maxLength:50,
            style: {textTransform: "uppercase"},
              anchor:'70%',            
            emptyText: 'Nombre del Grupo de Proyectos...'
        },
        {//observaciones
              xtype:'textarea',
              layout: 'form',
              anchor:'95%',
              fieldLabel: 'Observaciones',
              id: 'obsGrupoProyecto',
              style: {textTransform: "uppercase"},
              //allowBlank: false,
              name: 'obsGrupoProyecto',
              mptyText: 'Observaciones del Grupo de Proyectos...'
       
        }        
        ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmGrupoProyecto').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codGrupoProyecto').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var nombreGrupoProyecto=Ext.getCmp('nombreGrupoProyecto').getValue();
                 var obsGrupoProyecto=Ext.getCmp('obsGrupoProyecto').getValue();



                 Ext.getCmp('frmGrupoProyecto').getForm().submit({
                 method: 'POST',
                 params:{ operacion:Oper,nombreGrupoProyecto:nombreGrupoProyecto,obsGrupoProyecto:obsGrupoProyecto}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     Ext.getCmp('frmGrupoProyecto').getForm().reset();
                     Ext.getCmp('gridGrupoProyecto').store.reload();
                     Ext.getCmp('codGrupoProyecto').setValue('0');
                     Ext.getCmp('codGrupoProyecto').hide();
                         
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
            Ext.getCmp('frmGrupoProyecto').getForm().reset();
            Ext.getCmp('codGrupoProyecto').setValue('0');
            Ext.getCmp('codGrupoProyecto').hide();
           }

        }]
    });
 
 //**********cargar del grid con los GrupoProyecto********
   var storeGrupoProyecto = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaGrupoProyecto',
              z:30
        },
        fields: [  
           {name:'co_grupo_proyecto'},
           {name:'tx_nombre_grupo_proyecto'},
           {name:'tx_obs_grupo_proyecto'},         
        ]  
        });
   storeGrupoProyecto.load({params:{datos:'listaGrupoProyecto',z:30,start:0,limit:100}});//z:30,start:0,limit:5,
   
   var pagerGrupoProyecto = new Ext.PagingToolbar({
           store: storeGrupoProyecto, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Grupode Proyectos Registrados',
           emptyMsg: 'No hay Grupo de Proyectos para mostrar',
           pageSize: 100
   });

   pagerGrupoProyecto.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridGrupoProyecto = new Ext.grid.GridPanel({
        store : storeGrupoProyecto,
        id:'gridGrupoProyecto',
        height:400,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_grupo_proyecto', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Nombre', dataIndex:'tx_nombre_grupo_proyecto', width:350, sortable: true},
            {header:'Observaciones', dataIndex:'tx_obs_grupo_proyecto', width:300, sortable: false}
         ],
         tbar: pagerGrupoProyecto, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridGrupoProyecto.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                  Ext.getCmp('codGrupoProyecto').setValue(sel.data.co_grupo_proyecto); 
                  Ext.getCmp('codGrupoProyecto').show();
                  Ext.getCmp('nombreGrupoProyecto').setValue(sel.data.tx_nombre_grupo_proyecto);
                  Ext.getCmp('obsGrupoProyecto').setValue(sel.data.tx_obs_grupo_proyecto);
                  Ext.getCmp('nombreGrupoProyecto').focus();
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }          
         ]         
      });
     
   var listaGrupoProyecto = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
         xtype:'fieldset', //***************lista GrupoProyecto*******************
         title: 'Grupo de Proyectos Registrados',
         collapsible: true,
         autoHeight:true,
         items :[
           gridGrupoProyecto
         ]
       }
      ]
   }); //*********fin grid*****************
 
   var winGrupoProyecto = new Ext.Panel({  
      //layout: 'border',
      id: 'winGrupoProyecto',
      items: [
              frmGrupoProyecto,
              listaGrupoProyecto// lista de Divisiones
      ]
   });
  
   winGrupoProyecto.render(document.body);
   Ext.getCmp('codGrupoProyecto').hide();
   
});


