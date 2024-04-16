/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function() {
    var structure = {
        Indicadores: [[0,''],[1,'Carga de datos'], [2,'Actualización X'],[3,'Documentos  Rasterizados'], [4,'BD Actualizadas'], [5,'Datos Migrados']]
    },
    items = ['Nro Req', 'H/H'],
    
    fields = [],
    columns = [],
    data = [],
    proyectos = ['Proyecto1 grannnnnnnnnnnnnnnnn proy','Proyecto2','Proyecto3','Proyecto4','Proyecto5','Proyecto6','Proyecto7','Proyecto8'],

    indicadorGroupRow = [];
    
        
    /*
     * Example method that generates:
     * 1) The column configuration for the grid
     * 2) The column grouping configuration
     * 3) The data for the store
     * 4) The fields for the store
     */
    function generateConfig(){
        var arr,
            numItems = items.length;
            
        Ext.iterate(structure, function(struct, indicadores){
             ip = 0;
            Ext.each(indicadores, function(indicador){
                
                if (indicador[1] != '')
                {
                      indicadorGroupRow.push({
                          header: indicador[1],
                          colspan: numItems,
                          align: 'center'
                      });
                   Ext.each(items, function(item){                      
                    fields.push({
                         type: 'int',
                         name: indicador[1] + item
                    });
                     
                    columns.push({
                         dataIndex: indicador[1] + item,
                         header: item,
                         align: 'Center',
                         editor: new Ext.form.NumberField({
                               allowBlank: false
                         })
                    });
                    
                  });                    
                }  
               else
               {
                   indicadorGroupRow.push({
                    header: indicador[1],
                    colspan: 1,
                    align: 'center'
                   });                

                    fields.push({
                        type: 'string',
                        name: indicador[1] + "Proyecto"
                    });   

                    columns.push({
                        dataIndex: indicador[1] + "Proyecto",
                        header: "Proyecto",
                        align: 'Center',
                        width: 300,
                        editor: new Ext.form.TextField({
                              allowBlank: false
                        })
                    });                           
                }     


                   


                arr = [];
                  arr.push(proyectos[ip]);
                  ip++;
                    
                 for(var i = 0; i < 10; ++i){
                      arr.push(0); }

                data.push(arr);
                   
            });
        })
    }
    
    // Run method to generate columns, fields, row grouping
    generateConfig();
     ///console.log(indicadorGroupRow);
     //console.log(columns);
    
    /*
     * continentGroupRow at this point is:
     * [
     *     {header: 'Asia', colspan: 4, align: 'center'},
     *     {header: 'Europe', colspan: 6, align: 'center'}
     * ]
     * 
     * indicadorGroupRow at this point is:
     * [
     *     {header: 'Beijing', colspan: 2, align: 'center'},
     *     {header: 'Tokyo', colspan: 2, align: 'center'},
     *     {header: 'Berlin', colspan: 2, align: 'center'},
     *     {header: 'London', colspan: 2, align: 'center'},
     *     {header: 'Paris', colspan: 2, align: 'center'}
     * ]
     */
    var group = new Ext.ux.grid.ColumnHeaderGroup({
        rows: [ indicadorGroupRow]
    });
    
    /*
     * fields at this point is:
     * [
     *     {type: 'int', name: 'BeijingProductX'},
     *     {type: 'int', name: 'BeijingProductY'},
     *     {type: 'int', name: 'TokyoProductX'},
     *     {type: 'int', name: 'TokyoProductY'},
     *     {type: 'int', name: 'BerlinProductX'},
     *     {type: 'int', name: 'BerlinProductY'},
     *     {type: 'int', name: 'LondonProductX'},
     *     {type: 'int', name: 'LondonProductY'},
     *     {type: 'int', name: 'ParisProductX'},
     *     {type: 'int', name: 'ParisProductY'}
     * ]
     * 
     * columns at this point is:
     * [
     *     {dataIndex: 'BeijingProductX', header: 'ProductX'},
     *     {dataIndex: 'BeijingProductY', header: 'ProductY'},
     *     {dataIndex: 'TokyoProductX', header: 'ProductX'},
     *     {dataIndex: 'TokyoProductY', header: 'ProductY'},
     *     {dataIndex: 'BerlinProductX', header: 'ProductX'},
     *     {dataIndex: 'BerlinProductY', header: 'ProductY'},
     *     {dataIndex: 'LondonProductX', header: 'ProductX'},
     *     {dataIndex: 'LondonProductY', header: 'ProductY'},
     *     {dataIndex: 'ParisProductX', header: 'ProductX'},
     *     {dataIndex: 'ParisProductY', header: 'ProductY'}
     * ]
     */
    var grid = new Ext.grid.EditorGridPanel({
        renderTo: 'column-group-grid',
        title: 'Plan Anual de Servicios y Horas Hombre',
        width: 1000,
        height: 400,
        store: new Ext.data.ArrayStore({
            fields: fields,
            data: data
        }),
        columns: columns,
        viewConfig: {
            forceFit: true
        },
        plugins: group
    });
    
    
});