const Product = require("../model/createProductModel");
const validationErrorMsg = require("../config/validationErrorMsg");
const { validationResult } = require("express-validator");
const Cloudinary = require("cloudinary");

// product content upload
exports.createProduct = async (req, res, next) => {
  const error = validationResult(req).formatWith(validationErrorMsg);
  if (!error.isEmpty()) {
    return res.json({
      error: error.mapped(),
    });
  }
  try {
    const product = await new Product(req.body);
    const createdProduct = await product.save();
    if (createdProduct) {
      res.status(201).json({
        success: "Product created successfully",
      });
    }
    if (!createdProduct) {
      res.status(500).json({
        wrong: "Product created failed !",
      });
    }
  } catch (error) {
    next(error);
  }
};
// update product
exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = req.body;
  const oldImagePublic_id = product.productImage.map((item) => item.public_id);
  try {
    const data = {
      name: req.body.name,
      category: req.body.category,
      unit: req.body.unit,
      weight: req.body.weight,
      tag: req.body.tags,
      price: req.body.price,
      stock: req.body.stock,
      discount: req.body.discount,
      discountType: req.body.discountType,
      sku: req.body.sku,
      description: req.body.description,
      status: req.body.status,
    };
    if (req.body.images) {
      data.productImage = req.body.images;
      await Cloudinary.v2.api.delete_resources(oldImagePublic_id);
    }
    if (!req.body.images) {
      data.productImage = req.body.productImage;
    }
    const updateProduct = await Product.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (updateProduct) {
      return res.json({
        success: "Product was updated",
      });
    }
  } catch (error) {
    next(error);
  }
};
// delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const deleteProduct = await Product.deleteMany({
      _id: { $in: [req.params.id] },
    });
    const publicId = product.productImage.map((item) => item.public_id);
    await Cloudinary.v2.api.delete_resources(publicId);
    if (deleteProduct && publicId) {
      return res.json({
        data: product,
        success: "Product was deleted",
      });
    }
  } catch (error) {
    next(error);
  }
};

// get product
exports.getProduct = async (req, res, next) => {
  const product = await Product.find({}).sort({ _id: -1 });
  if (product) {
    return res.status(200).json(product);
  }
};

exports.getProductBySearchFilter = async (req, res, next) => {
  try {
    const { min, max, category, page, limit, keyword } = req.body;
    const skip = parseInt((page - 1) * limit);
    const options = {
      page: page,
      limit: limit,
      skip: skip,
    };
    let products = [];
    if (category && category.length > 0) {
      let newItem = category.map((item) => item);
      products.push({
        $match: { category: { $in: newItem } },
      });
    }
    if ((min && min > 0) || (max && max <= 100)) {
      if (min) {
        products.push({ $match: { price: { $gte: min } } });
      }
      if (max) {
        products.push({ $match: { price: { $lte: max } } });
      }
    }
    if (keyword && keyword !== "") {
      products.push({ $match: { tags: { $regex: keyword } } });
    }
    let aggQuery = Product.aggregate(products);
    let pd = await Product.aggregatePaginate(aggQuery, options);
    res.json({
      pd,
    });
  } catch (error) {
    next(error);
  }
};

// get product by search query
exports.getProductBySearch = async (req, res, next) => {
  const type = req.body.text.toLowerCase();
  try {
    let products = await Product.find({
      name: { $regex: type, $options: ["i"] },
    });
    return res.json({ products });
  } catch (error) {
    next(error);
  }
};

// get product orderby
exports.list = async (req, res, next) => {
  try {
    const { sort, order, limit } = req.body;
    const products = await Product.find({})
      .sort([[sort, order]])
      .limit(limit);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
