const Product = require('../models/products');

module.exports.getAllProducts = async (req,res,next) => {
    const name = req.query.name;
    try {
        let searchQuery = {};
        if (name) {
            searchQuery = {"name" :new RegExp(name, 'i')};
        }
        const products = await Product.find(searchQuery);
        res.status(200).json({ products: products });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.message = "Error when fetching products"
        next(err);
    }
}

module.exports.createProduct = async (req,res,next) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const category = req.body.category;
    try {
        const product = new Product({
          name,
          description,
          price,
          quantity,
          category
        });
        const result = await product.save();
        res.status(201).json({ message: 'Product created!', producId: result._id });
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        err.message = "Error when creating product!"
        next(err);
      }
}

module.exports.deleteAllProducts = async (req,res,next) => {
    try {
        await Product.deleteMany({});
        res.status(200).json({ message:"all products deleted" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.message = "Error when deleting products"
        next(err);
    }
}

module.exports.getProductById = async (req,res,next) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        res.status(200).json({ product: product });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.message = "Error when fetching product by id"
        next(err);
    }
}

module.exports.updateProductById = async (req,res,next) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const category = req.body.category;
    try {
        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            quantity,
            category
        }, { new: true });
        res.status(200).json({ product: product });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.message = "Error when updating product by id";
        next(err);
    }
}

module.exports.deleteProductById = async (req,res,next) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message:"product deleted" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        err.message = "Error when deleting product by id";
        next(err);
    }
}