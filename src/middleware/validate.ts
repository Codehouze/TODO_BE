const { check } = require("express-validator");

const validator = {
 
  todoValidator: [check("title").notEmpty().withMessage("Title is Required")],
};
export default validator;