const { Router } = require('express');
const router = Router(); // me devuelve un objeto que voy a exportar
const admin = require('firebase-admin');
var serviceAccount = require("../../node-firebase-8d30f-firebase-adminsdk-awb9f-7eca4cdf67.json");
const fs = require('fs');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-firebase-8d30f.firebaseio.com/'
});

const db = admin.database();


router.get('/', (req, res)=> {   // crear ruta get que me detecta dos parametros, request y response.
    // console.log('Index works!');
    // res.send('received');
    db.ref('contactos').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', { contacts: data });
    });
});

/*
router.post('/new-contact', (req, res)=> {
    console.log(req.body);
    const newContact = {
        //firstname: req.body.firstname,
       
    };

    db.ref('contactos').push(newContact); // ref es para el nombre en el que guardarlo. El nombre de la tabla o colección
    // res.send('received'); //si quisiera mandar un mensaje
    res.redirect('/');
});
*/

router.post('/new-file', (req,res) =>{
    console.log(req.body.archivo);

    var texto = fs.readFileSync(req.body.archivo, 'utf8');
    console.log(texto);
    
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res)=> {
    db.ref('contactos/' + req.params.id).remove();
    res.redirect('/');
}); 

module.exports = router; // Exporto el objeto router.