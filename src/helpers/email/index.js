import Handlebars from "handlebars";
import AWS from "aws-sdk";
AWS.config.region = "eu-west-1";
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
});

export const ses = new AWS.SES();

export function sendEmail(deal, template) {
  let formatTemplate = Handlebars.compile(template);
  let formattedTemplate = formatTemplate(deal);

  // const {email, cc_email} = deal;
  const email = "kash.karimi@gmail.com";
  const cc_email = "kash.karimi@gmail.com";
  // TODO: Support text emails
  return ses
    .sendEmail({
      Destination: {
        BccAddresses: [cc_email],
        CcAddresses: [],
        ToAddresses: [email]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: formattedTemplate
          },
          Text: {
            Charset: "UTF-8",
            Data: formattedTemplate
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: `CYF - Welcome ${deal.name}!`
        }
      },
      Source: "mentors@codeyourfuture.io"
    })
    .promise();
}
