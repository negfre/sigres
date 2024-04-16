// Documento JavaScript 
Ext.BLANK_IMAGE_URL = 'images/default/s.gif';
Ext.ns('app');

// Inicializa la aplicación
Ext.onReady(function() {

    Ext.QuickTips.init();

    //Cargando
    setTimeout(function(){
		Ext.get('loading').remove();
        Ext.get('loading-mask').fadeOut({remove:true});
    }, 250);

	//Generamos el viewport
	var viewport = new Ext.Viewport({
		layout:'border',
		defaults: {
		    split: false
		},
		items: [
			{
				xtype: 'box',
				region: 'north',
				applyTo: 'header',
				height:30
			}
			,app.navigation,app.tabpanel
		],
        listeners   : {
            'afterrender'   : function (compontente){
                (function(){
                }).defer(6000);
            }
        }
    });
});