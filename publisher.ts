import amqplib from 'amqplib/callback_api';

const host =
  'amqps://root:rabbit@1234!@b-52839032-9a70-4e0b-8df1-a181c9473648.mq.us-east-1.amazonaws.com:5671';
const queue = 'rr-test';

function publisher() {
  amqplib.connect(host, (err, connection) => {
    connection.createChannel((err, channel) => {
      // channel.assertQueue(queue);

      const exchange = 'amqp.direct';

      const message = JSON.stringify({
        hello: 'queue-message',
      });

      const message2 = JSON.stringify({
        hello: 'exchange-message',
      });

      channel.assertExchange(exchange, 'topic');

      channel.bindQueue(queue, exchange, 'routkey');

      channel.sendToQueue(queue, Buffer.from(message));
      console.log('message queue sent!');

      channel.publish(exchange, 'routkey', Buffer.from(message2));
      console.log('message exchange sent!');

      setTimeout(() => {
        connection.close();
      }, 1000);
    });
  });
}

publisher();
