const users = require('../models/users');

var id = 1;

module.exports = {
    login: (req, res, next) => {
        const { session } = req;
        const { username, password } = req.body;
        const user = users.find(user => 
            user.username === username && user.password === password);

        if(user) {
            session.user.username = username;
            res.status(200).send(session.user);
        } else {
            res.status(500).send('Access denied');
        }
    },

    register: (req, res, next) => {
        const { session } = req;
        const { username, password } = req.body;
        console.log('Fired');

        users.push({ id, username, password });
        id++;
        console.log(users);
        console.log(session.user.username);
        session.user.username = username;
        res.status(200).send(session.user);
    },

    signout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send(req.session);
    },

    getUser: (req, res, next) => {
        const { session } = req;
        res.status(200).send(session.user)
    }
}