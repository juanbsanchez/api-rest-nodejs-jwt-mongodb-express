import Product from '../models/Product';

// CREATE PRODUCT
export const createProduct = async (req, res) => {
    const {name, category, price, imgURL} = req.body
    const newProduct = new Product({
        name,
        category,
        price,
        imgURL,
    });
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
}

// GET PRODUCTS
export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}

// GET PRODUCT BY ID
export const geteProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId)
    res.status(200).json(product);
}

// UPDATE PRODUCT
export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true //return updated product
    });
    res.status(200).json(updatedProduct);
}

// DELETE PRODUCT
export const deleteProductById = async (req, res) => {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(204).json();
}