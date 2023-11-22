const express = require('express');
const cors = require('cors');
const http = require('http');
require("dotenv").config();
const PORT = process.env.PORT;

const UserRoutes = require('./Routes/UsersRoute');
const RestaurantRoutes = require('./Routes/RestaurantRoute')
const FoodRoutes = require('./Routes/FoodRoute')
const DrinkRoutes = require('./Routes/DrinkRoute')
const OrderRoutes = require('./Routes/OrderRoute')
const TableRotues = require('./Routes/TableRoute')

const app = express();
app.use(express.json());
app.use(cors());
app.use('/Users', UserRoutes)
app.use('/Restaurants', RestaurantRoutes)
app.use('/Food', FoodRoutes)
app.use('/Drinks', DrinkRoutes)
app.use('/Orders', OrderRoutes)
app.use('/Tables', TableRotues)

const server = http.createServer(app);


server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});