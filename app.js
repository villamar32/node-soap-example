/*jslint node: true */
"use strict";


var soap = require('soap');
var express = require('express');
var fs = require('fs');

// el splitter function
function splitter_function(args) {
    console.log('splitter_function');
    var splitter = args.splitter;
    var splitted_msg = args.message.split(splitter);
    var result = [];
    for(var i=0; i<splitted_msg.length; i++){
      result.push(splitted_msg[i]);
    }
    return {
        result: result
        }
}

// el servicio
var serviceObject = {
  MessageSplitterService: {
        MessageSplitterServiceSoapPort: {
            MessageSplitter: splitter_function
        },
        MessageSplitterServiceSoap12Port: {
            MessageSplitter: splitter_function
        }
    }
};

// cargar archivo WSDL
var xml = fs.readFileSync('service.wsdl', 'utf8');
// crear app express
var app = express();

// rooteo
app.get('/', function (req, res) {
  res.send('Ejemplo Node Soap!');
})

// Ejecutar el servidor
var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});