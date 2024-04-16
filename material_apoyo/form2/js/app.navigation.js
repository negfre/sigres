Ext.ns('app');
var loadTreeMask = null;
app.mn_Mantenimiento= {
id:'menu_mantenimiento',
xtype: 'treepanel',
title:'Mantenimiento',
		iconCls:'x-icon-menu-mantenimiento',
		rootVisible: false,
		lines: false,
		singleExpand: false,
		useArrows: true,
		autoScroll : true,
        isExpandTag : true,
		listeners: {
            'expand' : function (p){
                if (!this.isExpandTag){
                    this.getLoader().dataUrl = 'js/menu.js';  
                    this.getRootNode().reload();
                    this.setRootNode(new Ext.tree.AsyncTreeNode({ 
                        expanded    : true,
                        listeners   : {
                            'beforeload' : function (){
                                loadTreeMask = new Ext.LoadMask(Ext.getCmp('menu_mantenimiento').getEl(), {msg: 'Cargando...'});
                                loadTreeMask.show();
                            },
                            'load' : function ( ){
                                loadTreeMask.hide();
                            }
                        }
                    }));
                }
                this.isExpandTag = true;
                
            },
			click : {
				scope  : this,
				fn     : function( n, e ) {
                    if (!n.hasChildNodes()){
    					
    					if (n.attributes.url)
    					{
    						url = n.attributes.url;
    					}
    					else {
    						url = n.id+'/'+n.id+'.html';
    					}

    					app.tabpanel.addTab(n.id,'Mantenimiento '+n.text,url,n.attributes.tabType);
                    }else{
                        if (n.isExpanded()){
                            n.collapse();
                        }else{
                            n.expand();
                        }
                    }
				}
			}
	
		},
	loader: new Ext.tree.TreeLoader({
			dataUrl:'js/menu.js'
 }),root: new Ext.tree.AsyncTreeNode({
			expanded  :true
		})
	}


app.navigation = {
		iconCls:'logoIconUsp',
		title: 'Opciones',
		region: 'west',
		id:'navigation',
		split:true,
		width: 220,
		minSize: 175,
		maxSize: 400,
		margins:'0 0 3 3',
		collapsible: true,
		layout:'accordion',
		layoutConfig:{
			animate:false	
		},
	items: [app.mn_Mantenimiento]
	} 
