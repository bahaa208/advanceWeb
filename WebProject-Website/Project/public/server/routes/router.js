const express = require('express')
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
const productcon = require('../controller/Productcon');
const detailscon = require('../controller/detailscon');
const loginn = require('../controller/login');
const session = require('express-session');
 

route.use(session({
    secret: 'username',
    resave: false,
    saveUninitialized: true
}));


/**
 * @description Root Route
 * @method GET /
 */

route.get('/',services.homeRoutes);

/**
 * @description Products
 * @method GET /products
 */

route.get('/products',services.products);

 
/**
 * @description for cart page
 * @method GET /cart
 */

route.get('/cart',services.cart);

/**
 * @description for Details to buy
 * @method GET /details
 */

route.get('/details',services.details);


/**
 * @description To show the orders
 * @method GET /orders
 */

route.get('/orders',services.orders);

/**
 * @description Update order's details page 
 * @method GET /orders
 */
route.get('/UpdateDetails',services.UpdateDetails);
/**
 * @description Update order's details page 
 * @method GET /orders
 */
route.get('/signUp',services.login);
/**
 * @description Update order's details page 
 * @method GET /orders
 */
route.get('/signIn',services.login_signIn);

//ORDERS API
route.post('/api/orders',controller.create);
route.get('/api/orders/:name',controller.find);
route.put('/api/orders/:id',controller.update);
route.delete('/api/orders/:id',controller.delete);

//PRODUCTS API
route.post('/api/products',productcon.create);
route.get('/api/products',productcon.find);

//Details API
route.post('/api/details',detailscon.create);
route.get('/api/details/:name',detailscon.find);
route.put('/api/details/:id',detailscon.update);
route.delete('/api/details/:id',detailscon.delete);


// login api
route.post('/api/Users',loginn.create);
route.get('/api/Users/:name',loginn.find);
module.exports = route
