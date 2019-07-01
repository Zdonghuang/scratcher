module.exports = function(RED) {
    "use strict";

    function ApiNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;

        var msg = {};
        msg.topic = this.topic;
        msg.payload = ""

        this.send(msg);

        this.on('input', function (msg) {
            node.send(msg);
        });

        this.on("close", function() {
        });
    }

    RED.nodes.registerType("iLeapCloudApi",ApiNode);
}
