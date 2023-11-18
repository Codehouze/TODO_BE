const { check } = require("express-validator");

const validator = {
  signupValidator: [
    check("email")
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .withMessage("Email is required"),

    check("password")
      .isLength({ min: 6 })
      .withMessage(
        "Password are required and must be longer than 6 characters"
      ),
  ],
  todoValidator: [check("title").notEmpty().withMessage("Title is Required")],
};
export default validator;
