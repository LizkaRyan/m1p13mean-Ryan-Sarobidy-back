const Product = require('../models/product/Product');
const { productSchema, patchProductSchema } = require('../validators/product-validator');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('shopId', 'name');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

const getProductsByShopId = async (req, res) => {
    try {
        const { shopId } = req.params;
        const products = await Product.find({ shopId }).populate('shopId', 'name');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('shopId', 'name');
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

const save = async (req, res) => {
    try {
        await productSchema.validate(req.body, { abortEarly: false });
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({
            message: 'Validation échouée',
            errors: err.errors
        });
    }
};

const patch = async (req, res) => {
    try {
        await patchProductSchema.validate(req.body, { abortEarly: false });
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true, setDefaultsOnInsert: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

module.exports = { getAllProducts, getProductsByShopId, getProductById, save, patch, remove };