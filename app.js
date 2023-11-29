const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv/config');

app.use(cors())
app.options('*',cors())


//Middleware(this method will make our Data be understandable by express which are sent from the frontend)
app.use(bodyParser.json());
app.use(morgan('tiny'));


//Routers(for every collection)
const categoriesRouter = require('./routers/categories')
const productsRouter = require('./routers/products')
const userRoutes = require('./routers/users')
const ordersRoutes = require('./routers/orders')





const api = process.env.API_URL;

app.use(`${api}/categories`,categoriesRouter)
app.use(`${api}/products`,productsRouter)
app.use(`${api}/users`,userRoutes)
app.use(`${api}/orders`,ordersRoutes)


mongoose
  .connect(
    "mongodb+srv://idrisd:gofore4fgH@cluster0.nkt5pth.mongodb.net/?retryWrites=true&w=majority",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName:'eshop-database'
    }
  )
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(api);
  console.log("server is running http://localhost:3000");
});
