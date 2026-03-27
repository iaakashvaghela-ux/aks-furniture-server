const { default: mongoose } = require("mongoose");


const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
     
      match: [/^[a-zA-Z ]{2,50}$/, "please fill correct value"]

    },
    image: String,

    email: {
      type: String,
     
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
     
    },

    gender: {
      type: Number,
      enum: ["1", "2"],
      default: 1
    },
    companyLogo: String,
    companyName: String,
    companyAddress: String,
    companyPhone: String,
    companyEmail: String,
    companyMap: String,
    companyInstagram: String,
    companyFacebook: String,
    companyTwitter: String,
    companyLinkedin: String,

   
  },
  {
    timestamps: true,
  }
)


let adminModel = mongoose.model("admin", adminSchema)

module.exports = adminModel