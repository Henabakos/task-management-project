const { body, validationResult } = require("express-validator");

const validateAuth = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateTask = [
  body("title").notEmpty().withMessage("Task title is required"),
  body("assignee").notEmpty().withMessage("Assignee ID is required"),
  body("dueDate").isISO8601().withMessage("Due date must be a valid date"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateAuth, validateTask };
