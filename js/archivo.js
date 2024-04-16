Ext.onReady(function() {
   function copyUrlToClipboard(url) {
       var tempInput = document.createElement("input");
       tempInput.value = url;
       document.body.appendChild(tempInput);
       tempInput.select();
       document.execCommand("copy");
       document.body.removeChild(tempInput);

       // Cambiar el texto del botón temporalmente
       var copyButton = Ext.getCmp("copy-button");
       if (copyButton) {
           var originalText = copyButton.text;
           copyButton.setText("Copiado");
           setTimeout(function() {
               copyButton.setText(originalText);
           }, 1500);
       }
   }

   var uploadForm = Ext.create('Ext.form.Panel', {
       renderTo: Ext.getBody(),
       margin: '20 0',
       items: [{
           xtype: 'filefield',
           name: 'fileToUpload',
           fieldLabel: 'Seleccionar archivo',
           labelWidth: 150,
           buttonText: 'Examinar'
       }],
       buttons: [{
           text: 'Subir Archivo',
           handler: function() {
               var form = this.up('form').getForm();
               if (form.isValid()) {
                   form.submit({
                       url: 'upload.php',
                       waitMsg: 'Subiendo archivo...',
                       success: function(form, action) {
                           Ext.Msg.alert('Éxito', 'Archivo subido correctamente.');
                       },
                       failure: function(form, action) {
                           Ext.Msg.alert('Error', 'Error al subir archivo.');
                       }
                   });
               }
           }
       }]
   });

   var fileList = Ext.create('Ext.panel.Panel', {
       renderTo: Ext.getBody(),
       margin: '20 0',
       items: [{
           xtype: 'label',
           html: '<h2>Archivos Subidos</h2>'
       }, {
           xtype: 'list',
           store: {
               autoLoad: true,
               proxy: {
                   type: 'ajax',
                   url: 'getFiles.php',
                   reader: {
                       type: 'json',
                       rootProperty: 'data'
                   }
               }
           },
           itemTpl: new Ext.XTemplate(
               '<div class="list-group-item d-flex justify-content-between align-items-center">',
               '<a href="{downloadUrl}">{fileName}</a>',
               '<a href="delete.php?file={fileName}" class="btn btn-danger btn-sm">Borrar</a>',
               '<button class="btn btn-primary btn-sm" onclick="copyUrlToClipboard(\'{downloadUrl}\')">Copiar URL</button>',
               '</div>'
           )
       }]
   });
});


