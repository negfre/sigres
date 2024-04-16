/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.form.field.Number',
    'Ext.form.field.Date',
    'Ext.tip.QuickTipManager'
]);

Ext.define('Task', {
    extend: 'Ext.data.Model',
    idProperty: 'taskId',
    fields: [
        {name: 'projectId', type: 'int'},
        {name: 'project', type: 'string'},
        {name: 'taskId', type: 'int'},
        {name: 'description', type: 'string'},
        {name: 'estimate', type: 'integer'},
        {name: 'rate', type: 'float'},
        //{name: 'cost', type: 'float'},
        //{name: 'due', type: 'date', dateFormat:'m/d/Y'}
    ]
});

var data2 = [
    {taskId:11,description:"CONOCIMIENTO EXPLORATORIO INTERNACIONAL",projectId:12,project:"SOPORTE DE APLICACIONES",estimate:1,rate:12.00},
    {taskId:10,description:"CVP",projectId:4,project:"DATOS CARGADOS, ACTUALIZADOS, REINGRESADOS",estimate:1,rate:0.02},
    {taskId:10,description:"CVP",projectId:5,project:"DATOS CERTIFICADOS",estimate:1,rate:0.50},
    {taskId:2,description:"EXPLORATORIOS Y DE DELINEACIÓN",projectId:2,project:"B.D. INICIALIZADA Y/O ACTUALIZADA",estimate:1,rate:0.50},
    {taskId:2,description:"EXPLORATORIOS Y DE DELINEACIÓN",projectId:4,project:"DATOS CARGADOS, ACTUALIZADOS, REINGRESADOS",estimate:2,rate:1.50},
    {taskId:2,description:"EXPLORATORIOS Y DE DELINEACIÓN",projectId:12,project:"SOPORTE DE APLICACIONES",estimate:1,rate:3.339},
    {taskId:7,description:"GAS",projectId:4,project:"DATOS CARGADOS, ACTUALIZADOS, REINGRESADOS",estimate:6,rate:3.68},
    {taskId:3,description:"GEOFÍSICA Y GEODESIA",projectId:4,project:"DATOS CARGADOS, ACTUALIZADOS, REINGRESADOS",estimate:2,rate:22.20},
    {taskId:3,description:"GEOFÍSICA Y GEODESIA",projectId:5,project:"DATOS CERTIFICADOS",estimate:1,rate:5.00},
    {taskId:3,description:"GEOFÍSICA Y GEODESIA",projectId:6,project:"REQUERIMIENTOS SOLICITADOS",estimate:4,rate:27.70},
    {taskId:6,description:"PRODUCCIÓN",projectId:4,project:"DATOS CARGADOS, ACTUALIZADOS, REINGRESADOS",estimate:2,rate:7.08},
    {taskId:6,description:"PRODUCCIÓN",projectId:12,project:"SOPORTE DE APLICACIONES",estimate:2,rate:1.67}
];

var data = [
    {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 112, description: 'Integrate 2.0 Forms with 2.0 Layouts', estimate: 6, rate: 150, due:'06/24/2007'},
    {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 113, description: 'Implement AnchorLayout', estimate: 4, rate: 150, due:'06/25/2007'},
    {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 114, description: 'Add support for multiple types of anchors', estimate: 4, rate: 150, due:'06/27/2007'},
    {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 115, description: 'Testing and debugging', estimate: 8, rate: 0, due:'06/29/2007'},
    {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 101, description: 'Add required rendering "hooks" to GridView', estimate: 6, rate: 100, due:'07/01/2007'},
    {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 102, description: 'Extend GridView and override rendering functions', estimate: 6, rate: 100, due:'07/03/2007'},
    {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 103, description: 'Extend Store with grouping functionality', estimate: 4, rate: 100, due:'07/04/2007'},
    {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 121, description: 'Default CSS Styling', estimate: 2, rate: 100, due:'07/05/2007'},
    {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 104, description: 'Testing and debugging', estimate: 6, rate: 100, due:'07/06/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 105, description: 'Ext Grid plugin integration', estimate: 4, rate: 125, due:'07/01/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 106, description: 'Summary creation during rendering phase', estimate: 4, rate: 125, due:'07/02/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 107, description: 'Dynamic summary updates in editor grids', estimate: 6, rate: 125, due:'07/05/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 108, description: 'Remote summary integration', estimate: 4, rate: 125, due:'07/05/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 109, description: 'Summary renderers and calculators', estimate: 4, rate: 125, due:'07/06/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 110, description: 'Integrate summaries with GroupingView', estimate: 10, rate: 125, due:'07/11/2007'},
    {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 111, description: 'Testing and debugging', estimate: 8, rate: 125, due:'07/15/2007'}
];

Ext.onReady(function(){
    
    Ext.tip.QuickTipManager.init();
    
    var store = Ext.create('Ext.data.Store', {
        model: 'Task',
        data: data2,
        sorters: {property: 'taskId', direction: 'ASC'},
        groupField: 'project'
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
        frame: true,
        title: 'Indicadores de Gestión',
        iconCls: 'icon-grid',
        renderTo: document.body,
        store: store,
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
            }]
        }],
        features: [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
        columns: [{
            text: 'Servicio',
            flex: 1,
            //width: 500,
            tdCls: 'task',
            sortable: true,
            dataIndex: 'description',
            hideable: false,
            //summaryType: 'count'
            summaryRenderer: function(value, summaryData, dataIndex) {
                return 'Totales';
            }
        }, {
            header: 'Project',
            width: 20,
            sortable: true,
            dataIndex: 'project'
        },  {
            header: 'Requerimientos',
            width: 85,
            sortable: true,
            align:'right',
            dataIndex: 'estimate',
            summaryType: 'sum',
            renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
                return Ext.util.Format.number(value);
            },
            summaryRenderer: function(value, summaryData, dataIndex) {
                return Ext.util.Format.number(value);//return value;
            },
            field: {
                xtype: 'numberfield'
            }
        }, {
            header: 'H/H',
            width: 75,
            sortable: true,
            align:'right',
            dataIndex: 'rate',
            summaryType: 'sum',
            renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
                return Ext.util.Format.number(value,"0.00");
            },
            summaryRenderer: function(value, summaryData, dataIndex) {
                return Ext.util.Format.number(value,"0.00");//return value;
            },
            //summaryType: 'average',
            field: {
                xtype: 'numberfield', type: 'float'
            }
        }]
    });
});

