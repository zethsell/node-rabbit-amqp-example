import amqplib from 'amqplib/callback_api';

const host =
  'amqps://root:rabbit@1234!@b-52839032-9a70-4e0b-8df1-a181c9473648.mq.us-east-1.amazonaws.com:5671';
const queue = 'rr-test';

function consumer() {
  amqplib.connect(host, (err, connection) => {
    connection.createChannel((err, channel) => {
      channel.consume(queue, (message) => {
        if (message === null) {
          console.log('Cancelled by server!');
          return;
        }

        console.log(`${Date.now()}:`, message.content.toString());
        channel.ack(message);
      });
    });
  });
}

consumer();
