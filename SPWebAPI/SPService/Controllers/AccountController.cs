using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using SPService.Models;
using SPService.Providers;

namespace SPService.Controllers
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private const string LocalLoginProvider = "Local";
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            UserManager = userManager;
            AccessTokenFormat = accessTokenFormat;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

        //GET api/Account/UserInfo
       [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
       [Route("UserInfo")]
        public UserInfoViewModel GetUserInfo()
        {
            ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            return new UserInfoViewModel
            {
                Email = User.Identity.GetUserName(),
                HasRegistered = externalLogin == null
            };
        }

        // POST api/Account/Logout
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return Ok();
        }

        // GET api/Account/ManageInfo?returnUrl=%2F&generateState=true
        [Route("ManageInfo")]
        public async Task<ManageInfoViewModel> GetManageInfo(string returnUrl, bool generateState = false)
        {
            IdentityUser user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

            if (user == null)
            {
                return null;
            }
            return new ManageInfoViewModel
            {
                LocalLoginProvider = LocalLoginProvider,
                Email = user.UserName,
            };
        }
        [AllowAnonymous]
        [Route("ForgotPassword")]
        public async Task<IHttpActionResult> ForgotPassword(EmailRequestViewModel model)
        {
            var user = await this.UserManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                ModelState.AddModelError("", "Invalid email.");
                return BadRequest(ModelState);
            }
            var isEmailConfirmed = await this.UserManager.IsEmailConfirmedAsync(user.Id);

            if (!isEmailConfirmed)
            {
                ModelState.AddModelError("", "Please confirm your e-mail to login.");
                return BadRequest(ModelState);
            }

            await GeneratePasswordResetMail(user, model.EmailUrl);
            return Ok();
        }


        private async Task GeneratePasswordResetMail(ApplicationUser user, string conformationEmailUrl)
        {
            string code = await this.UserManager.GeneratePasswordResetTokenAsync(user.Id);
            //Always URL encode the code and do urldecode in confirm email.
            var callbackUrl = conformationEmailUrl + "?userId=" + HttpUtility.UrlEncode(user.Id) + "&code=" + HttpUtility.UrlEncode(code);
            var message = "Please re-set your account password by copy pasing following url in your browser <a href=\""
                + callbackUrl + "\">" + callbackUrl + "</a>";
            const string subject = "Password re-set";
            await this.UserManager.SendEmailAsync(user.Id, subject, message);
        }

        // POST api/Account/ChangePassword
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword,
                model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/SetPassword
        [Route("SetPassword")]
        public async Task<IHttpActionResult> SetPassword(SetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.Identity.GetUserId();
            IdentityResult result = await UserManager.AddPasswordAsync(userId, model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        [AllowAnonymous]
        [Route("ResetPassword", Name = "ResetPassword")]
        public async Task<IHttpActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            IdentityResult validPasswordResult = await UserManager.PasswordValidator.ValidateAsync(model.Password);
            if (!validPasswordResult.Succeeded)
            {
                return GetErrorResult(validPasswordResult);
            }
            if (string.IsNullOrWhiteSpace(model.UserId) || string.IsNullOrWhiteSpace(model.Code))
            {
                ModelState.AddModelError("", "User Id and Code are required");
                return BadRequest(ModelState);
            }

            var decodedUserId = HttpUtility.UrlDecode(model.UserId);
            var decodedCode = HttpUtility.UrlDecode(model.Code);
            decodedCode = decodedCode?.Replace(" ", "+");
            IdentityResult result = await this.UserManager.ResetPasswordAsync(decodedUserId, decodedCode, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return GetErrorResult(result);
            }
        }


        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(RegisterBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser() { UserName = model.Email, Email = model.Email, JoinDate = DateTime.Today};
            try
            {
                IdentityResult result = await UserManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
   
            await GenerateEmailConformationMail(user, model.ConformationEmailUrl);
            return Ok();
        }

        private async Task GenerateEmailConformationMail(ApplicationUser user, string conformationEmailUrl)
        {

            var code = await this.UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
            //Always URL encode the code and do urldecode in confirm email.
            var callbackUrl = conformationEmailUrl + "?userId=" + HttpUtility.UrlEncode(user.Id) + "&code=" + HttpUtility.UrlEncode(code);
            var message = "Please confirm your account by copy pasing following url in your browser <a href=\""
                + callbackUrl + "\">" + callbackUrl + "</a>";
            const string subject = "please confirm your email";
            await this.UserManager.SendEmailAsync(user.Id, subject, message);
        }


        [AllowAnonymous]
        [Route("ConfirmEmail", Name = "ConfirmEmailRoute")]
        public async Task<IHttpActionResult> ConfirmEmail(EmailResponseViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.UserId) || string.IsNullOrWhiteSpace(model.Code))
            {
                ModelState.AddModelError("", "User Id and Code are required");
                return BadRequest(ModelState);
            }
            var decodedUserId = HttpUtility.UrlDecode(model.UserId);
            var decodedCode = HttpUtility.UrlDecode(model.Code);
            decodedCode = decodedCode?.Replace(" ", "+");
            var isEmailConfirmed = await UserManager.IsEmailConfirmedAsync(decodedUserId);
            if (isEmailConfirmed)
            {
                ModelState.AddModelError("", "Email already confirmed, Please login");
                return BadRequest(ModelState);
            }
            IdentityResult result = await this.UserManager.ConfirmEmailAsync(decodedUserId, decodedCode);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return GetErrorResult(result);
            }
        }

        [AllowAnonymous]
        [Route("ResendEmailConf")]
        public async Task<IHttpActionResult> ResendEmailConformation(EmailRequestViewModel model)
        {
            var user = await this.UserManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                ModelState.AddModelError("", "No user exists with this email");
                return BadRequest(ModelState);
            }

            bool isEmailConfirmed = await UserManager.IsEmailConfirmedAsync(user.Id);
            if (isEmailConfirmed)
            {
                ModelState.AddModelError("", "Email Confirmed, Please login");
                return BadRequest(ModelState);
            }

            await GenerateEmailConformationMail(user, model.EmailUrl);

            return Ok();
        }

        // POST api/Account/RemoveLogin
        [Route("RemoveLogin")]
        public async Task<IHttpActionResult> RemoveLogin(RemoveLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result;

            if (model.LoginProvider == LocalLoginProvider)
            {
                result = await UserManager.RemovePasswordAsync(User.Identity.GetUserId());
            }
            else
            {
                result = await UserManager.RemoveLoginAsync(User.Identity.GetUserId(),
                    new UserLoginInfo(model.LoginProvider, model.ProviderKey));
            }

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

     

        #region Helpers

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }


        private class ExternalLoginData
        {
            public string LoginProvider { get; set; }
            public string ProviderKey { get; set; }
            public string UserName { get; set; }

            public IList<Claim> GetClaims()
            {
                IList<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider));

                if (UserName != null)
                {
                    claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
                }

                return claims;
            }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)
                {
                    return null;
                }

                Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer)
                    || String.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name)
                };
            }
        }

        private static class RandomOAuthStateGenerator
        {
            private static RandomNumberGenerator _random = new RNGCryptoServiceProvider();

            public static string Generate(int strengthInBits)
            {
                const int bitsPerByte = 8;

                if (strengthInBits % bitsPerByte != 0)
                {
                    throw new ArgumentException("strengthInBits must be evenly divisible by 8.", "strengthInBits");
                }

                int strengthInBytes = strengthInBits / bitsPerByte;

                byte[] data = new byte[strengthInBytes];
                _random.GetBytes(data);
                return HttpServerUtility.UrlTokenEncode(data);
            }
        }

        #endregion
    }
}
