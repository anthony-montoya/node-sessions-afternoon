const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    //Middleware
    checkForSession = require('./middlewares/checkForSession'),
    //Controllersrs
    swag_controller = require('./controllers/swag_controller'),
    auth_controller = require('./controllers/auth_controller');
    cart_controller = require('./controllers/cart_controller');
    search_controller = require('./controllers/search_controller');

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: 'GIMMECODE',
    resave: false,
    saveUninitialized: false
}));

app.use(checkForSession);
app.use(express.static('../public/build'));

//Swag api endpoint
app.get('/api/swag', swag_controller.read);

//Auth api endpoint
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

//Cart api endpoint
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

//Search api endpoint
app.get('/api/search', search_controller.search);


const port = 3000;
app.listen(port, () => console.log('Reporting for duty on port ' + port));