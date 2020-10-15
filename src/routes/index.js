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


router.post('/new-file', (req, res) => {
    //console.log(req.files.archivo.data);
    //console.log('FIRST TEST: ' + JSON.stringify(req.files));

    console.log('mensaje: ' + req.files.archivo.data);

    console.log('MD5: ' + req.files.archivo.md5); // la clave que vamos a usar para encriptar.
    //res.send('second TEST: ' + JSON.stringify(req.files.archivo));
    var e_data = CryptoJS.AES.encrypt(req.files.data, '123').toString();

    var cipherObject = {
        datos: e_data,
        nombre: req.files.archivo.name,
        clave: req.files.archivo.md5
    };

    db.ref('objetos').push(cipherObject);
    // console.log(cipherObject.datos);

    //db.ref('objetos').push(cipherObject);
    //res.send(req.files.archivo);
    res.redirect('/');
});

// Metodo para descargarse el archivo
router.get('/download-object/:id', (req, res) => {
    db.ref('objetos/' + req.params.id).once('value', (snapshot) => {
        var values = snapshot.val();
        console.log(values.datos);
        // desencriptado del texto
        var bytes  = CryptoJS.AES.decrypt(values.datos, '123');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log('texto cifrado: ' + values.datos)
        console.log('texto original: '+ originalText);
        res.set({"Content-Disposition":"attachment; filename=" + values.nombre});
        res.send(values.datos);
    });
});

router.get('/delete-object/:id', (req, res) => {
    db.ref('objetos/' + req.params.id).remove();
    res.redirect('/');
}); 


module.exports = router; // Exporto el objeto router.