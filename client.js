
var soap = require('soap');
var url = 'http://localhost:8000/wsdl?wsdl';

// Crear client
soap.createClient(url, function (err, client) {
  if (err){
    throw err;
  }
  /* 
  * Parametros del service call
  * archivo WSDL 
  */
  var args = {
    message: "192.168.1.100",
    splitter: "."
  };
  // call the service
  client.MessageSplitter(args, function (err, res) {
    if (err)
      throw err;
      // print the service returned result
    console.log(res); 
  });
});