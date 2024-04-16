
Ext.onReady(function(){ 
  // Indicador de Cargando
  setTimeout(function(){
    Ext.get('loading').remove();
    Ext.get('loading-mask').fadeOut({remove:true});
  }, 250);

  Ext.form.Field.prototype.msgTarget = 'side';

  // Usamos un FormPanel para crear la caja de Login
  var login = new Ext.FormPanel({
    labelWidth: 100,
    id:"login",
    url: "autenticar.php",
    frame: true,
    title: 'SIG-RES - Autenticaci&oacute;n Requerida',
    width: 300,
    padding: 10,
    defaultType: 'textfield',
    monitorValid: true,
    items: [
      {
        xtype : 'fieldset',
        title : '',
        autoHeight : true,
        autoWidth : true, 
        border : false,
        html : '<img src="imagenes/inicio_mtn.png"/> '
      },
      {
        xtype : 'fieldset',
        title : '',
        autoHeight : true,
        autoWidth : true, 
        border : true,
        padding: 10,
        defaultType: 'textfield',
        items:[
          {
            fieldLabel: 'Indicador de Red',
            name: 'usuario',
            allowBlank: false 
          },
          {
            fieldLabel: 'Contrase&ntilde;a',
            name: 'contrasena',
            inputType: 'password',
            allowBlank: false,
            // Key listener for Enter key press
            listeners: {
              specialkey: function(field, e) {
                if (e.getKey() === e.ENTER) {
                  if (login.getForm().isValid()) { // Check form validity before submit
                    login.getForm().submit({
                      method: 'POST',
                      waitTitle: 'Authenticando..',
                      waitMsg: 'Enviando datos...',
                      success: function(){
                        var redirect = "menu.php";
                        window.location = redirect;
                      },
                      failure: function(form, action){
                        // Failure handling as before
                        login.getForm().reset();
                      }
                    });
                  }
                }
              }
            }
          }
        ]
      }
    ],
    buttons: [{
      id: "enviar", 
      text: 'Inicio',
      formBind: true,
      handler: function(){
        
        login.getForm().submit({
          method: 'POST',
          waitTitle: 'Authenticando..',
          waitMsg: 'Enviando datos...',
          success: function(){
             var redirect = "menu.php";
             window.location = redirect;
          },
          failure: function(form, action){
            // Pero si falla
            if (action.failureType == 'server'){
               obj = Ext.util.JSON.decode(action.response.responseText);
               Ext.MessageBox.alert('Error al iniciar sesi&oacute;n', obj.errors.reason);
            }
            else{
               Ext.MessageBox.alert('Error de conexi&oacute;n!', 'El servidor no contesta : ' + action.response.responseText);
            }
            login.getForm().reset();
          }
        });
        
      }
    }]
  });

        // Usamos un Window para mostrar el Login en una ventan
        var win = new Ext.Window({
          layout: 'fit',
          width: 400,
          height: 280,
          closable: false,
          resizable: false,
          plain: true,
          items: [login] // y aca cargamos el panel con el login
      });
      win.show();






});
