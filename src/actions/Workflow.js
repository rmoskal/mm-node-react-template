/**
 * Created by rob on 5/10/16.
 */

var alt = require('../alt');

class Actions {

    created(_in) {
        var res = _in.data;
        if (! res.widget) res.widget= 'Simple';
        res.cid = _in.ackId;
        return res;
    }

    delete(cid) {

        return cid;
    }

}

module.exports = alt.createActions(Actions);
