
Ext.onReady(function() {

   var storeAllMedida = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'datos',
        //totalProperty: 'total',
        baseParams: {
              datos: 'allMedida'
        },
        fields: [  
           {name:'co_unidad_medida'},
           {name:'tx_nombre_medida'}
        ]  
        });
   storeAllMedida.load({params:{datos:'allMedida'}});
   

   var chkCol = new Ext.grid.CheckboxSelectionModel({
         singleSelect: false
      });
    
    
   var gridSubactividadMedida = new Ext.grid.GridPanel({
        store: storeAllMedida,
        id:'gridMedida',
        sm: chkCol,        
        columns: [
            chkCol,
            {header:'Nombre de la medida', dataIndex:'tx_nombre_medida', width:750, sortable: true},
            {header:'co_unidad_medida', dataIndex:'co_unidad_medida', width:100, sortable:true, hidden: true, hideable:false}
         ],        
        columnLines: true,
        width:790,
        height:600,
        frame:true,
        title:'Listado de medidas'
    });   
   
   function listaMedidas(){
      var lMedida=[]
      chkCol.each(function(rec){
          lMedida.push(rec.get('co_unidad_medida'));
      });
      return lMedida.join();
   }
   
   
   var frmSubactividadMedida = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmSubactividadMedida',
       frame:true,
       url: 'cargarSubactividadMedida.php',
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       //height : 430,
       items: [
                   
       {
         xtype:'fieldset', //************d************
         title: 'Medida de la Sub-Actividad',
         autoHeight:true,
         layout: 'form',
         items :[
		 {
            xtype: 'combo',
            layout: 'form',
            id: 'cmbServicio',
            fieldLabel: 'Servicio',
            displayField: 'tx_nombre_servicio',
            valueField: 'co_servicio',
            emptyText:'Seleccione un Servicio...',
            allowBlank: false,
            typeAhead: true,
            forceSelection: true,
            selectOnFocus:true,
            triggerAction: 'all',
            anchor:'95%',
            mode: 'local',
            store : new Ext.data.JsonStore({
              url: 'datosSolicitados.php',
              autoLoad: true,
              root: 'datos',
              baseParams: {
                datos: 'servicio'
              },
              fields: [  
                {name:'tx_nombre_servicio'},  
                {name:'co_servicio'}  
              ]  
            }),
               listeners: {
                 'select': function(c,r,i){
                   Ext.getCmp('cmbActividad').clearValue();
                   Ext.getCmp('cmbActividad').getStore().removeAll();
                   Ext.getCmp('cmbSubactividad').clearValue();
                   Ext.getCmp('cmbSubactividad').getStore().removeAll();                     
                   st = Ext.getCmp('cmbActividad').getStore();
                   st.load({
                     params:{
                       co_servicio: r.data.co_servicio
                     }
                   })
                 }
               }
       },
       {
                columnWidth:.50,
                layout: 'form',
                items: [
                {
                  xtype: 'combo',
                  id: 'cmbActividad',
                  fieldLabel: 'Actividad',
                  displayField: 'tx_nombre_actividad',
                  valueField: 'co_actividad',
                  emptyText:'Seleccione una Actividad...',
                  allowBlank: false,
                  typeAhead: true,
                  forceSelection: true,
                  selectOnFocus:true,
                  triggerAction: 'all',
                  anchor:'95%',
                  mode: 'local',
                  store : new Ext.data.JsonStore({
                    url: 'datosSolicitados.php',
                    autoLoad: true,
                    root: 'datos',
                    baseParams: {
                      datos: 'actividad'
                    },
                    fields: [  
                      {name:'tx_nombre_actividad'},  
                      {name:'co_actividad'}  
                    ]  
                  }),
                  listeners: {
                    'select': function(c,r,i){
                      Ext.getCmp('cmbSubactividad').clearValue();
                      Ext.getCmp('cmbSubactividad').getStore().removeAll();
                      st = Ext.getCmp('cmbSubactividad').getStore();
                      st.load({
                        params:{
                          co_actividad: r.data.co_actividad
                        }
                      })
                    }
                  }
                }              
                ] //********columna 1*******
        },
         {
            layout: 'form',
            items: [
            {
              xtype: 'combo',
              layout: 'form',  
              id: 'cmbSubactividad',
              fieldLabel: 'Sub-Actividad',
              displayField: 'tx_nombre_subactividad',
              valueField: 'co_subactividad',
              emptyText:'Seleccione un Sub-Actividad...',
              allowBlank: false,
              typeAhead: true,
              forceSelection: true,
              selectOnFocus:true,
              triggerAction: 'all',
              anchor:'70%',
              mode: 'local',
              store : new Ext.data.JsonStore({
                url: 'datosSolicitados.php',
                //autoLoad: true,
                root: 'datos',
                baseParams: { 
                  datos: 'subactividad'
                },
                fields: [       
                  {name:'tx_nombre_subactividad'},  
                  {name:'co_subactividad'}  
                ]  
              }),
               listeners: {
                 'select': function(c,r,i){
                  chkCol.clearSelections(false);
                  storeSubactividadMedida.load({params:{
                     datos:'listaSubactividadMedida',
                     co_subactividad: r.data.co_subactividad
                     }});
                 }
               }
            }              
            ]        
         }                       
         ]
       }
       ,gridSubactividadMedida 
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmSubactividadMedida').getForm().isValid()) {
               if (chkCol.getCount()>0)
               {
                 var subactividad=Ext.getCmp('cmbSubactividad').getValue();
                 var ls = listaMedidas();
                 
                 Ext.getCmp('frmSubactividadMedida').getForm().submit({
                 method: 'POST',
                 params:{ operacion:'CARGAR',subactividad:subactividad,listaMedida:ls}, //colocar los datos en formato json para enviarlo
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     
                     Ext.getCmp('frmSubactividadMedida').getForm().reset();
                     chkCol.clearSelections(false);
                     Ext.getCmp('cmbSubactividad').clearValue();
                     Ext.getCmp('cmbSubactividad').getStore().removeAll();
                     Ext.getCmp('cmbSubactividad').store.reload();

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
                 alert("No hay medidas seleccionadas para esta Sub-Actividad!");
              }
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
            chkCol.clearSelections(false);
            Ext.getCmp('frmSubactividadMedida').getForm().reset();
            Ext.getCmp('cmbSubactividad').clearValue();
            Ext.getCmp('cmbSubactividad').getStore().removeAll();
            Ext.getCmp('cmbSubactividad').store.reload();                     
           }

        }]
   });
 
 
 
 //**********cargar de las medidas********
   var storeSubactividadMedida = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'datos',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaSubactividadMedida'
        },
        fields: [  
           {name:'co_medida_subactividad'},
           {name:'co_subactividad'},
           {name:'co_unidad_medida'}
        ]  
        });

    
   function marcarMedida(ls){
      var i=0;
      var listaMedida=[];
      chkCol.clearSelections(false);

      storeAllMedida.each(function(record) {
        for (var j=0;j<ls.length;j++) {
         if (record.data['co_unidad_medida']  == ls[j])
                listaMedida.push(i);
         }
        i=i+1; 
      });
      chkCol.selectRows(listaMedida,true);
    } 
    
    
   storeSubactividadMedida.on({
         'load':{
             fn: function(store, records, options){
                var lMedida=[];
                store.each(function(record){
                   lMedida.push(record.data['co_unidad_medida']);
                });
                if (lMedida.length > 0){
                  marcarMedida(lMedida);
                }
                else{
                  alert("No hay medidas asociadas a esta Sub-Actividad!");
                  chkCol.clearSelections(false);
                }
             }//,
             //scope:this
         }
   });

 
 
  var winSubactividadMedida = new Ext.Panel({  
      id: 'winProyectos',
      items: [
              frmSubactividadMedida
             ]
  });
  
   winSubactividadMedida.render(document.body);
   
});


