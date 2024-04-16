/*
 * Ext 2.0 
 * Ejemplo de combos dependientes
 * leyendo de base de datos con
 * php, usando json 
 * Creado por: Diego Fernando Arce
 * Basado en: http://extjs.com/forum/showthread.php?t=33529&highlight=load+form+with+tab
 */



//////////////////////////////////////////////////
//Definicion para el almacen de los paises
var record_pais = new Ext.data.Record.create([
	{name: 'codi_pais'},
	{name: 'nomb_pais'}
]);

var reader_pais = new Ext.data.JsonReader({
		root: 'resultado'
	},
	record_pais
);
	
var proxy_pais = new Ext.data.HttpProxy({
	 method: 'GET'
	,url: 'combo_depen.php?proce=pais'
});
	
var alma_pais  = new Ext.data.Store({
	 autoLoad: true
	,pruneModifiedRecords: true
	,proxy: proxy_pais
	,reader: reader_pais
});
//////////////////////////////////////////////////



//////////////////////////////////////////////////
//Definicion para el almacen de los departamentos
var record_dpto = new Ext.data.Record.create([
	{name: 'cons_pais'},
	{name: 'codi_dpto'},
	{name: 'nomb_dpto'}
]);

var reader_dpto = new Ext.data.JsonReader({
		root: 'resultado'
	},
	record_dpto
);
	
var proxy_dpto = new Ext.data.HttpProxy({
	 method: 'GET'
	,url: 'combo_depen.php'
});
	
var alma_dpto  = new Ext.data.Store({
	 autoLoad: true
	,pruneModifiedRecords: true
	,proxy: proxy_dpto
	,reader: reader_dpto
});
//////////////////////////////////////////////////



//////////////////////////////////////////////////
//Definicion para el almacen de las ciudades
var record_ciud = new Ext.data.Record.create([
	{name: 'cons_dpto'},
	{name: 'codi_ciud'},
	{name: 'nomb_ciud'}
]);

var reader_ciud = new Ext.data.JsonReader({
		root: 'resultado'
	},
	record_ciud
);
	
var proxy_ciud = new Ext.data.HttpProxy({
	 method: 'GET'
	,url: 'combo_depen.php'
});
	
var alma_ciud  = new Ext.data.Store({
	 autoLoad: true
	,pruneModifiedRecords: true
	,proxy: proxy_ciud
	,reader: reader_ciud
});
//////////////////////////////////////////////////




//////////////////////////////////////////////////
//Definicion del la lista de seleccion para los paises
var dato_pais_combo = new Ext.form.ComboBox({ 
	id: 'dato_pais',
	name: 'dato_pais',
	fieldLabel: 'Pais',
	store: alma_pais,
	displayField: 'nomb_pais',
	valueField: 'codi_pais',
	mode: 'local',
	width: 110,
	editable: false,
	emptyText: 'Seleccione un pais...',
	triggerAction: 'all',
	listeners: {
		'select' : function(cmb, rec, idx) {
			cons_pais=cmb.getValue();
			codi_pais=Ext.getCmp('dato_pais').getValue();
			region = Ext.getCmp('dato_dpto');
			region.clearValue();
			region.store.load({
				params: {
					'proce':'dpto'
					,'cons_pais':Ext.getCmp('dato_pais').getValue()
					,'cons_dpto':cons_pais
					,'cons_ciud':codi_pais
				}
			});
			region.enable();
			city = Ext.getCmp('dato_ciud');
			city.clearValue();
			city.store.removeAll();
			city.disable();
		}
	}
});
//////////////////////////////////////////////////
	



//////////////////////////////////////////////////
//Definicion del la lista de seleccion para los departamentos
var dato_dpto_combo = new Ext.form.ComboBox({ 
	id: 'dato_dpto',
	name: 'dato_dpto',
	fieldLabel: 'Dpto',
	store: alma_dpto,
	displayField: 'nomb_dpto',
	valueField: 'codi_dpto',
	mode: 'local',
	width: 110,
	editable: false,
	emptyText: 'Seleccione un departamento...',
	triggerAction: 'all',
	disabled: true,
	listeners: {
		'select': function(cmb, data, idx) {
			city = Ext.getCmp('dato_ciud');
			city.clearValue();
			city.store.load({
				params: { 
					'proce':'ciud',
					'cons_pais': Ext.getCmp('dato_pais').getValue(),
					'cons_dpto': Ext.getCmp('dato_dpto').getValue() 
				}
			});
			city.enable();
		}
	}
});
//////////////////////////////////////////////////
	



//////////////////////////////////////////////////
//Definicion del la lista de seleccion para las ciudades
var dato_ciud_combo = new Ext.form.ComboBox({ 
	id: 'dato_ciud',
	name: 'dato_ciud',
	fieldLabel: 'Ciud',
	store: alma_ciud,
	displayField: 'nomb_ciud',
	mode: 'local',
	width: 110,
	editable: false,
	emptyText: 'Seleccione una ciudad...',
	triggerAction: 'all',
	disabled: true
});
//////////////////////////////////////////////////
	



//////////////////////////////////////////////////
Ext.onReady(function(){
	var panel_princ = new Ext.FormPanel({
		id: 'gd_panel',
		width: 250,
		labelWidth: 40,
		defaults:{width:180},
		items:[
			dato_pais_combo,
			dato_dpto_combo,
			dato_ciud_combo
		]
	});
	panel_princ.render(document.getElementById('principal'));
})
//////////////////////////////////////////////////
