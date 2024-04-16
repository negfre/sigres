Ext.onReady(function() {   
    var structure = ['India', 'USA', 'China', 'Aus', 'UK'],
    struct = ['', 'fas'],   
    nestHdr = ['Number', '%'],   
    fields = [],
    columns = [],
   
    continentGroupRow = [],
    cityGroupRow = [];

     var myData = [
        [0, 232, 342678,  267834,  23664, 3, 5,6],
        [0, 2322, 342223,  239874,  2334, 3, 5,6],
        [0, 23422, 323142,  278934,  23434, 3, 5,6],
        [0, 2323562, 342,  234569,  24534, 3, 5,6]
    ];

    var sm = new Ext.grid.RowNumberer();

   for(j=0;j<4;j++)
    {
        struct.push(structure[j]);
    }
    struct.push('totsdfasal');
  
    function generateConfig()
    {
        var i=-1;   

        columns.push(sm); // pushing row numberer
       
        Ext.iterate(struct, function(topHdr)
        {
            i=i+1;           
                   
            if(i==0)
            {
                // adding empty header for rownumberer
                cityGroupRow.push({
                    header: '',
                    colspan: 1,
                    align: 'center'
                });
            }
            else if((i>0 && i<2) || i==(struct.length-1)) // condition for adding office and total
            {       
               
                cityGroupRow.push({
                    header: '',
                    colspan: 1,
                    align: 'center'
                });
               
                fields.push({
                    type: 'int',
                    name: topHdr + i
                });
           
                columns.push({
                    dataIndex: topHdr + i,
                    header: topHdr,
                    renderer: Ext.util.Format.usMoney
                });
               
            }
            else
            {
               
                Ext.each(topHdr, function(eachHdr)
                {                   
                    numProducts = nestHdr.length;                                   
                    cityGroupRow.push({
                    header: eachHdr,
                    colspan: numProducts,
                    align: 'center'
                    });
               
                    Ext.each(nestHdr, function(eachNestHdr){
                        fields.push({
                            type: 'int',
                            name: eachHdr + i
                        });
                       
                        columns.push({
                            dataIndex: eachHdr + i,
                            header: eachNestHdr,
                            renderer: Ext.util.Format.usMoney
                        });
                    });                 
                });
            }
        });
    }
   
    generateConfig();
   
       

    var group = new Ext.ux.grid.ColumnHeaderGroup({
        rows: [cityGroupRow]
    });
   
 
    var grid = new Ext.grid.GridPanel({
        renderTo: 'resultDiv',
        title: 'Sales By Location',
        width: 1000,
        height: 400,
        store: new Ext.data.ArrayStore({
            fields: fields,
            data: myData
        }),
        cm: new Ext.grid.ColumnModel({               
            columns: columns
        }),
     
        viewConfig: {
            forceFit: true
        },
        plugins: group
    });
});