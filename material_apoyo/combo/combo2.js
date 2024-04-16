Ext.onReady(function() {
   var formu = new Ext.FormPanel({
        labelAlign: 'top',
        frame:true,
        title: 'SIG_CGR',
        bodyStyle:'padding:5px 5px 0',
        width: 800,
        items: [
       {
        xtype:'fieldset',
        title: 'Usuario',
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
                  xtype: 'combo',
                  id: 'cmbUnidadNegocio',
                  fieldLabel: 'Unidad de Negocio',
                  displayField: 'tx_nombre_unidad_negocio',
                  valueField: 'co_unidad_negocio',
                  triggerAction: 'all',
                  anchor:'95%',
                  mode: 'remote',
                  store : new Ext.data.JsonStore({
                    url: 'combo.php',
                    autoLoad: true,
                    root: 'datos',
                    baseParams: {
                      combo: 'un'
                    },
                    fields: [  
                      {name:'tx_nombre_unidad_negocio'},  
                      {name:'co_unidad_negocio'}  
                    ]  
                  }),
                  listeners: {
                    'select': function(c,r,i){
                      Ext.getCmp('cmbGerencia').clearValue();
                      Ext.getCmp('cmbUsuario').clearValue();
                      st = Ext.getCmp('cmbGerencia').getStore();
                      
                      st.load({
                        params:{
                          co_unidad_negocio: r.data.co_unidad_negocio
                        }
                      })
                    }
                  }
                }]
            },
            {
                columnWidth:.5,
                layout: 'form',
                items: [
                {
                  xtype: 'combo',
                  id: 'cmbGerencia',
                  fieldLabel: 'Gerencia',
                  displayField: 'tx_nombre_gerencia',
                  valueField: 'co_gerencia',
                  triggerAction: 'all',
                  anchor:'95%',
                  mode: 'local',
                  store : new Ext.data.JsonStore({
                    url: 'combo.php',
                    root: 'datos',
                    baseParams: {
                      combo: 'gerencia'
                    },
                    fields: [  
                      {name:'co_gerencia'},
                      {name:'tx_nombre_gerencia'}  
                    ]  
                  }),
                  listeners: {
                    'select': function(c,r,i){
                      Ext.getCmp('cmbUsuario').clearValue();
                      st = Ext.getCmp('cmbUsuario').getStore();
                      st.load({
                        params:{
                          co_gerencia: r.data.co_gerencia
                        }
                      })
                    }
                  }
                }]
            },
            {
                columnWidth:.25,
                layout: 'form',
                items: [
                {
                  xtype: 'combo',
                  id: 'cmbUsuario',
                  fieldLabel: 'Usuario',
                  displayField: 'tx_nombre',
                  valueField: 'co_usuario',
                  triggerAction: 'all',
                  anchor:'95%',
                  mode: 'local',
                  store : new Ext.data.JsonStore({
                    url: 'combo.php',
                    root: 'datos',
                    baseParams: {
                      combo: 'usuario'
                    },
                    fields: [  
                      {name:'co_usuario'},
                      {name:'tx_nombre'}  
                    ]  
                  })
                }]
            }
            ]
        }]
       },
       {
          xtype:'fieldset',
          title: 'Requerimiento',
          collapsible: true,
          autoHeight:true,

          items :[ 
        {
            xtype:'htmleditor',
            id:'bio',
            fieldLabel:'Biography',
            height:200,
            anchor:'98%'
        }
        ]
       }],

        buttons: [{
            text: 'Save'
        },{
            text: 'Cancel'
        }]
    });
 formu.render(document.body);
});