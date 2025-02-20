Лабораторная работа 5 «Брокеры сообщений»
Cоздайте приложение, отправляющее сообщение в queue, и message-driven bean, читающий отправленное в queue сообщение.

рэбита загружаем в докер
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management

Consumer обработчик сообщений запускаем
node script.js receive

очередь Producer
node script.js send "Привет, мир!"
