/**
 * Created by rob on 7/20/16.
 */


export function create (app, overrideEnv) {

    if (!process.env.NODE_ENV)
        process.env.NODE_ENV = "development";


    if (overrideEnv)
        process.env.NODE_ENV = overrideEnv;


    console.log('Starting %s', process.env.NODE_ENV);

    const environment = process.env.NODE_ENV;

    /** Environment set after this point  !!! **/

    const gcloudSettings = {projectId: process.env.GCLOUD_PROJECT};
    if (environment != 'production')
        gcloudSettings.keyFilename = '../service.json'

    const gcloud = require('gcloud')(gcloudSettings);
    return  {pubsub: gcloud.pubsub(), app:app, config: process.env};



}


export function createTest (app, overrideEnv) {

    if (!process.env.NODE_ENV)
        process.env.NODE_ENV = "development";


    if (overrideEnv)
        process.env.NODE_ENV = overrideEnv;


    console.log('Starting %s', process.env.NODE_ENV);


    /** Environment set after this point  !!! **/


    return  {pubsub: {}, app:app, config: process.env};



}




export function bootExpress(deps) {

    var bodyParser = require('body-parser');
    deps.app.use(bodyParser.json());

    require('./routes/api')(deps);
    require('./routes/webpack')(deps);


}