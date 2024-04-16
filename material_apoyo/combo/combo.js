Ext.onReady(function() {
  var form = new Ext.form.FormPanel({
    aling: 'top',
    renderTo: Ext.getBody(),
    layout: 'form',
    items:[
      {
      layout:'column',
      items:[  
      ///
      {
        xtype: 'combo',
        id: 'cmbUnidadNegocio',
        fieldLabel: 'Unidad de Negocio',
        displayField: 'tx_nombre_unidad_negocio',
        valueField: 'co_unidad_negocio',
        triggerAction: 'all',
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
      },
      {
        xtype: 'combo',
        id: 'cmbGerencia',
        fieldLabel: 'Gerencia',
        displayField: 'tx_nombre_gerencia',
        valueField: 'co_gerencia',
        triggerAction: 'all',
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
      },
      {
        xtype: 'combo',
        id: 'cmbUsuario',
        fieldLabel: 'Usuario',
        displayField: 'tx_nombre',
        valueField: 'co_usuario',
        triggerAction: 'all',
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
      }
      ///
      ]
      }
    ]
  });
  form.show();
});