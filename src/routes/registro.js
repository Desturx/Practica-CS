const { Router } = require('express');
const router = Router(); // me devuelve un objeto que voy a exportar
const admin = require('firebase-admin');
var serviceAccount = require("../../node-firebase-8d30f-firebase-adminsdk-awb9f-7eca4cdf67.json");
const bcrypt = require('bcrypt');

const db = admin.database();

router.get('/registro', (req, res)=> { 
    // console.log('Index works!');
    // res.send('received');
    res.render('registro');
});

router.post('/new-user', (req, res) => {

    if(req.body.name != null && req.body.pass != null && req.body.email != null) {
        if(req.body.pass == req.body.repitepass){
            var user = {
                name: req.body.name,
                pass: req.body.pass,
                email: req.body.email
            };
            console.log(user);
            db.ref('usuario').push(user);
            //res.redirect('/');
        }
        else{
            res.send('Las contraseñas no coinciden');
        }
    }
    else{
        //res.redirect('/');
    }
 
});
module.exports = router;