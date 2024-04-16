
Ext.onReady(function() {
	//con esto agregamos el comportamiento de uppercase
	Ext.apply(Ext.form.VTypes,{
	  uppercase:function(val,field) {      
				var texto = val;
				texto = Ext.util.Format.uppercase(texto);
				field.setRawValue(texto);
				return true;         
				  }
	});	
   
   var frmUsuario = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmUsuario',
       frame:true,
       url: 'cargarUsuario.php', //**********************
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       items: [
       {
	 id: 'codUsuario',
         fieldLabel: 'ID Usuario',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codUsuario', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       }, //**********fin usuario********
       {
        xtype:'fieldset', //***************usuario*******************
        title: 'Datos del Usuario',
        collapsible: true,
        autoHeight:true,
        items :[
        {
            layout:'column',
            items:[
            {
                columnWidth:.33,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Indicador',
                  name: 'indicadorUsuario',
                  id: 'indicadorUsuario',
                  allowBlank: false,
                  vtype: 'uppercase',
                  maxLength:25,
                  emptyText: 'Indicador de Red...'
                }
                ] //********columna 1*******
            },
            {
                columnWidth:.33,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Nombre',
                  name: 'nombreUsuario',
                  id: 'nombreUsuario',
                  allowBlank: false,
                  vtype: 'uppercase',
                  maxLength:30,
                  emptyText: 'Nombre del Usuario...'
                }
                ] //********columna 3********
            },
            {
                columnWidth:.33,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Apellido',
                  name: 'apellidoUsuario',
                  id: 'apellidoUsuario',
                  vtype: 'uppercase',
                  allowBlank: false,
                  maxLength:30,
                  emptyText: 'Apellido del Usuario...'
                }
                ]
            }
            ]         
         
        },
        {
            xtype: 'combo',
            layout: 'form',            
            id: 'cmbGerenciaUsuario',
            fieldLabel: 'Gerencia',
            displayField: 'tx_nombre',
            valueField: 'co_gerencia',
            emptyText:'Seleccione una Gerencia...',
            allowBlank: false,
            typeAhead: true,
            selectOnFocus:true,
            editable: true,
            forceSelection: true,               
            triggerAction: 'all',
            anchor:'90%',
            mode: 'local',
            store : new Ext.data.JsonStore({
              url: 'datosSolicitados.php',
              autoLoad: true,
              root: 'datos',
              baseParams: {
                datos: 'gerenciaUN'
              },
              fields: [  
                {name:'co_gerencia'},
                {name:'tx_nombre'} 
              ]  
            })
        },
        {
            layout:'column',
            items:[
            {
                columnWidth:.33,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Cargo',
                  name: 'cargoUsuario',
                  id: 'cargoUsuario',
                  allowBlank: false,
                  maxLength:50,
                  vtype: 'uppercase',
                  emptyText: 'Cargo del Usuario...'
                }
                ] //********columna 1*******
            },
            {
                columnWidth:.33,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Teléfono',
                  name: 'telefonoUsuario',
                  id: 'telefonoUsuario',
                  vtype: 'uppercase',
                  maxLength:14,
                  emptyText: 'Teléfono del Usuario...'
                }
                ] //********columna 3********
            },
            {
                columnWidth:.33,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Ubicación',
                  name: 'ubicacionUsuario',
                  id: 'ubicacionUsuario',
                  maxLength:150,
                  vtype: 'uppercase',
                  emptyText: 'Ubicación del Usuario...'
                }
                ]
            }
            ]         
        }        
        ]
       }
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmUsuario').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codUsuario').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var gerenciaUsuario=Ext.getCmp('cmbGerenciaUsuario').getValue();  
                 var indicadorUsuario=Ext.getCmp('indicadorUsuario').getValue();
                 var nombreUsuario=Ext.getCmp('nombreUsuario').getValue();
                 var apellidoUsuario=Ext.getCmp('apellidoUsuario').getValue();
                 var cargoUsuario=Ext.getCmp('cargoUsuario').getValue();
                 var ubicacionUsua=Ext.getCmp('ubicacionUsuario').getValue();
                 var telefonoUsua=Ext.getCmp('telefonoUsuario').getValue(); //pendiente o cerrado


                 Ext.getCmp('frmUsuario').getForm().submit({						
                 method: 'POST',
                 params:{ operacion:Oper,gerenciaUsuario:gerenciaUsuario,indicadorUsuario:indicadorUsuario,nombreUsuario:nombreUsuario,apellidoUsuario:apellidoUsuario,cargoUsuario:cargoUsuario,ubicacionUsua:ubicacionUsua,telefonoUsua:telefonoUsua}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     Ext.getCmp('frmUsuario').getForm().reset();
                     Ext.getCmp('cmbGerenciaUsuario').clearValue();
                     Ext.getCmp('cmbGerenciaUsuario').getStore().removeAll();
                     Ext.getCmp('cmbGerenciaUsuario').store.reload();            
                     Ext.getCmp('gridUsuarios').store.reload();
                     Ext.getCmp('codUsuario').setValue('0');
                     Ext.getCmp('codUsuario').hide();
                         
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
            Ext.getCmp('frmUsuario').getForm().reset();
            Ext.getCmp('cmbGerenciaUsuario').clearValue();
            Ext.getCmp('cmbGerenciaUsuario').getStore().removeAll();
            Ext.getCmp('cmbGerenciaUsuario').store.reload();            
            Ext.getCmp('codUsuario').setValue('0');
            Ext.getCmp('codUsuario').hide();
           }

        }]
    });
 
 //**********cargar del grid con los usuarios registrados********
   var storeUsuario = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaUsuarios',
              z:30
        },
        fields: [  
           {name:'co_usuario'},
           {name:'co_gerencia'},
           {name:'tx_nombre_gerencia'},
           {name:'tx_nombre_unidad_negocio'},
           {name:'tx_indicador_usuario'},
           {name:'tx_nombre_usuario'},
           {name:'tx_apellido_usuario'},
           {name:'tx_cargo_usuario'},
           {name:'tx_telefono_usuario'},
           {name:'tx_ubicacion_usuario'},         
        ]  
        });
   storeUsuario.load({params:{datos:'listaUsuarios',z:30,start:0,limit:300}});//z:30,start:0,limit:5,
   
   var pagerUsuario = new Ext.PagingToolbar({
           store: storeUsuario, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Usuarios Registrados',
           emptyMsg: 'No hay usuarios para mostrar',
           pageSize: 300
   });

   pagerUsuario.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridUsuarios = new Ext.grid.GridPanel({
        store : storeUsuario,
        id:'gridUsuarios',
        height:400,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_usuario', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Indicador', dataIndex:'tx_indicador_usuario', width:100, sortable:true}, //, hidden: true, hideable:false
            {header:'Nombre', dataIndex:'tx_nombre_usuario', width:130, sortable: true},
            {header:'Apellido', dataIndex:'tx_apellido_usuario',width:130, sortable: true},
            {header:'Gerencia', dataIndex:'tx_nombre_gerencia',width:130, sortable: true},
            {header:'Cod. Gerecnia', dataIndex:'co_gerencia', width:100, sortable:true, hidden: true, hideable:false},            
            {header:'Unidad de Negocio', dataIndex:'tx_nombre_unidad_negocio',width:150, sortable: true},            
            {header:'Cargo', dataIndex:'tx_cargo_usuario', width:100, sortable: true},
            {header:'Tel&eacute;fono', dataIndex:'tx_telefono_usuario', width:100, sortable: true},
            {header:'Ubicaci&oacute;n', dataIndex:'tx_ubicacion_usuario', width:180, sortable: true}
         ],
         tbar: pagerUsuario, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridUsuarios.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                  Ext.getCmp('codUsuario').setValue(sel.data.co_usuario); 
                  Ext.getCmp('codUsuario').show();
                  Ext.getCmp('cmbGerenciaUsuario').setValue(sel.data.co_gerencia);
                  Ext.getCmp('indicadorUsuario').setValue(sel.data.tx_indicador_usuario);
                  Ext.getCmp('nombreUsuario').setValue(sel.data.tx_nombre_usuario);
                  Ext.getCmp('apellidoUsuario').setValue(sel.data.tx_apellido_usuario);
                  Ext.getCmp('cargoUsuario').setValue(sel.data.tx_cargo_usuario);
                  Ext.getCmp('ubicacionUsuario').setValue(sel.data.tx_ubicacion_usuario);
                  Ext.getCmp('telefonoUsuario').setValue(sel.data.tx_telefono_usuario);
                  Ext.getCmp('indicadorUsuario').focus();
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }          
         ]         
      });
     
   var listaUsuarios = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
         xtype:'fieldset', //***************lista usuario*******************
         title: 'Usuarios Registrados',
         collapsible: true,
         autoHeight:true,
         items :[
           gridUsuarios
         ]
       }
      ]
   }); //*********fin grid*****************
 
  var winUsuario = new Ext.Panel({  
      //layout: 'border',
      id: 'winUsuario',
      items: [
              frmUsuario,
              listaUsuarios// lista de Usuario
      ]
  });
  
   winUsuario.render(document.body);
   Ext.getCmp('codUsuario').hide();
   
});


