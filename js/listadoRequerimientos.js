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
                ] 
            }            
            ]           
        }
       ]
      } 
      ],
       buttons: [{
            xtype: 'button',
            text: 'Exportar',
            handler: function(){              
                var fechaIni= Ext.Date.format(Ext.getCmp('startdt').getValue(), "Y-m-d H:i:s");
                var fechaFin= Ext.Date.format(Ext.getCmp('enddt').getValue(), "Y-m-d H:i:s");
                window.open ("resumen_indicadores_excel_v3_250324MOD.php?fechaIni="+fechaIni+"&fechaFin="+fechaFin+"");/*("resumen_indicadores_excel_v2_14072017MOD.php");("resumen_indicadores_excel_v2_14072017MOD.php?fechaIni='"+fechaIni+"'&fechaFin='"+fechaFin+"'")*/ 


                /*("servicios_analistas_excel.php?valLista="val++"&fechaIni='"+fechaIni+"'&fechaFin='"+fechaFin+"'")*/
            }
        }
        ]
    });

 


 //*********fin grid*****************
  var winBuscarRequerimientos = new Ext.Panel({  
      //layout: 'border',
      //height:800,
      //autoScroll : true,
      id: 'winBuscarRequerimientos',
      items: [
              frmPeriodoBusqueda
      ]
  });
 
   winBuscarRequerimientos.render(document.body);

});


