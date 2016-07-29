/**
 * Created by rob on 7/20/16.
 */

module.exports = function(deps){

var pubsub = deps.pubsub;

    exports.getCreateTopic = function  (userId, cb) {
        pubsub.createTopic(userId, function (err, topic) {
            // topic already exists.
            if (err && err.code === 409) {
                return cb(null, pubsub.topic(userId));
            }
            return cb(err, topic);
        });
    };

    exports.getCreateSubscription = function subscribe(userId, cb) {

        exports.getCreateTopic('ux-'+userId, function (err, topic) {

            if (err) {
                return cb(err);
            }

            topic.subscribe('ux-'+userId, {
                reuseExisting: true,
                ackDeadlineSeconds:600
            }, function (err, sub) {
                if (err) {
                    return cb(err);
                }

                return cb(null, sub);
            });

        });
    };

    exports.pull = function (userId, cb) {

        var subscription = pubsub.subscription('ux-'+userId);
        subscription.pull({
            maxResults: 100,
            returnImmediately: true
        }, cb);

    };


    exports.ack = function (userId, messageId, cb) {

        var subscription = pubsub.subscription('ux-'+userId);
        //console.log(subscription);
        subscription.ack([messageId], cb);

    };


    return exports;


};
