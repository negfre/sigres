
Ext.onReady(function(){	//Es una función que se usa para inicializar los componentes justo cuando el DOM ya ha sido cargado.

		Ext.BLANK_IMAGE_URL = 'images/s.gif';		//Propiedad que guarda la ubicacion de la imagen "Base" para renderizar los componente de la UI
		Ext.QuickTips.init()						//Inicializa los "quicktips" de algunos componentes como GridPanel, ComboBox, Toolbar, entre otros.
		
		var insert_id=""	//variable  que utilizaremos mas adelante	
		var tempo="";		//variable  que utilizaremos mas adelante
		
		var ds_model = Ext.data.Record.create([		//Creamos el contenedor de datos de nuestro grid
			'id',
			'cargo',
			'estado',
			'sueldo'
		]);
		
	    var storeManteCargo = new Ext.data.Store({	// Construimos nuestra fuente de datos la cual se comunicara con nuestra Base de Datos
		  proxy: new Ext.data.HttpProxy({
					url: 'manteCargo.php', 			// Archivo con el cual abriremos la conexion
					method: 'POST'					// Metodo POST ó GET
				}),
		  baseParams:{task: "LISTAR"},				// Parametro que utilizamos para listar los datos (Ver manteCargo.php)
		  reader: new Ext.data.JsonReader({			// Sirve para cargar los datos y respuestas del servidor
			root: 'results',						//	Resultado de la busqueda (viene con cada echo que devuelve el archivo PHP)
			totalProperty: 'total',					//	Total de filas de la busqueda (viene con cada echo que devuelve el archivo PHP)
			id:'id'									// Identificador
		  },[ 										// Filas
			{name: 'id', type: 'integer', mapping: 'id'},	
			{name: 'cargo', type: 'string', mapping: 'cargo'},
			{name: 'estado', type: 'string', mapping: 'estado'},
			{name: 'sueldo', type: 'float', mapping: 'sueldo'}
		  ]),
		  sortInfo:{field: 'cargo', direction: "ASC"}	//Ordena por defecto la fila Cargo -- ASC ascendentemente ó DESC descendentemente
		});
		
		storeManteCargo.load({params:{start: 0, limit: 100}});	//carga las 100 primeras filas del listado

		var ss_estado = new Ext.data.SimpleStore({		// Construimos nuestra fuente de datos para nuestro combobox
		    fields: ['id', 'estado'],					
	        data : [['A','Activo'],['I','Inactivo']]	
	    });
		
		function fn_cambiar_estado(val){				// Funcion para cargar el estado correcto cada ves que se listan los datos en el grid
			return ss_estado.queryBy(function(rec){
				return rec.data.id == val;
			}).itemAt(0).data.estado;
		}
		/*-------------------Componentes que cargaran en cada fila del grid--------------------*/
		
		var tf_cargo = new Ext.form.TextField({
			allowBlank: false,
			maxLength: 45,
			blankText:'Nombre invalido de Cargo.'
		});
		
		var cb_estado = new Ext.form.ComboBox({
			typeAhead: true,
			triggerAction: 'all',
			mode: 'local',
			store: ss_estado,
			displayField:'estado',
			valueField: 'id'
		});
				
		var nf_sueldo= new Ext.form.NumberField ({
			allowBlank: false,
			maxLength: 6
		});
	
		/*-------------------------------------------------------------------------------------*/
		
	    var gridManteCargo = new Ext.grid.EditorGridPanel({
			enableColumnMove: false,			// habilitar movimiento de columnas (false= inhabilitar)
	        store			: storeManteCargo,	// Fuente de datos
			stripeRows		:true,				// Mostrar una fila blanca y otra ploma
			clicksToEdit	: 2,			// Clics para editar
			loadMask 		: true,			// Mostrar el texto 'Cargando...' al momento de cargar los datos al grid
	        columns: [	
					new Ext.grid.RowNumberer(),	// Muestra en la primera columna los numeros de las filas
					{
						header: "Cargo", 
						dataIndex: 'cargo', 	// nombre del campo de la base de datos
						editor: tf_cargo,		// llama al componente tipo TextField Creado para que podamos editar el campo
						sortable: true			// Ordenable
					},
					{
						header: "Estado", 
						dataIndex: 'estado', 
						renderer: fn_cambiar_estado,
						editor: cb_estado,			// llama al componente tipo ComboBox Creado para que podamos editar el campo
						sortable: true
					},
					{
						header: "Sueldo", 
						dataIndex: 'sueldo',
						align: 'right',
						editor: nf_sueldo,			// llama al componente tipo NumberField Creado para que podamos editar el campo
						sortable: true
					}
				     ],
			sm: new Ext.grid.RowSelectionModel({	// Permite que al momento de selecciona un campo, se seleccione toda la fila
				singleSelect: true
			}),
			viewConfig: {							// Permite que las filas del grid esten ajustadas ancho de este
                                forceFit:true,
                                enableRowBody:true,
                                showPreview:true
                            },
			listeners: {
				afteredit: function(e){	
					if(!isNaN(e.record.id))
						tempo = e.record.id
					else
						tempo = insert_id
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'manteCargo.php',
						params: {	
							task: 'ACTUALIZAR',
							id: tempo,							
							field: e.field,
							value: e.value
						},
						success: function(resp,opt) {
							e.record.commit();			
					
						},
						failure: function(resp,opt) {
							e.reject();				 
						}
					});
				}
			},
			bbar: new Ext.PagingToolbar({		//ToolBar Inferior
				pageSize: 100,
				store: storeManteCargo,
				displayInfo: true,
				displayMsg: '{0} - {1} de {2} Cargo',
				emptyMsg: "No hay Cargo Registrado"
			}),
			tbar: [{							//Toolbar Superior
				text: 'Nuevo',
				iconCls: 'x-icon-nuevo',
				handler: function() {
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'manteCargo.php',
						params: {
							task: 'GRABAR',
							cargo:'Cargo',
							estado:'A',
							sueldo:'0.0'
						},
						success: function(resp,opt) {
							insert_id = Ext.util.JSON.decode(resp.responseText).insert_id;
							gridManteCargo.getStore().insert(0, new ds_model({id:insert_id,cargo:'Cargo',estado:'A',sueldo:'0.0' }));							
							gridManteCargo.startEditing(0,0);
							gridManteCargo.getSelectionModel().selectRow(0);
						},
						failure: function(resp,opt) {
							Ext.Msg.alert('Error','No se puede agregar el Cargo');
						}
					});
				}
			},'-',{
				text: 'Eliminar',
				iconCls: 'x-icon-eliminar',	
				handler: function() {
					var sm = gridManteCargo.getSelectionModel();
					var sel = sm.getSelected();
					if (sm.hasSelection()){
						Ext.Msg.show({
							title: 'Eiminiar', 
							buttons: Ext.MessageBox.YESNO,
							msg: '¿Desea eliminar al '+sel.data.cargo+'?',
							fn: function(btn){
								if (btn == 'yes'){
									var conn = new Ext.data.Connection();
									conn.request({
										url: 'manteCargo.php',
										params: {
											task: 'ELIMINAR',
											id: sel.data.id
										},
										success: function(resp,opt) { 
											gridManteCargo.getStore().remove(sel); // Remueve el dato seleccionado
											storeManteCargo.reload();			// Vuelve a cargar la fuente de datos
											gridManteCargo.getSelectionModel().selectRow(0); // Selecciona la primera fila del grid
										},
										failure: function(resp,opt) { 
											Ext.Msg.alert('Error','No se puede eliminar el Cargo'); 
										}
									});
								}
							}
						});
					}
					else
						Ext.Msg.alert('Error','Debe de selecionar un cargo'); 
				}
			}
			,{	xtype: 'tbfill'},					// Tabulador
				new Ext.app.SearchField({			// Componente para la busqueda
						emptyText	: 'Buscar...',	// Texto en blanco en la busqueda
						store: storeManteCargo,		// Fuente de datos
						params: {start: 0, limit: 100},
							width: 180
			})
			]
	    });

		
			w_ejemplo = new Ext.Window({ 	// Creamos nuestra ventana
			 	title: 'Ejemplo 3 - Cargo de Empleado',
				width: 550,
				height: 300,				
				border: false,				//Elimina el borde del interior de la ventana
				closeAction: 'hide',		//Acción de ocultar ventana cuando la cerremos (No la estamos destruyendo)
				layout : 'fit',				//Ayuda a que el formulario que insertaremos quede ajustado a la perfeccion con nuestra ventana
				items			: [gridManteCargo  ]

    	});
			
			w_ejemplo.show(w_ejemplo);		// Mostramos la ventana
		
	});