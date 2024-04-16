Ext.ns('com.quizzpot.tutorial');

com.quizzpot.tutorial.PagingTutorial = {
	init: function(){		

		var store = new Ext.data.JsonStore({
			url: 'paging.php',
			root: 'data',
			totalProperty: 'total',
			fields: ['city','visits','pageVisits','averageTime'],
			baseParams: {x:10,y:20}
		});
		store.load({params:{z:30,start:0,limit:5}});
		
		var pager = new Ext.PagingToolbar({
			store: store, // <--grid and PagingToolbar using same store
			displayInfo: true,
			displayMsg: '{0} - {1} of {2} Cities',
			emptyMsg: 'No cities to display',
			pageSize: 5
		});
	
		pager.on('beforechange',function(bar,params){
			params.z = 30;
		});
		
		var grid = new Ext.grid.GridPanel({
			store: store, // <--grid and PagingToolbar using same store
			columns: [
				new Ext.grid.RowNumberer(),
				{header:'City', dataIndex:'city',sortable: true},
				{header:'Visits', dataIndex:'visits',sortable: true},
				{header:'Page/Visits', dataIndex:'pageVisits',sortable: true},
				{header:'Average Time', dataIndex:'averageTime', width:150,sortable: true}
			],
			bbar: pager, // <--adding the pagingtoolbar to the grid
			border: false,
			stripeRows: true
		});
		
		var win = new Ext.Window({
			title: 'Grid example',
			layout: 'fit',
			width: 510,
			height:350,
			items: grid
		});

		win.show();
	}
}

Ext.onReady(com.quizzpot.tutorial.PagingTutorial.init,com.quizzpot.tutorial.PagingTutorial);