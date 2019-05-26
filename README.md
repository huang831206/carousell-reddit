# Carousell reddit clone

This is for Carousell Code exercise. (make a reddit clone for up/down votes)
The frontend and backend are separated, and they can be deployed so.
You need to install npm packages for both: run `npm install` in both `frontend` and `backend`
The test locates outside, run `npm install` to install `ava` and `npm run test` to test.

1. This app uses `rabbitmq`, so you need to install it first
see [https://www.rabbitmq.com/download.html]

2. create `.env.production` under `frontend`. The file contains
`VUE_APP_API_BASE_URL=http://localhost:3000`
where you can replace it with your real server host and port

3. To build frontend in production
```
cd frontend
npm run build
```
this will create a `dist/` folder in `frontend/`

4. To run production server, pm2 is recommended
install pm2 `npm install pm2 -g`
run `pm2 start pm2.json --env production` to start server

## frontend
Boilerplate created via `vue-cli`.
It's very simple, There's only one component in app.(Post)
### env
The app loads `frontend/.env.production` by default. If you wish to make a dev env, create a `frontend/.env.development.local`


## backend
The server loads config by `NODE_ENV` which is provided by pm2 in `pm2.json`.

### storage
The implementation of storages.
Try to reduce the trouble to swap storage options. So `BaseStorage.js` is more like a interface or template, regulating what should be done to provide storage functionality.
In this case, `MemoryStorage.js` provides the option to save data in memory.

### Ranker
The ranker keeps only the trending posts(<= `maxRank`). Everytime a new post becomes pupolar, ranker sorts itself.
Only when a post becomes more popular than the last of trending posts, ranker will add it to trending, sort ranker itself, and remove the last post. Thus the number in trending will remain <= `maxRank`.

### queue
The implementation of message queues.
I was plannig to use redis as message queue but found that redis is not allowed in this challenge. So I use rabbitmq and have it easy to swap. 
Just like storage, `BaseQueue` is more like a interface or template, regulating what should be done to provide queue functionality.
In this case, `Rabbitmq.js` provides the option to use rabbitmq as our mq.
