using School.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace School.Services
{

    /// <summary>
    /// Interface of file repository
    /// </summary>
    public interface IFilesRepository
    {
        /// <summary>
        /// Function for upload the file
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<FileUploadResponseModel> UploadFile(FileUploadRequestModel request);
        /// <summary>
        /// Function for upload the file
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        Task<FileRemoveResponse> DeleteFile(string fileName, string path);
        /// <summary>
        /// Check file  if exist or not given path
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        Task<ExistsResponseModel> Exists(string fileName, string path);

        /// <summary>
        /// Get file info
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        Task<FileModel> GetFileInfo(string fileName, string path);

        /// <summary>
        /// Get phisical file 
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        Task<FileContentModel> GetPhysicalFile(string fileName, string path);
        /// <summary>
        /// Get file list
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        Task<List<FileModel>> GetFiles(string path);
    }
}
