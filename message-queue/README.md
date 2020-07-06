# MQ component

MQ stands for Message Queue.

Its task is to provide asynchronous communications between system components by receiving and reliably delivering messages grouped by topics. You can learn more from [Wikipedia](https://en.wikipedia.org/wiki/Message_queue).

We use [RabbitMQ](https://www.rabbitmq.com) message queue for this demo because:
 * RabbitMQ supports many protocols
 * RabbitMQ supports acknowledgements on both consumer and publisher side which guarentees reliable delivery
 * It is easy to setup from Docker and it comes with management web UI pre-installed (see [http://localhost:3006](http://localhost:3005), login `guest`, password `guest`)
 * RabbitMQ officially supports PHP and JavaScript - which are languages used in this demo

More info:
 * [Understanding When to use RabbitMQ or Apache Kafka](https://tanzu.vmware.com/content/blog/understanding-when-to-use-rabbitmq-or-apache-kafka)
 * [Comparison of MQTT implementations](https://en.wikipedia.org/wiki/Comparison_of_MQTT_implementations)
 