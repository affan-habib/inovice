const fs = require("fs");
const Category = require("../model/categoryModel");
const Cloudinary = require("cloudinary");
exports.categoryCreate = async (req, res, next) => {
  try {
    // upload image to cloudinary
    const image = await Cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "category-images",
    });
    // category create
    const cate = await new Category({
      category: req.body.category,
      image: image.url,
      public_id: image.public_id,
    });
    const createdCategory = await cate.save();
    if (createdCategory) {
      fs.unlinkSync(req.file.path);
      return res.json({
        data: createdCategory,
        success: "Category created successfully",
      });
    }
    if (!createdCategory) {
      return res.json({
        error: "Category created failed !",
      });
    }
  } catch (error) {
    next(error);
  }
};
// category update controller
exports.categoryUpdate = async (req, res, next) => {
  const { id } = req.params;
  try {
    // if (req.params.id) {
    // category update
    const category = await Category.findOne({ _id: id });
    // delete image from cloudinary
    if (req.body.image || req.file.path) {
      await Cloudinary.v2.api.delete_resources(category.public_id);
    }
    // upload image to cloudinary
    const result = await Cloudinary.v2.uploader.upload(
      req.body.image || req.file.path,
      {
        resource_type: "auto",
        folder: "category-images",
      }
    );
    const data = {
      category: req.body.category || category.category,
      image: result.url || category.image,
      public_id: result.public_id || category.public_id,
    };
    const categoryUpdate = await Category.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (categoryUpdate) {
      fs.unlinkSync(req.file.path);
      return res.json({
        data: categoryUpdate,
        success: "Category update successfully !",
      });
    }
    if (!categoryUpdate) {
      return res.json({
        wrong: "Category update failed !",
      });
    }
    // }
  } catch (error) {
    next(error);
  }
};
// category delete controler
exports.categoryDelete = async (req, res, next) => {
  try {
    // delete from database
    const category = await Category.findByIdAndDelete(req.params.id);
    // delete image from cloudinary
    const delImage = await Cloudinary.v2.api.delete_resources(
      category.public_id
    );
    if (category && delImage) {
      return res.json({
        data: category,
        success: "Category Deleted",
      });
    }
  } catch (error) {
    next(error);
  }
};
// category get controller
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    if (category) {
      return res.json(category);
    }
  } catch (error) {
    next(error);
  }
};
