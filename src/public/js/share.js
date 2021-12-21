var data = "";

this.onconnect = function(e) {
    var port = e.ports[0];
    port.onmessage = function(e) {
        if(e.data == 'getData') {
            port.postMessage(data);
        } else {
            data = e.data;
        }

    }
};
