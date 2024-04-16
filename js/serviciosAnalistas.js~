Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath('Ext.ux', 'ext-4.0/ux');

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.selection.CheckboxModel'
]);

Ext.define('modelAnalistas', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'co_analista', type: 'integer'},
        {name: 'nombre_analista', type: 'string'},
    ]
});

Ext.apply(Ext.form.VTypes, {
   daterange : function(val, field) {
      var date = field.parseDate(val);

      if(!date){
          return;
      }
      if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
          var start = Ext.getCmp(field.startDateField);
          start.setMaxValue(date);
          start.validate();
          this.dateRangeMax = date;
      } 
      else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
          var end = Ext.getCmp(field.endDateField);
          end.setMinValue(date);
          end.validate();
          this.dateRangeMin = date;          
      }
      /*
       * Always return true since we're only using this vtype to set the
       * min/max allowed values (these are tested for after the vtype test)
       */
      return true;
   }
});


Ext.onReady(function() {
   var frmPeriodoBusqueda = new Ext.Panel({
       labelAlign: 'top',
       id: 'frmPeriodoBusqueda',
       //url: 'servicios_analistas_excel.php', //**********************
       //method: 'POST',       
       frame:true,
       bodyStyle:'padding:5px 5px 0',
       width: 700,
       //autoScroll : true,
       items: [
       {
        xtype:'fieldset', //**********************************
        title: 'Periodo a Consultar',
        //collapsible: true,
        autoHeight:true,
        items :[                
        {
            layout:'column',
            items:[
            {
                columnWidth:.40,
                layout: 'form',
                items: [
                {
                  xtype: 'datefield',
                  fieldLabel: 'Fecha Inicio',
                  name: 'startdt',
                  id: 'startdt',
                  vtype: 'daterange',
                  allowBlank: false,
                  //endDateField: 'enddt', // id of the end date field
                  value: new Date()
                }
                ] //********columna 1*******
            },
            {
                columnWidth:.40,
                layout: 'form',
                defaultType: 'datefield',
                items: [
                {
                  fieldLabel: 'Fecha Fin',
                  name: 'enddt',
                  id: 'enddt',
                  vtype: 'daterange',
                  maxValue: new Date(),
                  allowBlank: false,
                  startDateField: 'startdt', // id of the start date field
                  value: new Date()
                }
                ] //********columna 3********
            },
			{
			 id: 'lista_analista',
			 fieldLabel: 'ID Analistas',
			 xtype:'textfield',//<-- campo oculto (hidden)  
			 name:'lista_analista', //el nombre con que se envia al servidor  
			 value: '0',//el valor que contenda
			 style: 'text-align: right',
			 readOnly: true
			}            
            ]           
        }
       ]
      } 
      ],
       buttons: [{
            xtype: 'button',
            text: 'Buscar',
            handler: function(){              
				  var records=gridAnalistas.view.selModel.selected;
				  if (records.length != 0){
					 //Ext.Msg.alert('Buscar',records.length);
					 var val = '';
                     for (i=0;i<records.length;i++){
						if (i==0) 
                          val = '' + records.getAt(i).data.co_analista;
                        else
                          val = val + ',' + records.getAt(i).data.co_analista;  
                      } 
                      Ext.getCmp('lista_analista').setValue(val);
                      

					      var fechaIni= Ext.Date.format(Ext.getCmp('startdt').getValue(), "Y-m-d H:i:s");
					      var fechaFin= Ext.Date.format(Ext.getCmp('enddt').getValue(), "Y-m-d H:i:s");
					      var valLista = Ext.getCmp('lista_analista').getValue();
					      //var fechaIni= Ext.getCmp('startdt').getValue();
					      //var fechaFin= Ext.getCmp('enddt').getValue();
                          window.open("servicios_analistas_excel.php?valLista="+val+"&fechaIni='"+fechaIni+"'&fechaFin='"+fechaFin+"'"); 
                          
						  Ext.Msg.alert('Buscar','Datos Exportados');
						 Ext.getCmp('lista_analista').setValue('0');
						 Ext.getCmp('lista_analista').hide();
                     
                   } 
                  else
                     Ext.Msg.alert('Buscar','Debe seleccionar los analistas a consultar');  

            }
        }
        ]
    });

 
     var storeAnalistas = Ext.create('Ext.data.Store', {
        extend      : 'Ext.data.Store',
        model: 'modelAnalistas',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url : 'datosSolicitados.php',
            extraParams   : {'datos': 'lista_reporte_analistas'},
            reader: {
                type: 'json',
                root: 'data'
            }
        }
        
    });

    var sm = Ext.create('Ext.selection.CheckboxModel');
    var gridAnalistas = Ext.create('Ext.grid.Panel', {
        store: storeAnalistas,
        selModel: sm,
        columns: [
            {header:'Nomre y Apellido', dataIndex:'nombre_analista',width:350, sortable: true},
            {header:'co_analista', dataIndex:'co_analista', width:100, sortable:true, hidden: true, hideable:false} 
        ],
        columnLines: true,
        width: 690,
        height: 400,
        frame: true,
        title: 'Analista',
        iconCls: 'icon-grid',

    });
   
   var winAnalistas = new Ext.Panel({
           layout: 'fit',
           width: 700,
           height:550,
           bodyStyle:'padding:10px 5px 0',
           //autoScroll : true,
           items:[
            {
               xtype:'fieldset', //***************analistas*******************
               title: 'Listado de Analistas',
               //collapsible: true,
               autoHeight:true,
               items :[
                 gridAnalistas
               ]
            }
           ]
   });

 //*********fin grid*****************
  var winBuscarServicios = new Ext.Panel({  
      //layout: 'border',
      //height:800,
      //autoScroll : true,
      id: 'winBUscarServicios',
      items: [
              frmPeriodoBusqueda,
              winAnalistas
      ]
  });
  
   winBuscarServicios.render(document.body);
   Ext.getCmp('lista_analista').hide();   
});


