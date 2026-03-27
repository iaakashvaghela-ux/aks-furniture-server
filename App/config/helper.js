var slugify = require('slugify');
const nodemailer = require("nodemailer");
const adminModel = require('../model/adminModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createSlug = (name) => {
  return slugify(name, {
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 'vi',      // language code of the locale to use
    trim: true         // trim leading and trailing replacement chars, defaults to `true`
  });
}

exports.transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: `priyaraj0890@gmail.com`,
    pass: `yyyxlijyenixdbfm`,
  },
});


exports.adminCreate = async () => {

  let admin = await adminModel.find();
  hash = bcrypt.hashSync("password123", saltRounds)
  if (admin.length === 0) {
    adminModel.create({
      email: "admin@example.com",
      password: hash
    })
  }


}