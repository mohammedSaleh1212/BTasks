const Joi = require('joi')
const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // trim: true,
        minLength: 2,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: false
    },
    subject: {
        type: String,
        required: false,
        minLength: 5,
        maxLength: 200,
        // trim: true
    },
    message: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 200


    },
    contactType: {
        type: String,
        required: true,
        enum: ['Job Seeker', 'Service Inquiry', 'Other'],
        default: 'Other'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})


const Contact = mongoose.model('Contact', contactSchema)
function validateContact(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).trim().required(),
        email: Joi.string().min(5).max(255).email().trim().required().custom((value, helpers) => {
            const allowedDomains = ['gmail.com', 'outlook.com','yahoo.com','icloud.com','hotmail.com'];
            const domain = value.split('@')[1];
            if (!allowedDomains.includes(domain)) {
                return helpers.error('any.invalid');
            }
            return value;
        }),

        subject: Joi.string().min(5).max(25).trim(),
        message: Joi.string().min(5).max(255).trim().required(),
        contactType: Joi.string().valid('Job Seeker', 'Service Inquiry', 'Other').required(),
        createdAt: Joi.date().optional(),

    })
    return schema.validate(user)

}


exports.Contact = Contact
exports.validate = validateContact
