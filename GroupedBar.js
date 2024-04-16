Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox']);

Ext.define('modelResumenIndicador', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'indicador', type: 'string'},
        {name: 'servicios', type: 'integer'},
        {name: 'hh', type: 'float'}
    ]
});

Ext.define('Ext.chart.theme.Blue', {
	extend: 'Ext.chart.theme.Base',
	baseColor: '#010101',
	colors: ['#FF0000', '#0066CC', '#003366'],
	constructor: function(config) {
	this.callParent([Ext.apply({
		axis: {
		fill: this.baseColor,
		stroke: this.baseColor
		},
		axisLabelLeft: {
			fill: this.baseColor
		},
		axisLabelBottom: {
			fill: this.baseColor
		},
		axisTitleLeft: {
			fill: this.baseColor
		},
		axisTitleBottom: {
			fill: this.baseColor
		},
		colors: this.colors
		}, config)]);
	}
});


Ext.onReady(function () {

       
        
    var storeIndicadores = Ext.create('Ext.data.Store', {
        extend      : 'Ext.data.Store',
        model: 'modelResumenIndicador',
        proxy: {
            type: 'ajax',
            url : 'datosSolicitados.php',
            extraParams   : {'datos': 'resumenIndicadores'},
            reader: {
                type: 'json',
                root: 'data'
            }
        },
        autoLoad: true
    });


	var groupedBarChart = Ext.create('Ext.chart.Chart', {
	animate: true,
	shadow: true,
	id: 'chartCmp',
	theme: 'Blue',
	store: storeIndicadores,
	renderTo: Ext.getBody(),
	style: 'background:#fff',
	axes: [{
		type: 'Category',
		position: 'left',
		fields: ['indicador'],
		title: 'Indicador'
		}, {
		type: 'Numeric',
		position: 'bottom',
		fields: ['servicios','hh'],
		title: 'Resumen de Indicadores de Gestión',
		grid: true,
        label: {renderer: Ext.util.Format.numberRenderer('0,00')},		
		minimum: 0
		}],
	series: [{
		type: 'bar',
		axis: 'bottom',
		highlight: true,
		tips: {
			trackMouse: true,
			width: 140,
			height: 28,
			renderer: function(storeItem, item) {
			   this.setTitle(String(item.value[1]));
			}
		},

		xField: 'indicador',
		yField: ['servicios','hh']
		}],
	legend: {
		position: 'right'
		}
	});

	var win = Ext.create('Ext.window.Window', {
		title: 'Indicadores de Gestión',
		width:700,
		height:500,
		layout:'fit',
        hidden: false,
        maximizable: false,
		tbar: [{
				text: 'Guardar Gráfico',
				handler: function() {
					Ext.MessageBox.confirm('Confirmar Descarga', '¿Desea guardar el gráfico como una imagen?', function(choice){
						if(choice == 'yes'){
							groupedBarChart.save({
								type: 'image/png'
							});
						}
					});
				}
			}, {
				text: 'Recargar Datos',
				handler: function() {
					store.load();
				}
			}],        
		items: [groupedBarChart]
		});
	
     win.show()
});
