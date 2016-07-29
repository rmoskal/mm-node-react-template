/**
 * Created by rob on 5/3/16.
 */

if ( ! process.env.RABBITMQ_URL)
    throw new Error('Tests require a RABBITMQ_URL environment variable to be set, pointing to the RabbiqMQ instance you wish to use.');

var busUrl = process.env.RABBITMQ_URL;

console.log('connecting to >>>>', busUrl);

var bus = require('servicebus').bus({ url: busUrl });

bus.use(bus.correlate());

module.exports = bus;
