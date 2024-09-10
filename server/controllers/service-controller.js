const Service = require('../models/service-model');

const services = async(req, res) => {
    try {
        const services = await Service.find();
        // Handle the case where no document was found
        if (!services.length) {
            res.status(404).json({ msg: 'No service found' });
            return;
        }
        res.status(200).json({ msg: services });
    } catch (error) {
        console.log(`Error from the server ${error}`);
    }
};

module.exports = services;