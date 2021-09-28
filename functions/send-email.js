const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const { sessionId } = JSON.parse(event.body);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const customer = await stripe.customers.retrieve(session.customer);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
  });

  const send = (info) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await transporter.sendMail(info);
        resolve(result);
      } catch (error) {
        console.log(error);
      }
    });
  };
  var info = {
    from: '"Events Trolley" eventstrolleys@gmail.com', // sender address
    to: customer.email, // list of receivers
    subject: "Purchase Successful", // Subject line
    text: `Hello ${customer.name}`, // plain text body
    html: `
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <style type="text/css" media="screen">
            /* Linked Styles */
            body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#2e57ae; -webkit-text-size-adjust:none }
            a { color:#000001; text-decoration:none }
            p { padding:0 !important; margin:0 !important } 
            img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
            .mcnPreviewText { display: none !important; }
        </style>
    </head>
    <body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#2e57ae; -webkit-text-size-adjust:none;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#2e57ae">
            <tr>
                <td align="center" valign="top" class="container" style="padding:50px 10px;">
                    <!-- Container -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center">
                                <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                                    <tr>
                                        <td class="td" bgcolor="#ffffff" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                            <!-- Header -->
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                <tr>
                                                    <td class="p30-15-0" style="padding: 40px 30px 0px 30px;">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                        <tr>
                                                                            <td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://png.pngtree.com/template/20190903/ourmid/pngtree-party-event-logo-designs-inspiration-isolated-on-white-backgroun-image_300773.jpg" width="191" height="24" mc:edit="image_1" style="max-width:191px;" border="0" alt="" /></td>
                                                                        </tr>
                                                                    </table>
                                                                </th>
                                                                <th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;"></th>
                                                                <th class="column" width="120" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                        <tr>
                                                                            <td class="text-header right" style="color:#000000; font-family:'Fira Mono', Arial,sans-serif; font-size:12px; line-height:16px; text-align:right;"><div mc:edit="text_1"><a href="stripe-checkout-serveless-netlify.netlify.app" target="_blank" class="link" style="color:#000001; text-decoration:none;"><span class="link" style="color:#000001; text-decoration:none;">Online Shop</span></a></div></td>
                                                                        </tr>
                                                                    </table>
                                                                </th>
                                                            </tr>
                                                        </table>
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td class="separator" style="padding-top: 40px; border-bottom:4px solid #000000; font-size:0pt; line-height:0pt;">&nbsp;</td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- END Header -->

                                            <!-- Intro -->
                                            <div mc:repeatable="Select" mc:variant="Intro">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                    <tr>
                                                        <td class="p30-15" style="padding: 70px 30px 70px 30px;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="h2 center pb10" style="color:#000000; font-family:'Ubuntu', Arial,sans-serif; font-size:50px; line-height:60px; text-align:center; padding-bottom:10px;"><div mc:edit="text_2">Events Trolley Discounts <br /><strong>Summer</strong></div></td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="h5 center blue pb30" style="font-family:'Ubuntu', Arial,sans-serif; font-size:20px; line-height:26px; text-align:center; color:#2e57ae; padding-bottom:30px;"><div mc:edit="text_3">– 30% off any item in our shop!</div></td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="fluid-img pb40" style="font-size:0pt; line-height:0pt; text-align:left; padding-bottom:40px;"><img src="https://media.istockphoto.com/photos/row-of-books-on-a-shelf-multicolored-book-spines-stack-in-the-picture-id1222550815?b=1&k=20&m=1222550815&s=170667a&w=0&h=MTxBeBrrrYtdlpzhMpD1edwLYQf3OPgkNeDEgIzYJww=" width="590" height="300" mc:edit="image_2" style="max-width:590px;" border="0" alt="" /></td>
                                                                </tr>
                                                                <!-- Button -->
                                                                <tr mc:hideable>
                                                                    <td align="center">
                                                                        <table width="120" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="text-button" style="background:#ee817a; color:#ffffff; font-family:'Fira Mono', Arial,sans-serif; font-size:14px; line-height:18px; text-align:center; padding:12px;"><div mc:edit="text_4"><a href="stripe-checkout-serveless-netlify.netlify.app" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Shop Now</span></a></div></td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <!-- END Button -->
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="fluid-img img-center pb70" style="font-size:0pt; line-height:0pt; text-align:center;"><img src="images/separator.jpg" width="590" height="1" mc:edit="image_3" style="max-width:590px;" border="0" alt="" /></td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <!-- END Intro -->
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <!-- END Container -->
                </td>
            </tr>
        </table>
    </body>
    </html>`, // html body
  };
  await send(info);

  return {
    statusCode: 200,
    body: JSON.stringify({
      customer: customer,
    }),
  };
};
