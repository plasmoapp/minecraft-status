![](https://imgur.com/Qoj7dbO.png)

# Топ приватных серверов по онлайну

<p className="text_16">Сделал <a href="https://t.me/kpidsch" target="_blank">KPidS</a> из <a href="https://">Plasmo</a>, как учебный проект на <a href="https://Nextjs.org/" target="_blank">Next.js</a>. Сайт пингует все сервера раз в 10 минут, записывает данные в базу данных, выводит при рендере страницы.</p>

<p className="text_16">Можно посмотреть <a href="https://github.com/plasmoapp/minecraft-status" target="_blank">исходный код</a> сайта. Код говно, постарайтесь не утонуть.</p>

<p className="text_16">Можете отредактировать servers.json и использовать этот сайт для мониторинга ваших серверов. Только не забудьте указать ссылку на оригинальный проект и авторство. Лицензия GPL v3.0.</p>

<p className="text_16">Если хотите добавить/убрать ваш сервер, то пишите мне в <a href="https://t.me/kpids" target="_blank">Telegram</a> или откройте <a href="https://github.com/plasmoapp/minecraft-status/issues" target="_blank">Issue</a>.</p>

## Как запустить

```shell
$ git clone https://github.com/plasmoapp/minecraft-status.git # Скопируйте репозиторий
$ cd minecraft-status # Перейдите в папку с репозиторием
$ npm i # Установите зависимости
$ npm run dev # Запустите dev сервер, чтобы сгенерировался конфиг

# Отредактируйте файл config.js в корневой папке, укажите данные от базы данных MySQL

$ npm run build 
$ npm start
```
