const { Router } = require('express');
const router = Router(); // me devuelve un objeto que voy a exportar
const admin = require('firebase-admin');
var serviceAccount = require("../../node-firebase-8d30f-firebase-adminsdk-awb9f-7eca4cdf67.json");
const fs = require('fs');
const CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt');



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

    if(req.files != null) // Se comprueba que el archivo existe.
    {
        // Generamos una contraseña para encriptar y la hasheamos
        const saltRounds = 10;
        var datetime = new Date();
        // la contraseña la genero con el md5 del archivo, el nombre y la fecha de subida.
        var password = req.files.archivo.md5.toString() + req.files.archivo.name.toString() + datetime.toString();
        // console.log(password);
        // Encripto la contraseña.
        var hash = bcrypt.hashSync(password, saltRounds);


        var e_data; // Variable para almacenar el archivo encriptado

        // Comprobamos si es de tipo texto o de tipo archivo.
        if(req.files.archivo.mimetype != 'text/plain') 
        {
            // Si es de tipo archivo lo convertimos a objeto JSON.
            e_data = CryptoJS.AES.encrypt(JSON.stringify(req.files.archivo.data), hash).toString();
        }
        else
        {
            // Si solo es fichero de texto convertimos el contenido a string y lo almacenamos
            e_data = CryptoJS.AES.encrypt(req.files.archivo.data.toString(), hash).toString();
        }
        
        // Objeto que se subirá a la base de datos.
        var cipherObject = {
            datos: e_data,
            nombre: req.files.archivo.name,
            clave: hash,
            tipo: req.files.archivo.mimetype
        };

        db.ref('objetos').push(cipherObject); // Subo el objeto a la base de datos.
        res.redirect('/');
    }
    else // Si no recibe archivo, lo redirije al index.
    {
        res.redirect('/');
    }
});

// Metodo para descargarse el archivo desencriptado
router.get('/download-decrypted-object/:id', (req, res) => {
    db.ref('objetos/' + req.params.id).once('value', (snapshot) => { // sacar los valores de la consulta de la coleccion 'objetos'.
        var values = snapshot.val();  // estos son los valores que hay en la coleccion.
        
        // Compruebo si es un archivo o un texto.
        if(values.tipo != "text/plain") // Si es de tipo archivo
        {
            var bytes  = CryptoJS.AES.decrypt(values.datos, values.clave); // primero desencripto los datos 
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); // los convirto a JSON para poderlos trabajar.

            var file = Buffer.from(decryptedData, 'base64'); // Si es un archivo multimedia lo codifico a base64 para que se pueda leer.
            res.writeHead(200, { // escribo la cabecera de la peticion para que se convierta en un archivo descargable.
              'Content-Disposition':"attachment; filename=" + values.nombre,  
              'Content-Type': values.tipo,
              'Content-Length': file.length
            });
            res.end(file); // mando el archivo multimedia.
        }
        else // si es de tipo text/plain (.txt)
        {
            var bytes  = CryptoJS.AES.decrypt(values.datos, values.clave);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            //Cabecera para mandar el archivo descargable.
            res.set({"Content-Disposition":"attachment; filename=" + values.nombre});
            res.send(originalText);
        }
    });
});

// Descargar archivo sin desencriptar
// Los pasos son los mismos que para descargalo pero sin desencriptarlo.
router.get('/download-encrypted-object/:id', (req, res) => {
    db.ref('objetos/' + req.params.id).once('value', (snapshot) => {
        var values = snapshot.val();
<<<<<<< HEAD
        console.log(values.datos);
        // desencriptado del texto
        var bytes  = CryptoJS.AES.decrypt(values.datos, '123');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log('texto cifrado: ' + values.datos)
        console.log('texto original: '+ originalText);

        // Descarga del fichero
        //res.setHeader('Content-Type', values.datos.tipo);
        res.set({"Content-Disposition":"attachment; filename=" + values.nombre});
        res.send(originalText);
=======

        if(values.tipo == "image/png" || values.tipo == "image/jpeg")
        {
            var file = Buffer.from(values.datos, 'base64');
            res.writeHead(200, {
              'Content-Disposition':"attachment; filename=" + values.nombre,  
              'Content-Type': values.tipo,
              'Content-Length': file.length
            });
            res.end(file);
        }
        else
        {
            res.set({"Content-Disposition":"attachment; filename=" + values.nombre});
            res.send(values.datos);
        }

>>>>>>> 637181187ec410dba1adfd1569b1397bdb912edd
    });
});

// Request para eliminar un objeto con el id pasado por la url.
router.get('/delete-object/:id', (req, res) => {
    db.ref('objetos/' + req.params.id).remove(); // Hace una petición a la base de datos con la colección/laIdDelObjeto para eliminarlo.
    res.redirect('/');
}); 


module.exports = router; // Exporto el objeto router.