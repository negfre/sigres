
Ext.onReady(function() {
   var valApoyo = new Ext.data.SimpleStore({
       fields: ['id', 'valores'],
       data : [['0','No'],['1','Si']]
   });
   
   var frmAnalista = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmAnalista',
       frame:true,
       url: 'cargarAnalista.php', //**********************
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       items: [
       {
	     id: 'codAnalista',
         fieldLabel: 'ID Analista',
         xtype:'textfield',//<-- campo oculto (hidden)  
         name:'codAnalista', //el nombre con que se envia al servidor  
         value: '0',//el valor que contenda
         style: 'text-align: right',
         readOnly: true
       }, //**********fin id analista********
       {
        xtype:'fieldset', //***************analista*******************
        title: 'Datos del Analista',
        collapsible: true,
        autoHeight:true,
        items :[
         {
            layout:'column',
            items:[
            {
                columnWidth:.25,
                layout: 'form',
                items: [
                {
                  xtype:'numberfield',
                  allowDecimals: false,
                  allowNegative: false,
                  fieldLabel: 'Cédula de Identidad',
                  name: 'ciAnalista',
                  id: 'ciAnalista',
                  allowBlank: false,
                  maxLength:10,
                  emptyText: 'Cédula de Identidad...'
                }
                ] //********columna 1*******
            },               
            {
                columnWidth:.25,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Indicador',
                  name: 'indicadorAnalista',
                  id: 'indicadorAnalista',
                  allowBlank: false,
                  maxLength:25,
                  tyle: {textTransform: "uppercase"},
                  emptyText: 'Indicador de Red...'
                }
                ] //********columna 1*******
            },
            {
                columnWidth:.25,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Nombre',
                  name: 'nombreAnalista',
                  id: 'nombreAnalista',
                  allowBlank: false,
                  maxLength:30,
                  tyle: {textTransform: "uppercase"},
                  emptyText: 'Nombre del Analista...'
                }
                ] //********columna 3********
            },
            {
                columnWidth:.25,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Apellido',
                  name: 'apellidoAnalista',
                  id: 'apellidoAnalista',
                  allowBlank: false,
                  maxLength:30,
                  tyle: {textTransform: "uppercase"},
                  emptyText: 'Apellido del Analista...'
                }
                ]
            }
            ]         
         
         },
         {
            layout:'column',
            items:[
            {
              columnWidth:.2,
              layout: 'form',
              items: [
               {               
                  xtype: 'combo',
                  layout: 'form',            
                  id: 'cmbPerfil',
                  fieldLabel: 'Perfil',
                  displayField: 'tx_nombre_perfil',
                  valueField: 'co_perfil',
                  emptyText:'Seleccione un Perfil...',
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
                      datos: 'perfil'
                    },
                    fields: [  
                      {name:'co_perfil'},
                      {name:'tx_nombre_perfil'} 
                    ]  
                  })
               }
               ]
            },
            {
               columnWidth:.55,
               layout: 'form',
               items: [              
                {               
                  xtype: 'combo',
                  layout: 'form',            
                  id: 'cmbSubProceso',
                  fieldLabel: 'SubProceso',
                  displayField: 'tx_nombre_subproc',
                  valueField: 'co_subproceso',
                  emptyText:'Seleccione un SubProceso...',
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
                      datos: 'subproceso'
                    },
                    fields: [  
                      {name:'co_subproceso'},
                      {name:'tx_nombre_subproc'} 
                    ]  
                  })
                }
                ]
            },
            {
               columnWidth:.25,
               layout: 'form',
               items: [                          
               {               
                  xtype: 'combo',
                  layout: 'form',            
                  id: 'cmbSupervisor',
                  fieldLabel: 'Supervisor',
                  displayField: 'tx_nombre_supervisor',
                  valueField: 'co_analista',
                  emptyText:'Seleccione un Supervisor...',
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
                      datos: 'analista'
                    },
                    fields: [  
                      {name:'co_analista'},
                      {name:'tx_nombre_supervisor'} 
                    ]  
                  })
               }
               ]
            }        
               
            ] 
         }, 
         {
            layout:'column',
            items:[
            {
                columnWidth:.20,
                layout: 'form',
                items: [
                {
                  xtype: 'datefield',
                  fieldLabel: 'Fecha de Nac.',
                  name: 'fechaNac', 
                  id: 'fechaNac',
                  //vtype: 'daterange',
                  allowBlank: false,
                  //endDateField: 'enddt', // id of the end date field
                  value: new Date()
                }
                ] //********columna 1*******
            },               
            {
                columnWidth:.25,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Teléfono Oficina',
                  name: 'extensionAnalista',
                  id: 'extensionAnalista',
                  allowBlank: false,
                  maxLength:13,
                  emptyText: 'Teléfono de Oficina...'
                }
                ] //********columna 1*******
            },
            {
                columnWidth:.25,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Celular',
                  name: 'celularAnalista',
                  id: 'celularAnalista',
                  maxLength:13,
                  emptyText: 'Número Celular...'
                }
                ] //********columna 3********
            },
            {
                columnWidth:.3,
                layout: 'form',
                items: [
                {
                  xtype: 'textfield',
                  fieldLabel: 'Oficina',
                  name: 'oficinaAnalista',
                  id: 'oficinaAnalista',
                  maxLength:150,
                  tyle: {textTransform: "uppercase"},
                  emptyText: 'Oficina del Analista...'
                }
                ]
            }
            ]         
         }
         ]
      },
      {
         xtype: 'combo',
         name: 'cmbApoyo',
         id: 'cmbApoyo',
         fieldLabel: 'Analista de Apoyo',
         mode: 'local',
         store: valApoyo,
         autoLoad: true,
         valueField: 'id',
         displayField:'valores',
         allowBlank: false,
         typeAhead: true,
         selectOnFocus:true,
         editable: true,
         forceSelection: true,               
         triggerAction: 'all',
        width: 100
      }      
      ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmAnalista').getForm().isValid()) {
                 var Oper='';
                 //verifica si se trata de una actualizacion o un registro nuevo 
                 if (Ext.getCmp('codAnalista').getValue() == '0')
                   Oper = 'NUEVO';
                 else
                   Oper = 'ACTUALIZAR';
                 var ci=Ext.getCmp('ciAnalista').getValue();  
                 var indicador=Ext.getCmp('indicadorAnalista').getValue();
                 var nombre=Ext.getCmp('nombreAnalista').getValue();
                 var apellido=Ext.getCmp('apellidoAnalista').getValue();
                 var perfilAnalista=Ext.getCmp('cmbPerfil').getValue();
                 var subprocesoAnalista=Ext.getCmp('cmbSubProceso').getValue();
                 var supervisorAnalista=Ext.getCmp('cmbSupervisor').getValue();
                 var extension=Ext.getCmp('extensionAnalista').getValue();
                 var celAnalista=Ext.getCmp('celularAnalista').getValue();
                 var oficAnalista=Ext.getCmp('oficinaAnalista').getValue();
                 var apoyo=Ext.getCmp('cmbApoyo').getValue(); 


                 Ext.getCmp('frmAnalista').getForm().submit({						
                 method: 'POST',
                 params:{ operacion:Oper,ci:ci,indicador:indicador,nombre:nombre,apellido:apellido,perfilAnalista:perfilAnalista,subprocesoAnalista:subprocesoAnalista,supervisorAnalista:supervisorAnalista,extension:extension,celAnalista:celAnalista,oficAnalista:oficAnalista,apoyo:apoyo}, //colocar los datos en formato json para enviarlos
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     Ext.getCmp('frmAnalista').getForm().reset();
                     
                     Ext.getCmp('cmbPerfil').clearValue();
                     Ext.getCmp('cmbPerfil').getStore().removeAll();
                     Ext.getCmp('cmbPerfil').store.reload();

                     Ext.getCmp('cmbSubProceso').clearValue();
                     Ext.getCmp('cmbSubProceso').getStore().removeAll();
                     Ext.getCmp('cmbSubProceso').store.reload();

                     Ext.getCmp('cmbSupervisor').clearValue();
                     Ext.getCmp('cmbSupervisor').getStore().removeAll();
                     Ext.getCmp('cmbSupervisor').store.reload();

                     //Ext.getCmp('cmbApoyo').clearValue();
                     // Ext.getCmp('cmbApoyo').getStore().removeAll();
                     //Ext.getCmp('cmbApoyo').store.reload();                     
                     
                     Ext.getCmp('gridAnalista').store.reload();
                     
                     Ext.getCmp('codAnalista').setValue('0');
                     Ext.getCmp('codAnalista').hide();
                         
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
            Ext.getCmp('frmAnalista').getForm().reset();

            Ext.getCmp('cmbPerfil').clearValue();
            Ext.getCmp('cmbPerfil').getStore().removeAll();
            Ext.getCmp('cmbPerfil').store.reload();

            Ext.getCmp('cmbSubProceso').clearValue();
            Ext.getCmp('cmbSubProceso').getStore().removeAll();
            Ext.getCmp('cmbSubProceso').store.reload();

            Ext.getCmp('cmbSupervisor').clearValue();
            Ext.getCmp('cmbSupervisor').getStore().removeAll();
            Ext.getCmp('cmbSupervisor').store.reload();

            //Ext.getCmp('cmbApoyo').clearValue();
            //Ext.getCmp('cmbApoyo').getStore().removeAll();
            //Ext.getCmp('cmbApoyo').store.reload();                     
            
            Ext.getCmp('gridAnalista').store.reload();
            
            Ext.getCmp('codAnalista').setValue('0');
            Ext.getCmp('codAnalista').hide();


            Ext.getCmp('codAnalista').setValue('0');
            Ext.getCmp('codAnalista').hide();
           }

        }]
    });
 
 //**********cargar del grid con los analistas registrados********
   var storeAnalista = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaAnalistas',
              z:30
        },
        fields: [  
           {name:'co_analista'},
           {name:'co_subproceso'},
           {name:'co_perfil'},            
           {name:'tx_nombre_subproceso'},
           {name:'tx_indicador_analista'},
           {name:'tx_cedula_analista'},            
           {name:'tx_nombre_analista'},
           {name:'tx_apellido_analista'},
           {name:'tx_supervisor'},
           {name:'co_supervisor'},
           {name:'tx_nombre_perfil'},
           {name:'tx_extension_analista'},
           {name:'tx_celular_analista'},           
           {name:'tx_oficina_analista'},
           {name:'apoyo'},
           {name:'in_apoyo_subprocesos'},                      
           {name:'fecha_nacimiento'},           
        ]  
        });
   storeAnalista.load({params:{datos:'listaAnalistas',z:30,start:0,limit:100}});//z:30,start:0,limit:5,
   
   var pagerAnalista = new Ext.PagingToolbar({
           store: storeAnalista, // <--grid and PagingToolbar using same store
           displayInfo: true,
           displayMsg: '{0} - {1} of {2} Analistas Registrados',
           emptyMsg: 'No hay Analistas para mostrar',
           pageSize: 100
   });

   pagerAnalista.on('beforechange',function(bar,params){
           params.z = 30;
   });
   
   var gridAnalista = new Ext.grid.GridPanel({
        store : storeAnalista,
        id:'gridAnalista',
        height:400,
         // <--grid and PagingToolbar using same store
         columns: [
            new Ext.grid.RowNumberer(),
            {header:'ID', dataIndex:'co_analista', type: 'integer', width:50, align:'right', sortable: true},
            {header:'Cédula', dataIndex:'tx_cedula_analista', width:90, align:'right', sortable:true},             
            {header:'Indicador', dataIndex:'tx_indicador_analista', width:100, sortable:true}, 
            {header:'Nombre', dataIndex:'tx_nombre_analista', width:130, sortable: true},
            {header:'Apellido', dataIndex:'tx_apellido_analista', width:130, sortable: true},
            {header:'Perfil', dataIndex:'tx_nombre_perfil',width:130, sortable: true},
            {header:'co_perfil', dataIndex:'co_perfil', width:100, sortable:true, hidden: true, hideable:false},
            {header:'SubProceso', dataIndex:'tx_nombre_subproceso',width:220, sortable: true},
            {header:'co_subproceso', dataIndex:'co_subproceso', width:100, sortable:true, hidden: true, hideable:false},
            {header:'Supervisor', dataIndex:'tx_supervisor',width:150, sortable: true},
            {header:'co_supervisor', dataIndex:'co_supervisor', width:100, sortable:true, hidden: true, hideable:false},            
            {header:'Fecha Nac.', dataIndex:'fecha_nacimiento',width:100, sortable: true},
            {header:'Extensión', dataIndex:'tx_extension_analista',width:80, sortable: true},
            {header:'Celular', dataIndex:'tx_celular_analista', width:100, sortable: true},
            {header:'Oficina', dataIndex:'tx_oficina_analista', width:150, sortable: true},
            {header:'Analista de Apoyo', dataIndex:'apoyo', width:100, sortable: true},
            {header:'in_apoyo_subprocesos', dataIndex:'in_apoyo_subprocesos', type: 'integer', width:50, sortable:true, hidden: true, hideable:false},
         ],
         tbar: pagerAnalista, // <--agregamos el pagingtoolbar al grid
         border: false,
         stripeRows: true,
         bbar: [
           {
            text: 'Modificar',
            align: 'center',
            iconCls	: 'x-icon-menu-modificar',
            handler: function() {
               var sm = gridAnalista.getSelectionModel();
               var sel = sm.getSelected();
               if (sm.hasSelection()){
                  Ext.getCmp('codAnalista').setValue(sel.data.co_analista); 
                  Ext.getCmp('codAnalista').show();
                  Ext.getCmp('ciAnalista').setValue(sel.data.tx_cedula_analista);
                  
                  Ext.getCmp('indicadorAnalista').setValue(sel.data.tx_indicador_analista);
                  Ext.getCmp('nombreAnalista').setValue(sel.data.tx_nombre_analista);
                  Ext.getCmp('apellidoAnalista').setValue(sel.data.tx_apellido_analista);
                  Ext.getCmp('cmbPerfil').setValue(sel.data.co_perfil);
                  Ext.getCmp('cmbSupervisor').setValue(sel.data.co_supervisor);
                  Ext.getCmp('cmbSubProceso').setValue(sel.data.co_subproceso);
                  Ext.getCmp('cmbApoyo').setValue(sel.data.in_apoyo_subprocesos);
                  
                  Ext.getCmp('oficinaAnalista').setValue(sel.data.tx_oficina_analista);
                  Ext.getCmp('extensionAnalista').setValue(sel.data.tx_extension_analista);
                  Ext.getCmp('celularAnalista').setValue(sel.data.tx_celular_analista);
                  
                  Ext.getCmp('ciAnalista').focus();
               }
               else
               {Ext.Msg.alert('Modificar','Debe seleccionar la fila del registro que desea modificar');}
             }
           }          
         ]         
      });
     
   var listaAnalista = new Ext.Panel({
      layout: 'fit',
      width: 799,
      height:450,
      bodyStyle:'padding:10px 5px 0',
      items:[
       {
         xtype:'fieldset', //***************lista analista*******************
         title: 'Analistas Registrados',
         collapsible: true,
         autoHeight:true,
         items :[
           gridAnalista
         ]
       }
      ]
   }); //*********fin grid*****************
 
  var winAnalista = new Ext.Panel({  
      //layout: 'border',
      id: 'winAnalista',
      items: [
              frmAnalista,
              listaAnalista// lista de Analista
      ]
  });
  
   winAnalista.render(document.body);
   Ext.getCmp('codAnalista').hide();
   
});


