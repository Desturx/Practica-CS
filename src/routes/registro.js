const { Router } = require('express');
const router = Router(); // me devuelve un objeto que voy a exportar
const admin = require('firebase-admin');

const db = admin.database();

router.get('/registro', (req, res)=> { 
    // console.log('Index works!');
    // res.send('received');
    res.render('registro');
});

router.post('/new-user', (req, res) => {

    if(req.body.name != null && req.body.pass != null && req.body.email != null && req.body.repitepass != null) {
        db.ref('/usuario').orderByChild('email').equalTo(req.body.email).once('value', function (snapshot) {
            var encontrado = false;

            snapshot.forEach(function (childSnapshot) {
                var value = childSnapshot.val();
                console.log("email : " + value.email);
        
                if(req.body.email == value.email){
                    encontrado = true;
                }
            });

            if(!encontrado){
                if(req.body.pass == req.body.repitepass){
                    var user = {
                        name: req.body.name,
                        pass: req.body.pass,
                        email: req.body.email
                    };
                    db.ref('usuario').push(user);
                    res.redirect('/');
                }
                else{
                    res.send('Las contraseñas no coinciden');
                }
            }
            else
            {
                res.send('El email ya existe');
            }       
        });
    }
    else{
        //res.redirect('/');
    }
 
});
module.exports = router;