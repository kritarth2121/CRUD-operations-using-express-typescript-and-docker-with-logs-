

import amqp from 'amqplib/callback_api';
const CONN_URL = 'amqps://fanikcpk:Xc7BemQ50rXN_F85Mr3P7dkdZuSOai7z@puffin.rmq2.cloudamqp.com/fanikcpk';
let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {
      ch = channel;
ch.consume('user-messages',function(msg){
   console.log('......');
   console.log("Message",msg.content.toString());
   ch.ack(msg);

},{noAck:false}
);




   });
});
export const publishToQueue = async (queueName, data) => {
   ch.sendToQueue(queueName, Buffer.from(data),{persistent:true});
}
process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});
