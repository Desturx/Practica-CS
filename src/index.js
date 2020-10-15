const app = require('./app');

app.listen(app.get('port')); // puerto en el que escucha

console.log('Server on port ', app.get('port'));