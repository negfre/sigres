<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>SIG-CGR - GODD EXPLORACIÓN ORIENTE</title>

  <link rel="stylesheet" type="text/css" href="css/sistema.css">
  <link rel="stylesheet" type="text/css" href="ext-3.4/resources/css/ext-all.css" />
  <link rel="stylesheet" type="text/css" href="ext-3.4/resources/css/xtheme-silverCherry.css" />
  <link rel="shortcut icon" href="imagenes/pdvsa.ico" type="image/x-icon" />
</head>
<body onload="ini()" onkeypress="parar()" onclick="parar()" style="background-color: #fcf8f7;">

  <div id="loading-mask" style="display: none;">
  </div>
  <div id="loading" style="display: none;">
        <div class="loading-indicator">
          <img src="imagenes/large-loading.gif" width="32" height="32" style="margin-right: 8px; padding-left: 120px; float: left; vertical-align: top;"/>
          SIG_CGR ....<br />
          <span id="loading-msg">Cargando...</span>
        </div>
  </div>

  <div id="header" class="header">
    <img src="imagenes/titulo_mtn.png" width="100%" height="100%" style="margin-right: 8px;"/>
  </div>

  <script type="text/javascript">
    var tiempo;

    function ini() {
      tiempo = setTimeout('location="index.html"', 7200000); // 2 h
    }

    function parar() {
      clearTimeout(tiempo);
      tiempo = setTimeout('location="index.html"', 7200000); // 2 h
    }

    document.getElementById('loading-msg').innerHTML = 'Cargando el Componente Central ...';
  </script>

  <script type="text/javascript" src="ext-3.4/adapter/ext/ext-base.js"></script>

  <script type="text/javascript">
    document.getElementById('loading-msg').innerHTML = 'Cargando la Interfaz Grafica...';
  </script>
  <script type="text/javascript" src="ext-3.4/ext-all.js"></script>

  <script type="text/javascript">
    document.getElementById('loading-msg').innerHTML = 'Cargando Plugin Base...';
  </script>
  <script type="text/javascript" src="ext-3.4/ux/statusbar/StatusBar.js"></script>

  <script type="text/javascript">
    document.getElementById('loading-msg').innerHTML = 'Cargando Esquema General...';
  </script>
  <script type="text/javascript" src="ext-3.4/locale/ext-lang-es.js"></script>

  <script type="text/javascript">
    document.getElementById('loading-msg').innerHTML = 'Cargando... Aplicación...';
  </script>
  <script type="text/javascript" src="js/appIni.js"></script>

</body>
</html>
