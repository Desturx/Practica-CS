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

module.exports = router;