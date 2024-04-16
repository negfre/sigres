
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.form.field.Number',
    'Ext.form.field.Date',
    'Ext.tip.QuickTipManager',
    'Ext.ux.*'
]);

Ext.require('Ext.chart.*');
Ext.require('Ext.layout.container.Fit');


Ext.define('modelResumenIndicador', {
    extend: 'Ext.data.Model',
    //idProperty: 'co_indicador_gestion',
    fields: [
        {name: 'co_grupo_proyecto', type: 'int'},//projectId
        {name: 'tx_nombre_grupo_proyecto', type: 'string'}, //project
        {name: 'co_indicador_gestion', type: 'int'},//taskId
        {name: 'tx_nombre_indicador_gestion', type: 'string'},//description
        {name: 'totalservicios', type: 'integer'},//estimate
        {name: 'totalhh', type: 'float'}//rate
    ]
});

Ext.onReady(function(){
    
    Ext.tip.QuickTipManager.init();
    
    var storeIndicadores = Ext.create('Ext.data.Store', {
        extend      : 'Ext.data.Store',
        model: 'modelResumenIndicador',
        proxy: {
            type: 'ajax',
            url : 'datosSolicitados.php',
            extraParams   : {'datos': 'resumenIndicadorGestion'},
            reader: {
                type: 'json',
                //successProperty   : 'success',
                root: 'data'
            }
        },
        autoLoad: true,
        //data: data2,
        sorters: {property: 'co_grupo_proyecto', direction: 'ASC'}, //co_indicador_gestion
        groupField: 'tx_nombre_grupo_proyecto'
    });

    
    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1,
        listeners: {
            edit: function(){
                // refresh summaries
                grid.getView().refresh();
            }
        }
    });
    
    var showSummary = true;

    
    var grid = Ext.create('Ext.grid.Panel', {
        width: 550,
        height: 700,
        //frame: true,
        title: 'Indicadores de Gestión',
        iconCls: 'icon-grid',
        renderTo: document.body,
        store: storeIndicadores,
        plugins: [cellEditing],
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                tooltip: 'Muestra u oculta los totales',
                text: 'Mostar/Ocultar Totales',
                handler: function(){
                    var view = grid.getView();
                    showSummary = !showSummary;
                    view.getFeature('group').toggleSummaryRow(showSummary);
                    view.refresh();
                }
            },     
            {
				
				tooltip: 'Exportar datos a Excel',
                text: 'Exportar datos',
                handler: function(){
				   	
                   window.open("resumen_indicadores_excel.php$");
        	
                }
            }
            ]
        }],
        features: [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: true
        }],
        columns: [{
            text: 'Indicador de Gestión',
            flex: 1,
            //width: 500,
            //tdCls: 'task',
            sortable: true,
            dataIndex: 'tx_nombre_indicador_gestion',
            hideable: false,
            //summaryType: 'count'
            summaryRenderer: function(value, summaryData, dataIndex) {
                return 'Totales';
            }
        }, {
            header: 'Proyecto',
            width: 20,
            sortable: true,
            dataIndex: 'tx_nombre_grupo_proyecto'
        },  {
            header: 'Requerimientos',
            width: 85,
            sortable: true,
            align:'right',
            dataIndex: 'totalservicios',
            summaryType: 'sum',
            renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
                return Ext.util.Format.number(value);
            },
            summaryRenderer: function(value, summaryData, dataIndex) {
                return Ext.util.Format.number(value);//return value;
            },
            field: {
                xtype: 'numberfield',
                readOnly: true
            }
        }, {
            header: 'H/H',
            width: 75,
            sortable: true,
            align:'right',
            dataIndex: 'totalhh',
            summaryType: 'sum',
            renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
                return Ext.util.Format.number(value,"0.00");
            },
            summaryRenderer: function(value, summaryData, dataIndex) {
                return Ext.util.Format.number(value,"0.00");//return value;
            },
            field: {
                xtype: 'numberfield', type: 'float',
                readOnly: true
            }
        }]
    });
    
  
    storeIndicadores.load();
    


    
    
    
    

    
    
    
    
    
    
    
});

