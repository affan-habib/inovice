const { check } = require("express-validator");
module.exports = [
  check("category").not().isEmpty().withMessage("Category is required"),
  check("image").not().isEmpty().custom((value,{req})=>{
    if(req.file.mimetype === 'image/pdf'){
      return ".pdf"
    }
    return true
  }).withMessage("submit a valid format")
];
