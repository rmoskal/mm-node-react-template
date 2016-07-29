/**
 * Created by rob on 5/15/16.
 */

var io = require('socket.io-client');
var axios = require('axios');
var actions = require('../actions/Workflow');




module.exports = {
    fetch() {
        return {
            remote(state, jobId ) {
                console.log('going remote for documents!!!!', jobId);
                return axios.get('/api/platform/jobDocuments/'+ jobId);
            },

            local(state, jobId) {
                return null;

            },

            success: actions.success,
            error: actions.error,
            loading: actions.loading
        }
    }
};

