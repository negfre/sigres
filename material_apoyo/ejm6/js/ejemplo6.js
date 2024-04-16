

	Ext.onReady(function(){ // Inicializamos 
			
			Ext.QuickTips.init();

			//Validacion del nombre (Permitira que solo se acepten letras)
			Ext.form.VTypes.nombreMask = /[A-Z\a-z]/;
			Ext.form.VTypes.nombre 	= function(v){
				return Ext.form.VTypes.nombreMask.test(v);
			};
			
			var ss_ciudad = new Ext.data.SimpleStore({ 	// Construimos nuestra fuente de datos para el Combobox
				fields: ['id', 'ciudad'],				// campos
				data : [
							['1','Lima'],
							['2','Santiago'],
							['3','Buenos Aires'],
							['4','Caracas'],
							['5','Bogota']
						] 
			});
			
			w_ejemplo = new Ext.Window({ 	// Creamos nuestra ventana
			 	title: 'Ejemplo 6',
				width: 315,
				height: 300,				
				border: false,				//Elimina el borde del interior de la ventana
				closeAction: 'hide',		//Acción de ocultar ventana cuando la cerremos (No la estamos destruyendo)
				layout : 'fit',				//Ayuda a que el formulario que insertaremos quede ajustado a la perfeccion con nuestra ventana
				items: [					//Aquí incluimos los componentes que estaran dentro de nuestra ventana (en este caso el formulario)
						{
						id:'formulario',
						xtype: 'form',		//Creamos nuestro formulario
						frame: true,
						border: false,
						url	: 'ejemplo6.php',
						defaults: {			//Nos permite asignar ciertos parametros que afectaran a todos los componentes creados dentro de este formulario
							width: 150		//En este caso asignaremos el parametro de ancho por defecto a todos los componentes, menos a las etiquetas
						},
						labelWidth: 130,	//Asigna el ancho de las etiquetas
						items: [			//Aquí incluimos los componentes que estaran dentro de nuestro formulario (en este caso el combobox, textfield, etc.)
							{
								xtype: 'numberfield',	// Ext.form.NumberField  Componente que acepta solo datos numericos 
								fieldLabel: 'DNI',		// Asigna la etiqueta
								id:'dni',				// Id del campo
								blankText: 'Digite el número de su Documento de Identidad', // Texto que se mostrara si el campo esta vacio
								allowBlank: false		// Exige que se complete el campo
							},
							{
								xtype: 'textfield',		// Ext.form.TextField    Componente que acepta datos alfanumericos
								fieldLabel: 'Nombres',
								id:'nombres',
								vtype:'nombre',			// Validacion
								blankText: 'Ingrese sus nombres',
								allowBlank: false
							},
							{
								id:'ciudad',
								xtype: 'combo',			// Ext.form.ComboBox     Componente tipo combo
								fieldLabel: 'Ciudad',	
								lazyRender: true,
								allowBlank: false,
            					selectOnFocus: true,	
            					forceSelection: true,	// Forzamos la selección de un item del combo
								store:ss_ciudad,		// Asignamos nuestra fuente de datos que construimos en la linea 15
								displayField:'ciudad',	// Indicamos el campo de la fuente de datos (ss_ciudad) que deseamos mostrar
								mode: 'local',			// Permite que se muestren los datos
								triggerAction: 'all'	// Permite listar los datos despues de haber seleccionado alguno anteriormente
							},
							{
								id:'fecha',
								xtype: 'datefield',		// Ext.form.DateField     Componente tipo campo de Fecha
								fieldLabel: 'Fecha de Registro',
								format: 'Y/m/d',
								allowBlank: false
							},
							{
									id:'genero',
									xtype: 'radiogroup',	// Ext.form.RadioGroup     Componente tipo agrupador de radio
									fieldLabel: 'Genero',
									columns: 2,				// En cuantas columnas mostraremos los radios creados						
									vertical: true,			// orientacion que tendras los radio
									items: [
										{boxLabel: 'Hombre',inputValue: 'H',name: 'genero',checked:true},
										{boxLabel: 'Mujer', inputValue: 'M',name: 'genero'}
									]
							},
							{
								id:'comentario',
								xtype: 'textarea',		// Ext.form.TextArea     Componente tipo area de texto
								fieldLabel: 'Comentario'
							}
						]
					}
				],
				buttons:[			// Aqui incluiremos los botones del formulario
						{
							xtype: 'button',
							text: 'Grabar',
							handler:function(){	
								if (Ext.getCmp('formulario').getForm().isValid()) {
											Ext.getCmp('formulario').getForm().submit({						
												method: 'POST',
												params:{ task:'GRABAR' },
												waitTitle: 'Validando datos',
												waitMsg: 'Enviando datos..',
												success: function(form, action){
													var data = Ext.util.JSON.decode(action.response.responseText);
													Ext.Msg.alert('Confirmación', data.message.reason);
													Ext.getCmp('formulario').getForm().reset();
												},
												failure: function(form, action){
														var data = Ext.util.JSON.decode(action.response.responseText);
													   Ext.Msg.show({
													   title:'Error',
													   msg: data.errors.reason,
													   buttons: Ext.Msg.OK,
													   icon: Ext.MessageBox.ERROR
													});
														
														
												}
											});
								}
							}	
						},
						{
							xtype: 'button',
							text: 'Cancelar'
						}
						 ]
				
			});

			w_ejemplo.show(w_ejemplo);		// Mostramos la ventana
	
	});
