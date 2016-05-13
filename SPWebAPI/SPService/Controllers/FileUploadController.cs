using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Mvc;
using Google.Apis.Download;
using Google.Apis.Drive.v3;
using Google.Apis.Drive.v3.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using SPService.Models;

namespace SPService.Controllers
{
    public class FileUploadController : ApiController
    {
        static string[] scopes = { DriveService.Scope.DriveReadonly };
        static string applicationName = "Drive API";

        //public async Task<IHttpActionResult> GetAllFiles()
        //{
        //    #region old code

        //    String serviceAccountEmail = "keytest@testingdrive-1301.iam.gserviceaccount.com";
        //    string pathKey = HostingEnvironment.MapPath(@"~/key.p12");
        //    var certificate = new X509Certificate2(pathKey, "notasecret", X509KeyStorageFlags.Exportable);

        //    ServiceAccountCredential credential = new ServiceAccountCredential(
        //        new ServiceAccountCredential.Initializer(serviceAccountEmail)
        //        {
        //            Scopes = new[] { DriveService.Scope.Drive }
        //        }.FromCertificate(certificate));
        //    var service = new DriveService(new BaseClientService.Initializer()
        //    {
        //        HttpClientInitializer = credential,
        //        ApplicationName = "Drive API Sample",
        //    });

        //    //var files = await service.Files.List().ExecuteAsync();
        //    FilesResource.ListRequest request = service.Files.List();
        //    FileList result = request.Execute();
        //    //0BxIfBr67_v9Dc3RhcnRlcl9maWxl
        //    #endregion

        //    #region json code

        //    //string pathKey = HostingEnvironment.MapPath(@"~/client.json");
        //    //UserCredential credential;
        //    //using (var stream = new FileStream(pathKey, FileMode.Open, FileAccess.Read))
        //    //{
        //    //    string credPath = System.Environment.GetFolderPath(System.Environment.SpecialFolder.Personal);
        //    //    credPath = Path.Combine(credPath, ".credentials/drive-dotnet-quickstart.json");

        //    //    credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
        //    //        GoogleClientSecrets.Load(stream).Secrets,
        //    //        scopes,
        //    //        "user",
        //    //        CancellationToken.None,
        //    //        new FileDataStore(credPath, true)).Result;
        //    //    Console.WriteLine("Credential file saved to: " + credPath);
        //    //}
        //    //// Create Drive API service.
        //    //var service = new DriveService(new BaseClientService.Initializer()
        //    //{
        //    //    HttpClientInitializer = credential,
        //    //    ApplicationName = applicationName,
        //    //});
        //    //FilesResource.ListRequest listRequest = service.Files.List();
        //    //listRequest.PageSize = 10;
        //    //listRequest.Fields = "nextPageToken, files(id, name)";

        //    //// List files.
        //    //IList<Google.Apis.Drive.v3.Data.File> files = listRequest.Execute().Files; 
        //    #endregion

        //    if (result != null)
        //        return Ok(result.Files);
        //    return Ok();
        //}

        public HttpResponseMessage GetFile()
        {

            String serviceAccountEmail = "keytest@testingdrive-1301.iam.gserviceaccount.com";
            string pathKey = HostingEnvironment.MapPath(@"~/key.p12");
            var certificate = new X509Certificate2(pathKey, "notasecret", X509KeyStorageFlags.Exportable);

            ServiceAccountCredential credential = new ServiceAccountCredential(
                new ServiceAccountCredential.Initializer(serviceAccountEmail)
                {
                    Scopes = new[] { DriveService.Scope.Drive }
                }.FromCertificate(certificate));
            var service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "Drive API Sample",
            });
            string fileId = "0BxIfBr67_v9Dc3RhcnRlcl9maWxl";
            var request = service.Files.Get(fileId);
            var stream = new System.IO.MemoryStream();
            request.MediaDownloader.ProgressChanged += (IDownloadProgress progress) =>
     {
         switch (progress.Status)
         {
             case DownloadStatus.Downloading:
                 {
                     Console.WriteLine(progress.BytesDownloaded);
                     break;
                 }
             case DownloadStatus.Completed:
                 {
                     Console.WriteLine("Download complete.");
                     break;
                 }
             case DownloadStatus.Failed:
                 {
                     Console.WriteLine("Download failed.");
                     break;
                 }
         }
     };
            request.Download(stream);

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content =  new ByteArrayContent(stream.ToArray()); ;
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("Application/pdf");
            return result;
        }

        [System.Web.Http.HttpPost, System.Web.Http.Route("api/upload")]
        public async Task<IHttpActionResult> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);
            foreach (var file in provider.Contents)
            {
                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                var buffer = await file.ReadAsByteArrayAsync();
                //Do whatever you want with filename and its binaray data.
            }

            return Ok();
        }
    }
}