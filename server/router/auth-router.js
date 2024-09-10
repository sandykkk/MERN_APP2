const express = require('express');

const router = express.Router();

// const { home, register } = require("../controllers/auth-controller");
// or
const authcontrollers = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require('../validators/auth-validator');
const validate = require('../middlewars/validate-middlewar');
const authMiddleware = require('../middlewars/auth-middleware');

// router.get("/", (req, res) => {

//     res.status(200).send("get mathed using router")
// });

// OR

// router.route("/").get((req, res) => {

//     res.status(200).send("work in  router and this is home page")
// });
router.route("/").get(authcontrollers.home);

// router.route('/register').get((req, res) => {
//     res.status(200).send("work in router using router and this is register page ")

// });
router.route("/register").post(validate(signupSchema), authcontrollers.register);
router.route("/login").post(validate(loginSchema), authcontrollers.login);
router.route("/user").get(authMiddleware, authcontrollers.user);


module.exports = router;