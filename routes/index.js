const express = require('express');
const fileUpload = require('express-fileupload');
const nodemailer = require("nodemailer");
const config = require("config");
const EMAIL = config.get('EMAIL');
const PASSWORD = config.get('PASSWORD');


const User = require('../models/user')

const app = express();

app.use('/public', express.static(__dirname + '/public'));

app.use(fileUpload());


app.post('/upload', (req, res, next) => {
  let image = req.files.image;
  let pdf = req.files.pdf;
  let sig = req.files.sig;
  const imageDetails = new User({
    firstname: req.body.firstname + '@vchamp.com',
    mobile: req.body.mobile,
    email: req.body.email,
    image: image.name,
    sig: sig.name,
    pdf: pdf.name,
    imagepath: image.tempFilePath
  })
  req.files.image.mv(`./client/public/images/${req.files.image.name}`, function (err) {
    if (err) {
      return res.status(500).json({ msg: 'something Error' });
    }
  })
  req.files.sig.mv(`./client/public/images/${req.files.sig.name}`, function (err) {
    if (err) {
      return res.status(500).json({ msg: 'something Error' });
    }
  })
  req.files.pdf.mv(`./client/public/images/${req.files.pdf.name}`, function (err) {
    if (err) {
      return res.status(500).json({ msg: 'something Error' });
    }
  })
  imageDetails.save((err, document) => {
    if (err) throw err
    
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD
      }
    })
    let mailOption = {
      from: 'no-reply@gmail.com',
      to: req.body.email,
      subject: 'Registration',
      html: '<h3>Welcome to Domestic India</h3>'
    }
    transport.sendMail(mailOption, function(error, data){
      if (error) {
        console.log('something Error ', error);
      }else{
        console.log('Email send compolet Done');
      }
    })
    res.status(200).json({ Data: imageDetails })
    console.log(document);

  })
});

// @route    GET pan/pans
// @desc     Get all pans
// @access   Private
app.get('/data', async (req, res) => {
  try {
    const pans = await User.find().sort({ data: -1 });
    res.json(pans)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
});



module.exports = app;
