import express from 'express';
const app = express();

var bus = require('./services/bus');



import * as factory from "./AppFactory"



var deps =factory.create(app);
factory.bootExpress(deps);




/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION) {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('./webpack.local.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true
  }).listen(9090, 'localhost', (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}






/******************
 *
 * Express server
 *
 *****************/

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});





/***********
 * Some web sockets
 ********/

const io = require('socket.io')(server);

// Set socket.io listeners.
io.on('connection', (socket) => {
  console.log('a user connected');

  io.emit('someGreeting', 'Hey ho lets go');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

