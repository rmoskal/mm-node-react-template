/**
 * Created by rob on 7/20/16.
 */

var path = require('path')
module.exports = function(deps){

    var app = deps.app;


    /************************************************************
     *
     * Express routes for:
     *   - app.js
     *   - style.css
     *   - index.html
     *
     ************************************************************/

// Serve application file depending on environment
    app.get('/app.js', (req, res) => {
        if (process.env.PRODUCTION) {
            res.sendFile(path.join(__dirname , '../build/app.js'));
        } else {
            res.redirect('//localhost:9090/build/app.js');
        }
    });

// Serve aggregate stylesheet depending on environment
    app.get('/style.css', (req, res) => {
        if (process.env.PRODUCTION) {
            res.sendFile(path.join(__dirname , '../build/style.css'));
        } else {
            res.redirect('//localhost:9090/build/style.css');
        }
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    });

};
