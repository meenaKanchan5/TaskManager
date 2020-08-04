// // // const sgMail = require('')
// // // const sendgridAPIKey = "9a7d77bbd9386484c849f3f22a85c53d-us17"
// // // const sendgridAPIKey =
// // const request = require('superagent');


// // const mailchimpInstance   = 'us17',
// //     listUniqueId        = '8dec817664',
// //     mailchimpApiKey     = '9a7d77bbd9386484c849f3f22a85c53d-us17';

// // app.post('/signup', function (req, res) {
// //     request
// //         .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
// //         .set('Content-Type', 'application/json;charset=utf-8')
// //         .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
// //         .send({
// //           'email_address': req.body.email,
// //           'status': 'subscribed',
// //           'merge_fields': {
// //             'FNAME': req.body.firstName,
// //             'LNAME': req.body.lastName
// //           }
// //         })
// //             .end(function(err, response) {
// //               if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
// //                 res.send('Signed Up!');
// //               } else {
// //                 res.send('Sign Up Failed :(');
// //               }
// //           });
// // });




// // // const Mailchimp = require('mailchimp-api-v3')

// // // const mailchimp = new Mailchimp('9a7d77bbd9386484c849f3f22a85c53d-us17');
// // // mailchimp.send(
// // //     {

// // //     }
// // // )