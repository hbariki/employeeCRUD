'use strict';

module.exports = function() {
    return {
        index: homeIndex
    };

    function homeIndex(req, res) {
        res.render('home');
    }
};