const { default: mongoose } = require("mongoose");


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please fil the value"],
      match: [/^[a-zA-Z ]{2,50}$/, "please fill correct value"]

    },
    image: String,

    email: {
      type: String,
      required: [true, "please fil the value"],
      validate: {
        validator: async function (v) {
          const email = await this.constructor.findOne({ email: v, deleted_at: null });
          return !email;
        },
        message: props => `The specified email is already in use.`
      }

    },
    phone: {
      type: String,
      required: [true, "please fil the value"],
      validate: {
        validator: async function (v) {
          const phone = await this.constructor.findOne({ phone: v, deleted_at: null });
          return !phone;
        },
        message: props => `The specified email is already in use.`
      }
    },
    password: {
      type: String,
      required: [true, "please fil the value"],
    },

    gender: {
      type: Number,
      enum: ["1", "2"],
      default: 1
    },


    status: {
      type: Boolean,
      default: true
    },
    created_at: {
      type: Date,
      default: Date.now()
    },
    updated_at: {
      type: Date,
      default: Date.now()
    },
    deleted_at: {
      type: Date,
      default: null
    },
  }
)


let userModel = mongoose.model("user", userSchema)

module.exports = userModel