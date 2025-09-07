var mongoose = require('mongoose');

const contactModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Contact name is required"],
            trim: true,
            default: null,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email"],
        },
        contact: {
            type: Number,
            required: [true, "Contact No is required"],
            validate: {
                validator: function (value) {
                    return Number(value).toString().length >= 10;
                },
                message: "Mobile number should be of 10 digits.",
            },
        },
        subject: {
            type: String,
            default: null,
        },
        message: {
            type: String,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("contact", contactModel);
