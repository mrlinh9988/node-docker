const express = require('express')
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const bodyParser = require('body-parser')
const session = require('express-session');
// const RedisStore = require("connect-redis").default
// const client = require('./config/redisClient')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const postRoutes = require('./routes/postRoutes')
const userRoutes = require('./routes/userRoutes'); 

// Hàm thực hiện retry connect với mongo nếu xảy ra lỗi (chưa chắc đây là best pratice, chỉ mang tính tham khảo)
const connectWithRetry = () => {
    mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connect successfully'))
    .catch(e => {
        console.log(e)
        setTimeout(connectWithRetry, 5000)
    });
}

connectWithRetry()
app.enable("trust proxy");
// app.use(session({
//     store: new RedisStore({
//         client,
//     }),
//     secret: SESSION_SECRET,
//     cookie: {
//         resave: false,
//         saveUninitialized: false,
//         secure: false,
//         httpOnly: true,
//         maxAge: 30000,
//     }
// }));
 
app.get('/api/v1', (req, res) => {
    res.send('<h2>Hello Nguyen Hai Linh 44444</h2>')
})

app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/users', userRoutes)

const port = process.env.PORT || 3000
app.listen(port , () => { 
    console.log('server listening on port ' + port);
})