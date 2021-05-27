import amqp from 'amqplib/callback_api';

//var amqp = amq();
const CONN_URL = 'amqps://fanikcpk:Xc7BemQ50rXN_F85Mr3P7dkdZuSOai7z@puffin.rmq2.cloudamqp.com/fanikcpk';
amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    ch.consume('user-messages', function (msg) {
      console.log('.....');
      setTimeout(function(){
        console.log("Message:", msg.content.toString());
      },4000);
      },{ noAck: true }
    );
  });
});