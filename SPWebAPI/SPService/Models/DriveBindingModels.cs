using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Migrations.Model;
using System.Linq;
using System.Web;

namespace SPService.Models
{
    public class DriveBindingModel
    {
        public string DriveBindingId { get; set; }

        public string UserId { get; set; }

        public string PathToFile { get; set; }

        public string FileDescription { get; set; }

        public string OriginalFileName { get; set; }

        public string DriveFileName { get; set; }

        public string DriveFileId { get; set; }

        public string FileContentType { get; set; }

        public string FileType { get; set; }
    }
}