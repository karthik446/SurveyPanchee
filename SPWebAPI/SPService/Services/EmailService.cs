using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;

namespace SPService.Services
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await ConfigSMTPasync(message);
        }

        private async Task ConfigSMTPasync(IdentityMessage message)
        {
            try
            {
                // Plug in your email service here to send an email.
            var credentialUserName = ConfigurationManager.AppSettings["emailId"].ToString();
            var sentFrom = ConfigurationManager.AppSettings["emailId"].ToString();
            var pwd = ConfigurationManager.AppSettings["password"].ToString();

            // Configure the client:
            var mailClient = ConfigurationManager.AppSettings["SMTP"].ToString();
            System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient(mailClient);

            // Creatte the credentials:
            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(credentialUserName, pwd);

            client.Port = 587;
            client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.EnableSsl = false;
            client.UseDefaultCredentials = false;
            client.Credentials = credentials;

            // Create the message:
            var mail = new System.Net.Mail.MailMessage(sentFrom, message.Destination);
            mail.Subject = message.Subject;
            mail.Body = message.Body;
            mail.IsBodyHtml = true;
           
                await client.SendMailAsync(mail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}