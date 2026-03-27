const bcrypt = require('bcrypt');
const userModel = require('../../model/userModel');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const { transporter } = require('../../config/helper');
const nodemailer = require("nodemailer");


const authCreate = async (req, res) => {

  let { password, name, email, phone } = req.body;


  try {
    const hash = bcrypt.hashSync(password, saltRounds);
    let insertobj = {
      password: hash,
      name, email, phone
    }

    let user = await userModel.insertOne(insertobj);

    let obj = {
      _status: true,
      _message: "User created",
      user
    }
    res.send(obj);
  }
  catch (err) {
    let errors = []
    for (const key in err.errors) {
      const loopObj = {}
      loopObj[key] = err.errors[key].message
      errors.push(loopObj)
    }
    let obj = {
      _status: false,
      // _message: err,
      errors
    }
    res.send(obj);
  }

  // bcrypt.compareSync(password, hash);

  // res.send("hiii")
}



let login = async (req, res) => {
  let { email, password } = req.body;

  let userData = await userModel.findOne({ email });

  if (userData) {
    if (bcrypt.compareSync(password, userData.password)) {
      let token = jwt.sign({ userId: userData._id }, process.env.TOKENKEY)
      let obj = {
        _status: true,
        _message: "login successfull.... ",
        token
      }


      res.send(obj);
    } else {
      let obj = {
        _status: false,
        _message: "invalid password.... ",
      }
      res.send(obj);
    }
  } else {
    let obj = {
      _status: false,
      _message: "user not exist ",

    }
    res.send(obj);
  }
}



// let changePassword = async (req, res) => {
//   let { currentPassword, newPassword } = req.body;
//   let token = Headers.authorization.split(" ")[1];
//   let deCode = jwt.decode(token, process.env.TOKENKEY);
//   let { userId } = jwt.decode;

//   let userData = await userModel.findOne({ _id: userId });
//   const hash = bcrypt.hashSync(newPassword, saltRounds);

//   if (bcrypt.compareSync(currentPassword, userData.password)) {
//     await userModel.updateOne(
//       {
//         _id: userId
//       },
//       {
//         $set: {
//           password: hash
//         }
//       }
//     )

//     let obj = {
//       _status: true,
//       _message: "password change successfully.... ",
//     }
//     res.send(obj);
//   } else {
//     let obj = {
//       _status: false,
//       _message: "invalid old password.... ",
//     }
//     res.send(obj);
//   }


// }


let changePassword = async (req, res) => {
  try {
    let { currentPassword, newPassword } = req.body;

    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.send({
        _status: false,
        _message: "Token missing",
      });
    }

    // verify token
    let decoded = jwt.verify(token, process.env.TOKENKEY);
    let userId = decoded.userId;

    // find user
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.send({
        _status: false,
        _message: "User not found",
      });
    }

    // check old password
    let isMatch = await bcrypt.compare(currentPassword, userData.password);
    if (!isMatch) {
      return res.send({
        _status: false,
        _message: "Invalid old password",
      });
    }

    // hash new password
    const hash = await bcrypt.hash(newPassword, 10);

    // update password
    await userModel.updateOne(
      { _id: userId },
      { $set: { password: hash } }
    );

    res.send({
      _status: true,
      _message: "Password changed successfully",
    });

  } catch (error) {
    console.log(error);
    res.send({
      _status: false,
      _message: "Something went wrong",
    });
  }
};

let forgotPassword = async (req, res) => {
  let { email } = req.body;
  let userData = await userModel.findOne({ email });

  if (userData) {

    try {
      const info = await transporter.sendMail({
        from: '"akscart" <priyaraj0890@gmail.com>', // sender address
        to: email, // list of recipients
        subject: "Reset Your Password",
        // subject line
        text: "Hello world?", // plain text body
        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
                    </head>
                    <body>
                      <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
                      <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:10px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">

                        <h2 style="text-align:center; color:#333;">🔐 Reset Your Password</h2>

                        <p style="font-size:16px; color:#555;">
                          Hey there 👋,<br><br>
                          We received a request to reset your password. Click the button below to set a new password.
                        </p>

                        <div style="text-align:center; margin:30px 0;">
                          <a href="http://localhost:3000/reset-password/${userData._id}"
                             style="background-color:#4CAF50; color:white; padding:14px 25px; text-decoration:none; border-radius:5px; font-size:16px; display:inline-block;">
                             Reset Password
                          </a>
                        </div>

                        <p style="font-size:14px; color:#777;">
                          This link will expire in <b>15 minutes</b> for security reasons.
                        </p>

                        <p style="font-size:14px; color:#777;">
                          If you didn’t request this, you can safely ignore this email.
                        </p>

                        <hr style="margin:20px 0;">

                        <p style="font-size:12px; color:#aaa; text-align:center;">
                          © 2026 Your Company. All rights reserved.
                        </p>
                      </div>
                    </div>
                    </body>
                    </html>`, // HTML body
      });

      console.log("Message sent: %s", info.messageId);
      // Preview URL is only available when using an Ethereal test account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
      console.error("Error while sending mail", err);
    }






    let obj = {
      _status: true,
      _message: "email sent successfully.... ",
    }
    res.send(obj);
  } else {
    let obj = {
      _status: false,
      _message: "email not exist.... ",
    }
    res.send(obj);
  }
}

let resetPassword = async (req, res) => {
  let { password: newPassword } = req.body;
  let { userId } = req.params;
  let userData = await userModel.findOne({ _id: userId });
  if (userData) {
    const hash = bcrypt.hashSync(newPassword, saltRounds);
    await userModel.updateOne(
      {
        _id: userId
      },
      {
        $set: {
          password: hash
        }
      }
    );

    let obj = {
      _status: true,
      _message: "Password reset successfully.... ",
    };
    res.send(obj);
  } else {
    let obj = {
      _status: false,
      _message: "Invalid user ID.... ",
    };
    res.send(obj);
  }
};

let getUser = async (req, res) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.send({
      _status: false,
      _message: "Token missing",
    });
  }

  try {
    let decoded = jwt.verify(token, process.env.TOKENKEY);
    let userId = decoded.userId;

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.send({
        _status: false,
        _message: "User not found",
      });
    }

    res.send({
      _status: true,
      _message: "User found",
      userData
    });

  } catch (error) {
    console.log(error);
    res.send({
      _status: false,
      _message: "Invalid token",
    });
  }
};

module.exports = { authCreate, login, forgotPassword, changePassword, resetPassword, getUser }