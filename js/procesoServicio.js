
Ext.onReady(function() {

   var storeAllServicio = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'datos',
        totalProperty: 'total',
        baseParams: {
              datos: 'allServicio'
        },
        fields: [  
           {name:'co_servicio'},
           {name:'tx_nombre_servicio'}
        ]  
        });
   storeAllServicio.load({params:{datos:'allServicio'}});
   

   var chkCol = new Ext.grid.CheckboxSelectionModel({
         singleSelect: false
      });
    
    
   var gridProcesoServicio = new Ext.grid.GridPanel({
        store: storeAllServicio,
        id:'gridServicio',
        sm: chkCol,        
        columns: [
            chkCol,
            {header:'Nombre del Servicio', dataIndex:'tx_nombre_servicio', width:750, sortable: true},
            {header:'co_servicio', dataIndex:'co_servicio', width:100, sortable:true, hidden: true, hideable:false}
         ],        
        columnLines: true,
        width:790,
        height:400,
        frame:true,
        title:'Listado de Servicios'
    });   
   
   function listaServicios(){
      var lServicio=[]
      chkCol.each(function(rec){
          lServicio.push(rec.get('co_servicio'));
      });
      return lServicio.join();
   }
   
   
   var frmProcesoServicio = new Ext.FormPanel({
       labelAlign: 'top',
       id: 'frmProcesoServicio',
       frame:true,
       url: 'cargarProcesoServicio.php',
       method: 'POST',
       bodyStyle:'padding:5px 5px 0',
       width: 799,
       //height : 430,
       items: [
       {
         xtype:'fieldset', //************datos del proyecto*************
         title: 'Servicio ofrecidos por cada Proceso',
         autoHeight:true,
         layout: 'form',
         items :[
         {
            layout: 'form',
            items: [
            {
              xtype: 'combo',
              id: 'cmbProceso',
              fieldLabel: 'Proceso',
              displayField: 'tx_nombre_proceso',
              valueField: 'co_proceso',
              emptyText:'Seleccione un Proceso...',
              allowBlank: false,
              typeAhead: true,
              forceSelection: true,
              selectOnFocus:true,
              triggerAction: 'all',
              anchor:'70%',
              mode: 'local',
              store : new Ext.data.JsonStore({
                url: 'datosSolicitados.php',
                autoLoad: true,
                root: 'datos',
                baseParams: { 
                  datos: 'proceso'
                },
                fields: [       
                  {name:'tx_nombre_proceso'},  
                  {name:'co_proceso'}  
                ]  
              }),
               listeners: {
                 'select': function(c,r,i){
                  chkCol.clearSelections(false);
                  storeProcesoServicio.load({params:{
                     datos:'listaProcesoServicio',
                     co_proceso: r.data.co_proceso
                     }});
                 }
               }
            }              
            ]        
         },       
         ]
       },
         gridProcesoServicio 
       ],
       buttons: [{
            xtype: 'button',
            text: 'Guardar',
            handler: function(){
              if (Ext.getCmp('frmProcesoServicio').getForm().isValid()) {
               if (chkCol.getCount()>0)
               {
                 var proceso=Ext.getCmp('cmbProceso').getValue();
                 var ls = listaServicios();
                 
                 Ext.getCmp('frmProcesoServicio').getForm().submit({
                 method: 'POST',
                 params:{ operacion:'CARGAR',proceso:proceso,listaServicio:ls}, //colocar los datos en formato json para enviarlo
                 waitTitle: 'Validando datos',
                 waitMsg: 'Enviando datos..',
                 success: function(form, action){
                     var data = Ext.util.JSON.decode(action.response.responseText);
                     Ext.Msg.alert('Confirmación', data.message.reason);
                     
                     Ext.getCmp('frmProcesoServicio').getForm().reset();
                     chkCol.clearSelections(false);
                     Ext.getCmp('cmbProceso').clearValue();
                     Ext.getCmp('cmbProceso').getStore().removeAll();
                     Ext.getCmp('cmbProceso').store.reload();

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
                 alert("No hay servicios seleccionados para este Proceso!");
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
            Ext.getCmp('frmProcesoServicio').getForm().reset();
            Ext.getCmp('cmbProceso').clearValue();
            Ext.getCmp('cmbProceso').getStore().removeAll();
            Ext.getCmp('cmbProceso').store.reload();                     
           }

        }]
   });
 
 
 
 //**********cargar de los servicios********
   var storeProcesoServicio = new Ext.data.JsonStore({
        url: 'datosSolicitados.php',
        root: 'datos',
        totalProperty: 'total',
        baseParams: {
              datos: 'listaProcesoServicio'
        },
        fields: [  
           {name:'co_proceso_servicio'},
           {name:'co_proceso'},
           {name:'co_servicio'}
        ]  
        });

    
   function marcarServicio(ls){
      var i=0;
      var listaServicio=[];
      chkCol.clearSelections(false);

      storeAllServicio.each(function(record) {
        for (var j=0;j<ls.length;j++) {
         if (record.data['co_servicio']  == ls[j])
                listaServicio.push(i);
         }
        i=i+1; 
      });
      chkCol.selectRows(listaServicio,true);
    } 
    
    
   storeProcesoServicio.on({
         'load':{
             fn: function(store, records, options){
                var lServicio=[];
                store.each(function(record){
                   lServicio.push(record.data['co_servicio']);
                });
                if (lServicio.length > 0){
                  marcarServicio(lServicio);
                }
                else{
                  alert("No hay servicios asociados a este Proceso!");
                  chkCol.clearSelections(false);
                }
             }//,
             //scope:this
         }
   });

 
 
  var winProcesoServicio = new Ext.Panel({  
      id: 'winProyectos',
      items: [
              frmProcesoServicio
             ]
  });
  
   winProcesoServicio.render(document.body);
   
});


