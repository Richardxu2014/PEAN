'use strict';

module.exports = function(app) {
    var user = require('../../app/controllers/users');
    app.route('/api/user')
        .get(user.list)
        .post(user.create);

    app.route('/api/user/:userID')
        .get(user.read)
        .put(user.update)
        .delete(user.delete);

    // Finish by binding the user middleware
    app.param('userID', user.userByID);

    app.route('/authenticate').post(user.signIn);
    app.route('/table_create/user').get(user.createTable)
};