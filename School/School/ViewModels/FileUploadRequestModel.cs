using Microsoft.AspNetCore.Http;

namespace School.ViewModels
{

    /// <summary>
    /// Request model
    /// </summary>
    public class FileUploadRequestModel
    {
        /// <summary>
        /// Path where  you want to download file  
        /// </summary>
        public string DownloadTo { get; set; }

        /// <summary>
        /// File
        /// </summary>
        public IFormFile File { get; set; }
    }
}
