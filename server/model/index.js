const mongoose = require('mongoose');

const Address = require('./address.model')
const User = require('./user.model')
const CartProduct = require('./cartproduct.model')
const Category = require('./category.model')
const Order = require('./order.model')
const Product = require('./product.model')
const subCategory = require('./subCategory.model')
const Db = {};

Db.AddressModel = Address;
Db.UserModel = User;
Db.CartProductModel = CartProduct;
Db.CategoryModel = Category;
Db.OrderModel = Order;
Db.ProductModel = Product;
Db.SubCategoryModel = subCategory;



Db.connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("Connected successfully to MongoDB server"));
    }catch(error){
        next(error);
        process.exit();
    }
}

module.exports = Db;