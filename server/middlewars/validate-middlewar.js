const { Schema } = require("zod");




const validate = (Schema) => async(req, res, next) => {

    try {

        const parseBody = await Schema.parseAsync(req.body);
        req.body = parseBody;
        next();

    } catch (err) {
        const extraDetails = err.errors[0].message;
        const message = 'Fill the input properly';
        const status = 422;
        const error = {
            status,
            message,
            extraDetails
        };
        // res.status(400).json({ msg: message })
        next(error);
    }
};

module.exports = validate;