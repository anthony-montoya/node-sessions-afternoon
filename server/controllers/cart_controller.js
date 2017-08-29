const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        const { id } = req.query;
        let { cart } = req.session.user;

        const index = cart.findIndex(swag => swag.id == id);
        //This will return -1 if it isnt in the cart.
        if(index === -1) {
            const selectedSwag = swag.find(swag => swag.id == id);

            cart.push(selectedSwag);
            req.session.user.total += selectedSwag.price;
        }
        res.status(200).send(req.session.user);
    },

    delete: (req, res, next) => {
        const { id } = req.query;
        let { cart } = req.session.user;

        const selectedSwag = swag.find(swag => swag.id == id);
        if(selectedSwag) {
            const removeIndex = cart.findIndex(swag => swag.id == id);

            cart.splice(removeIndex, 1);
            req.session.user.total -= selectedSwag.price;
        }
        res.status(200).send(req.session.user); 
    },

    checkout: (req, res, next) => {
        const { user } = req.session;
        //Sets the cart to an empty array and the total back to 0.
        user.cart = [];
        user.total = 0;

        res.status(200).send(req.session.user);
    }
}