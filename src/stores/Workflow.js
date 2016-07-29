/**
 * Created by rob on 5/15/16.
 */

var alt = require('../alt');
var actions = require('../actions/Workflow');
/*var io = require('socket.io-client');

var socket = new io();
socket.on('messageAdded', function(msg){
    actions.created(msg);
}); */


class WorkflowStore {
    constructor() {

        this.items = [];
        this.bindListeners({
            handleCreate: actions.created,
            handleDelete: actions.delete
        });
    }

    handleCreate(o) {
        this.items.push(o);
    };

    handleDelete(cid) {
        this.items = this.items.filter(o=>o.cid != cid);
    };


}

module.exports = alt.createStore(WorkflowStore, 'WorkflowStore');