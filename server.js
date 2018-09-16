var express = require('express');
var app = express();
var morgan = require('morgan');
// var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var nodemailer = require('nodemailer');
var multer = require('multer');

//cross origin
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST,PUT,OPTIONS,DELETE,GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With");
    next();
});


// CONFIGURATION
app.use(express.static(__dirname + '/public'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', 'extended': 'true' }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));



var transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "codestacks97@gmail.com",
        pass: "elearning123"
    }

});

// API FOR SENDING MAIL FROM CODESTACKS

app.post('/api/sentmail', function(req, res) {
    // var msg = {
    //     html: "<b>hello this is codestacks</b><p>mail sent api working</p>",
    //     createTextFromHtml: true,
    //     from: "ritikvverma@gmail.com",
    //     to: req.params.id,
    //     subject: "nodemail credentials"
    // };

    // var msg = {
    //     html: req.params.body,
    //     createTextFromHtml: true,
    //     from: "codestacks97@gmail.com",
    //     to: req.params.id,
    //     subject: req.params.subject
    // };

    var msg = {
        html: req.body.text,
        createTextFromHtml: true,
        from: "codestacks97@gmail.com",
        to: req.body.email,
        subject: req.body.subject
    };
    console.log("1");

    transport.sendMail(msg, function(err) {
        if (err) {
            res.send("failed");
            console.log(err);
            return
        }
        return res.json({ "successMessage": "Credentials has been sent" });

    });
});

app.listen(process.env.PORT || 3000, function() { console.log("app listening on 3000"); });