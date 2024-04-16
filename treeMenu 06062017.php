<?php
session_name("CGR");
session_start();
if (!empty($_SESSION['nivel']))
 if ($_SESSION['nivel'] == '1') //Administrador
  echo "[{ text:'Negocio',
	expanded:true,
		children: [
			{
				id:'menu-unidad-negocio',
				tabType:'iframe',
				text:'Unidad de Negocio',
				iconCls:'x-icon-menu-negocio',
				leaf:true,
				url:'unidadNegocio.php'
			},
			{
				id:'menu-gerencia',
				tabType:'iframe',
				text:'Gerencia del Negocio',
				iconCls:'x-icon-menu-negocio',
				leaf:true,
				url:'gerenciaNegocio.php'
			},
			{
				id:'menu-usuario',
				tabType:'iframe',
				text:'Usuario',
				iconCls:'x-icon-menu-negocio',
				leaf:true,
				url:'usuario.php'
			},
			{
				id:'menu-proyecto',
				tabType:'iframe',
				text:'Proyecto',
				iconCls:'x-icon-menu-negocio',
				leaf:true,
				url:'proyecto.php'
			},
			{
				id:'menu-division',
				tabType:'iframe',
				text:'Divisi&oacute;n',
				iconCls:'x-icon-menu-negocio',
				leaf:true,
				url:'division.php'
			},
			{
				id:'menu-tipo-proyecto',
				tabType:'iframe',
				text:'Tipo de Proyecto',
				iconCls:'x-icon-menu-negocio',
				leaf:true,
				url:'tipoProyecto.php'
			},
			{
				id:'menu-grupo-proyecto',
				tabType:'iframe',
				text:'Grupo de Proyectos',
				iconCls:'x-icon-menu-negocio',
				leaf:true,
				url:'grupoProyecto.php'
			}
			 ]
 } ,
 { text:'Gerencia',
	expanded:true,
		children: [
		        {
				id:'menu-requerimiento',
				tabType:'iframe',
				text:'Requerimiento',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'requerimiento.php'
			},
			{
				id:'menu-proceso',
				tabType:'iframe',
				text:'Proceso',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'proceso.php'
			},
			{
				id:'menu-subproceso',
				tabType:'iframe',
				text:'Sub-Proceso',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'subProceso.php'
			},
			{
				id:'menu-analista',
				tabType:'iframe',
				text:'Analista',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'analista.php'
			},
			{
				id:'menu-servicio',
				tabType:'iframe',
				text:'Servicio',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'servicio.php'
			},
			{
				id:'menu-proceso-servicio',
				tabType:'iframe',
				text:'Proceso/Servicios',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'procesoServicio.php'
			},
			{
				id:'menu-actividad',
				tabType:'iframe',
				text:'Actividad',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'actividad.php'
			},
			{
				id:'menu-subactividad',
				tabType:'iframe',
				text:'Sub-Actividad',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'subactividad.php'
			},
			{
				id:'menu-medida',
				tabType:'iframe',
				text:'Medida',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'medida.php'
			},
			{
				id:'menu-subactividad-medida',
				tabType:'iframe',
				text:'Sub-Actividad/Medidas',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'subactividadMedida.php'
			},
			{
				id:'menu-proveedor',
				tabType:'iframe',
				text:'Proveedor',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'proveedor.php'
			},
			{
				id:'menu-aplicacion',
				tabType:'iframe',
				text:'Aplicaci&oacute;n',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'aplicacion.php'
			}
		    ]
 },
  { text:'Parametros Indicadores',
	expanded:true,
		children: [
			{
				id:'menu-matriz',
				tabType:'iframe',
				text:'Matriz de Datos',
				iconCls:'x-icon-menu-indicador',
				leaf:true,
				url:'matrizDatos.php'
			},
			{
				id:'menu-grupo-matriz',
				tabType:'iframe',
				text:'Grupo Matriz de Datos',
				iconCls:'x-icon-menu-indicador',
				leaf:true,
				url:'grupoMatriz.php'
			},
			{
				id:'menu-indicador',
				tabType:'iframe',
				text:'Indicador de Gesti&oacute;n',
				iconCls:'x-icon-menu-indicador',
				leaf:true,
				url:'indicador.php'
			},
			{
				id:'menu-grupo-indicador',
				tabType:'iframe',
				text:'Grupo de Indicadores',
				iconCls:'x-icon-menu-indicador',
				leaf:true,
				url:'grupoIndicador.php'
			}
			 ]
 },
 { text:'Reportes',
	expanded:true,
		children: [
			{
				id:'menu-rep-indicador',
				tabType:'iframe',
				text:'Indicadores de Gesti&oacute;n',
				iconCls:'x-icon-menu-reporte',
				leaf:true,
				url:'resumenIndicadorGestion.php'
			},
			{
				id:'menu-rep-matriz',
				tabType:'iframe',
				text:'Matriz de Datos',
				iconCls:'x-icon-menu-reporte',
				leaf:true,
				url:'resumenMatriz.php'
			},
			{
				id:'menu-rep-analista',
				tabType:'iframe',
				text:'Requerimientos por Analistas',
				iconCls:'x-icon-menu-reporte',
				leaf:true,
				url:'serviciosAnalistas.php'
			},
			{
				id:'menu-rep-personal',
				tabType:'iframe',
				text:'Listado del Personal',
				iconCls:'x-icon-menu-reporte',
				leaf:true,
				url:'listadoAnalista.php'
			},
			{
				id:'menu-rep-requerimientos',
				tabType:'iframe',
				text:'Exportar Requerimientos',
				iconCls:'x-icon-menu-reporte',
				leaf:true,
				url:'listadoRequerimientos.php'
			}
			 ]
 },
 { text:'Ayuda',
	expanded:true,
		children: [
			{
				id:'menu-manual',
				tabType:'iframe',
				text:'Manual del Sistema',
				iconCls:'x-icon-menu-ayuda2',
				leaf:true,
				url:'temporal.php'
			},
			{
				id:'menu-acercade',
				tabType:'iframe',
				text:'Acerca de SIG-CGR',
				iconCls:'x-icon-menu-ayuda2',
				leaf:true,
				url:'temporal.php'
			}
			 ]
 }
 ]";
 else
  if ($_SESSION['nivel'] == '2') //menu Planificacion
  echo "[
  { text:'Negocio',
	expanded:true,
		children: [
			{
				id:'menu-proyecto',
				tabType:'iframe',
				text:'Proyecto',
				iconCls:'x-icon-menu-negocio',
				leaf:true,
				url:'proyecto.php'
			}
                ]
  },
  { text:'Gerencia',
  	expanded:true,
  		children: [
  		        {
  				id:'menu-requerimiento',
  				tabType:'iframe',
  				text:'Requerimiento',
  				iconCls:'x-icon-menu-gerencia2',
  				leaf:true,
  				url:'requerimiento.php'
  			   }

  		    ]
   },
  { text:'Parametros Indicadores',
	expanded:true,
		children: [
			{
				id:'menu-matriz',
				tabType:'iframe',
				text:'Matriz de Datos',
				iconCls:'x-icon-menu-indicador',
				leaf:true,
				url:'matrizDatos.php'
			},
			{
				id:'menu-grupo-matriz',
				tabType:'iframe',
				text:'Grupo Matriz de Datos',
				iconCls:'x-icon-menu-indicador',
				leaf:true,
				url:'grupoMatriz.php'
			},
			{
				id:'menu-indicador',
				tabType:'iframe',
				text:'Indicador de Gesti&oacute;n',
				iconCls:'x-icon-menu-indicador',
				leaf:true,
				url:'indicador.php'
			},
			{
				id:'menu-grupo-indicador',
				tabType:'iframe',
				text:'Grupo de Indicadores',
				iconCls:'x-icon-menu-indicador',
				leaf:true,
				url:'grupoIndicador.php'
			}
		]
 },
 { text:'Reportes',
	expanded:true,
		children: [
			{
				id:'menu-rep-indicador',
				tabType:'iframe',
				text:'Indicadores de Gesti&oacute;n',
				iconCls:'x-icon-menu-reporte',
				leaf:true,
				url:'resumenIndicadorGestion.php'
			},
			{
				id:'menu-rep-matriz',
				tabType:'iframe',
				text:'Matriz de Datos',
				iconCls:'x-icon-menu-reporte',
				leaf:true,
				url:'resumenMatriz.php'
			},
			{
				id:'menu-rep-analista',
				tabType:'iframe',
				text:'Requerimientos por Analistas',
				iconCls:'x-icon-menu-reporte',
				leaf:true,
				url:'serviciosAnalistas.php'
			},
			{
				id:'menu-rep-personal',
				tabType:'iframe',
				text:'Listado del Personal',
				iconCls:'x-icon-menu-reporte',
				leaf:true,
				url:'listadoAnalista.php'
			},
			{
				id:'menu-rep-requerimientos',
				tabType:'iframe',
				text:'Exportar Requerimientos',
				iconCls:'x-icon-menu-reporte',
				leaf:true,
				url:'listadoRequerimientos.php'
			}
			 ]
 },
 { text:'Ayuda',
	expanded:true,
		children: [
			{
				id:'menu-manual',
				tabType:'iframe',
				text:'Manual del Sistema',
				iconCls:'x-icon-menu-ayuda2',
				leaf:true,
				url:'temporal.php'
			},
			{
				id:'menu-acercade',
				tabType:'iframe',
				text:'Acerca de SIG-CGR',
				iconCls:'x-icon-menu-ayuda2',
				leaf:true,
				url:'temporal.php'
			}
			 ]
 }
 ]";
  else
   if ($_SESSION['nivel'] == '3') //menu Analista
  echo "[{ text:'Negocio',
	expanded:true,
		children: [
			{
				id:'menu-usuario',
				tabType:'iframe',
				text:'Usuario',
				iconCls:'x-icon-menu-negocio',
				leaf:true,
				url:'usuario.php'
			}
			 ]
 },
 { text:'Gerencia',
	expanded:true,
		children: [
		    {
				id:'menu-requerimiento',
				tabType:'iframe',
				text:'Requerimiento',
				iconCls:'x-icon-menu-gerencia2',
				leaf:true,
				url:'requerimiento.php'
			}
			 ]
 },
  { text:'Reportes',
	expanded:true,
		children: [
			{
				id:'menu-rep-personal',
				tabType:'iframe',
				text:'Listado del Personal',
				iconCls:'x-icon-menu-reporte',
				leaf:true,
				url:'listadoAnalista.php'
			},
			{
				id:'menu-rep-analista',
				tabType:'iframe',
				text:'Requerimientos por Analistas',
				iconCls:'x-icon-menu-reporte',
				leaf:true,
				url:'serviciosAnalistas.php'
			}
			 ]
 },
 { text:'Ayuda',
	expanded:true,
		children: [
			{
				id:'menu-manual',
				tabType:'iframe',
				text:'Manual del Sistema',
				iconCls:'x-icon-menu-ayuda2',
				leaf:true,
				url:'temporal.php'
			},
			{
				id:'menu-acercade',
				tabType:'iframe',
				text:'Acerca de SIG-CGR',
				iconCls:'x-icon-menu-ayuda2',
				leaf:true,
				url:'temporal.php'
			}
			 ]
 }
 ]";
 ?>
