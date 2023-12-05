const nodemailer = require("nodemailer");
const ejs = require("ejs");
const {convert} = require("html-to-text");


const generateHTML = (filename, options = {}) => {
  
    var html = "";
  
    ejs.renderFile(`${__dirname}/../../views/email/${filename}.ejs`, { mail_data: options.data }, {}, (err, str) => {
      if (err) {
        console.log(err)
      } else {
        html = str;
      }
    })
    return html;
  };
  
  exports.send = options => {
  
    // console.log("options------------------------------",options,email,process.env.EMAIL_HOST);
  
    const html = generateHTML(options.filename, options);
    const text = convert(html);
  
    const mailOptions = {
      from: "Divam@gmail.com",
      to: options.user.email,
      subject: options.subject,
      text,
      html,
    };
  
   
  
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  
    // console.log("mailOptions::::",mailOptions)
    return transport.sendMail(mailOptions);
  };