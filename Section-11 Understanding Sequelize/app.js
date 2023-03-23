const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

//Associations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

User.hasMany(Product);
User.hasOne(Cart);

Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });

Product.belongsToMany(Cart, { through: CartItem });

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  //---> middleware
  User.findByPk(1) //---> incoming reqs are handled through middlewares
    .then((user) => {
      req.user = user;
      next(); //---> calling next middleware
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync() //sync({force: true})
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Dhanraj", email: "dhanraj@sequelize.com" });
    }
    // return Promise.resolve(user);
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .then((user) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
