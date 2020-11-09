const { Router } = require('express');
const router = Router(); // me devuelve un objeto que voy a exportar
const admin = require('firebase-admin');
var serviceAccount = require("../../node-firebase-8d30f-firebase-adminsdk-awb9f-7eca4cdf67.json");
const bcrypt = require('bcrypt');

const db = admin.database();

router.get('/login', (req, res)=> { 
    // console.log('Index works!');
    // res.send('received');
    res.render('login');
});

router.post('/login', (req, res) => {

    //comprobación de que los campos del formulario
    if(req.body.email != null && req.body.pass != null) {
        var encontrado = false;
        //acceso a la base de datos
        db.ref('/usuario').orderByChild('email').equalTo(req.body.email).once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var value = childSnapshot.val();
                console.log("email : " + value.email);
        
                if(req.body.email == value.email){
                    if(req.body.pass == value.pass){
                        console.log("pass: " + value.pass);
                        encontrado = true;
                    }
                }
            });

            //si ha ido todo bien
            if(encontrado){
                res.redirect('/index');
            }
            //si no
            else{

            }
        });
    }
    else{
        res.redirect('/');
    }
 
});
module.exports = router;