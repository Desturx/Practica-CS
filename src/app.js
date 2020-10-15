// Archivo que arranca la app

const express = require('express');
const morgan = require('morgan'); // esto es un middleware. porque estará en medio de las peticiones del servidor
const exphbs = require('express-handlebars');
const path = require('path'); // modulo que nos permite combinar ficheros.


const app = express();


// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); // "__dirname" nos da la ruta actual de la carpeta
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // cambiarlo a true para recibir imágenes

// Routes
app.use(require('./routes/index'));

// Static files (los archivos que el navegador puede acceder)
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;