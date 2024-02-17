const {
  userEmailChekRegex,
  isEmailOnDb,
} = require("../helpers/user/userEmailCheck");

const useField = require("../helpers/user/userFieldCheck");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const otpGenerator = require("otp-generator");
const sendMail = require("../helpers/user/sendMail");
const verifyTemplate = require("../helpers/user/verifyTemplate");

const createIdControllers = async (req, res) => {
  const { name, email, password } = req.body;
  const isInpData = useField(name, email, password, req.path);

  if (isInpData.name || isInpData.email || isInpData.pass) {
    res.status(400).send(isInpData);
  } else {
    if (userEmailChekRegex(email)) {
      const isAccount = await isEmailOnDb(email);

      if (!isAccount) {
        bcrypt.hash(password, 10, async (err, hash) => {
          const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
          });

          let data = new userModel({
            name,
            email,
            password: hash,
            otpForVerify: otp,
          });
          data = await data.save();
          data = data.toObject();
          delete data.password;
          delete data.otpForVerify;
          sendMail(data.email, data.otpForVerify, verifyTemplate);
          res.send(data);
        });
      } else {
        res.status(422).send("you have allready an account");
      }
    } else {
      res.status(400).send("invalid email");
    }
  }
};

const loginIdControllers = async (req, res) => {
  const { email, password } = req.body;

  const isInpData = useField("", email, password);


  if (isInpData.email || isInpData.pass) {
    res.status(400).send(isInpData);
  } else {
    if (userEmailChekRegex(email)) {
      let data = await userModel.findOne({ email: email });
      console.log(Boolean(data));
      if (data) {
        bcrypt.compare(password, data.password, function (err, result) {
          // result == true          console.log(result);
          if (result) {
            data = data.toObject();
            delete data.password;
            res.send(data);
          } else {
            res.status(422).send("invalid password");
          }
        });
      } else {
        res.status(401).send("invalid user");
      }
    } else {
      res.status(400).send("invalid email");
    }
  }
};

module.exports = { createIdControllers, loginIdControllers };
