const { Router } = require('express');
const router = Router(); // me devuelve un objeto que voy a exportar
const admin = require('firebase-admin');
var serviceAccount = require("../../node-firebase-8d30f-firebase-adminsdk-awb9f-7eca4cdf67.json");
const fs = require('fs');
const CryptoJS = require("crypto-js");
const { Decipher } = require('crypto');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-firebase-8d30f.firebaseio.com/'
});

const db = admin.database();


router.get('/', (req, res)=> {   // crear ruta get que me detecta dos parametros, request y response.
    // console.log('Index works!');
    // res.send('received');
    db.ref('objetos').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', { objects: data });
    });
});

// Subir encriptando
router.post('/new-encrypted-file', (req, res) => {
    // console.log(req.files.archivo.data);
    //console.log('FIRST TEST: ' + JSON.stringify(req.files));
    // console.log('mensaje: ' + req.files.archivo.data);
    // console.log('MD5: ' + req.files.archivo.md5); // la clave que vamos a usar para encriptar.
    //res.send('second TEST: ' + JSON.stringify(req.files.archivo));
    // var e_data = req.files.archivo.data;
    var e_data;
    if(req.files.archivo.mimetype != 'text/plain')
    {
        e_data = CryptoJS.AES.encrypt(JSON.stringify(req.files.archivo.data), '123').toString();
    }
    else
    {
        e_data = CryptoJS.AES.encrypt(req.files.archivo.data.toString(), '123').toString();
    }

    var cipherObject = {
        datos: e_data,
        nombre: req.files.archivo.name,
        clave: req.files.archivo.md5,
        tipo: req.files.archivo.mimetype,
        encriptado: true
    };
    db.ref('objetos').push(cipherObject);
    // res.send(req.files.archivo.data);
    res.redirect('/');
});

// Subir sin encriptar
router.post('/new-file', (req, res) => {
  var e_data = CryptoJS.AES.encrypt(req.files.archivo.data.toString(), '123').toString();
    var e_data = req.files.archivo.data;
    var cipherObject = {
        datos: e_data,
        nombre: req.files.archivo.name,
        clave: req.files.archivo.md5,
        tipo: req.files.archivo.mimetype,
        encriptado: false
    };
    db.ref('objetos').push(cipherObject);
    // res.send(req.files.archivo.data);
    res.redirect('/');
});

// Metodo para descargarse el archivo desencriptado
router.get('/download-decrypted-object/:id', (req, res) => {
    db.ref('objetos/' + req.params.id).once('value', (snapshot) => {
        var values = snapshot.val();
        // desencriptado del texto
        // if(values.tipo == "text/plain") 
        // {
        //     var originalText = bytes.toString(CryptoJS.enc.Utf8);
        // }
        if(values.tipo == "image/png" || values.tipo == "image/jpeg")
        {
            var bytes  = CryptoJS.AES.decrypt(values.datos, '123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            var img = Buffer.from(decryptedData, 'base64');
            res.writeHead(200, {
              'Content-Disposition':"attachment; filename=" + values.nombre,  
              'Content-Type': values.tipo,
              'Content-Length': img.length
            });
            res.end(img);
        }
        else
        {
            var bytes  = CryptoJS.AES.decrypt(values.datos, '123');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            res.set({"Content-Disposition":"attachment; filename=" + values.nombre});
            res.send(originalText);
        }
    });
});

// Descargar archivo sin desencriptar
router.get('/download-encrypted-object/:id', (req, res) => {
    db.ref('objetos/' + req.params.id).once('value', (snapshot) => {
        var values = snapshot.val();

        if(values.tipo == "image/png" || values.tipo == "image/jpeg")
        {
            var img = Buffer.from(values.datos, 'base64');
            res.writeHead(200, {
              'Content-Disposition':"attachment; filename=" + values.nombre,  
              'Content-Type': values.tipo,
              'Content-Length': img.length
            });
            res.end(img);
        }
        else
        {
            res.set({"Content-Disposition":"attachment; filename=" + values.nombre});
            res.send(values.datos);
        }


    
    
    // var file;
    // res.writeHead(200, (content_type) => {
    //     let content;
    //     if (content_type == 'image/png') {
    //         file = Buffer.from(values.datos, "base64");

    //         content = {
    //             "Content-Disposition": "attachment; filename=" + values.nombre,
    //             "Content-Type": "image/png",
    //             "Content-Length": file.length,
    //         };
    //     } else if (content_type == 'doc/pdf') {
    //         file = Buffer.from(values.datos, "PDF o lo que sea");

    //         content = {
    //             "...": "..."
    //         }
    //     } else {
    //         file = {"hola.txt": "hola mundo loco!"};

    //         content = {
    //             "como un": ".txt"
    //         }
    //     }
    //     return content;
    // });
    // res.end(file);

    });
});

router.get('/delete-object/:id', (req, res) => {
    db.ref('objetos/' + req.params.id).remove();
    res.redirect('/');
}); 


module.exports = router; // Exporto el objeto router.