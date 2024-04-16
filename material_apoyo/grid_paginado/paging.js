Ext.ns('com.quizzpot.tutorial');

com.quizzpot.tutorial.PagingTutorial = {
	init: function(){		

		var store = new Ext.data.JsonStore({
			url: 'paging.php',
			root: 'data',
			totalProperty: 'total',
			fields: ['co_requerimiento','co_analista','co_proyecto','co_usuario'],//fields: ['city','visits','pageVisits','averageTime'],//
			baseParams: {x:10,y:20}
		});
		store.load({params:{z:30,start:0,limit:5}});
		
		var pager = new Ext.PagingToolbar({
			store: store, // <--grid and PagingToolbar using same store
			displayInfo: true,
			displayMsg: '{0} - {1} of {2} Requerimientos',
			emptyMsg: 'No hay requerimientos para mostrar',
			pageSize: 20
		});
	
		pager.on('beforechange',function(bar,params){
			params.z = 30;
		});
		
		var gridRequerimientos = new Ext.grid.GridPanel({
			store: store, // <--grid and PagingToolbar using same store
			columns: [
				new Ext.grid.RowNumberer(),
				{header:'Req. Nro.', dataIndex:'co_requerimiento',sortable: true},
				{header:'Analista', dataIndex:'co_analista',sortable: true},
				{header:'Proyecto', dataIndex:'co_proyecto',sortable: true},
				{header:'Usuario', dataIndex:'co_usuario', width:150,sortable: true}
			],
			bbar: pager, // <--adding the pagingtoolbar to the grid
			border: false,
			stripeRows: true
		});
		
		var win = new Ext.Window({
			title: 'Requerimientos registrados',
			layout: 'fit',
			width: 510,
			height:350,
			items: gridRequerimientos
		});

		win.show();
	}
}

Ext.onReady(com.quizzpot.tutorial.PagingTutorial.init,com.quizzpot.tutorial.PagingTutorial);