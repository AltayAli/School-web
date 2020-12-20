using System;

namespace School.ViewModels
{
    /// <summary>
    /// File info model
    /// </summary>
    public class FileModel
    {
        /// <summary>
        /// File name
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// file size in mb
        /// </summary>
        public double Size { get; set; }

        /// <summary>
        /// File extention
        /// </summary>
        public string FileExtension { get; set; }

        /// <summary>
        /// Last modified date
        /// </summary>
        public DateTime DateModified { get; set; }
    }
}
