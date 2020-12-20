using School.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace School.Services
{
    /// <summary>
    /// Author : Altay Ali
    /// 
    /// File repository
    /// 
    /// Main operations : Exist, GetFileInfo, UploadFile, GetFiles
    /// </summary>
    public class FilesRepository : IFilesRepository
    {
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IConfiguration _config;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="hostEnvironment"></param>
        /// <param name="configuration"></param>
        public FilesRepository(IWebHostEnvironment hostEnvironment,
                                IConfiguration configuration)
        {
            _config = configuration;
            _hostEnvironment = hostEnvironment;
        }
        /// <summary>
        /// Check file  if exist or not given path
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public async Task<ExistsResponseModel> Exists(string fileName, string path)
            => await Task.Run(()
                => new ExistsResponseModel { IsExist = File.Exists(Path.Combine(_hostEnvironment.WebRootPath, path, fileName)) }).ConfigureAwait(false);


        /// <summary>
        /// Get phisical file 
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public async Task<FileContentModel> GetPhysicalFile(string fileName, string path)
        => await Task.Run(async () =>
        {
            if (!(await Exists(fileName, path)).IsExist)
                throw new Exception("Fayl tapılmadı");

            FileInfo fileInfo = new FileInfo(Path.Combine(_hostEnvironment.WebRootPath, path, fileName));

            return new FileContentModel
            {
                Name = Path.Combine(_hostEnvironment.WebRootPath, path, fileName),
                ContentType = _config[$"ContentTypes:{fileInfo.Extension}"]
            };
        }).ConfigureAwait(false);

        /// <summary>
        /// Get file info
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public async Task<FileModel> GetFileInfo(string fileName, string path)
        => await Task.Run(async () =>
         {
             if (!(await Exists(fileName, path)).IsExist)
                 throw new Exception("Fayl tapılmadı!");

             FileInfo fileInfo = new FileInfo(Path.Combine(_hostEnvironment.WebRootPath, path, fileName));

             return new FileModel
             {
                 FileName = fileInfo.Name,
                 DateModified = fileInfo.LastWriteTime,
                 FileExtension = fileInfo.Extension,
                 Size = Math.Round(fileInfo.Length * Math.Pow(10, -6),2),
             };
         }).ConfigureAwait(false);

        /// <summary>
        /// Get file list
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public async Task<List<FileModel>> GetFiles(string path)
            => await Task.Run(() =>
            {
                try
                {
                    DirectoryInfo directoryInfo = new DirectoryInfo(Path.Combine(_hostEnvironment.WebRootPath, path));
                    List<FileModel> fileList = new List<FileModel>();

                    foreach (var file in directoryInfo.GetFiles())
                        fileList.Add(new FileModel
                        {
                            FileName = file.Name,
                            DateModified = file.LastWriteTime,
                            FileExtension = file.Extension,
                            Size = Math.Round(file.Length * Math.Pow(10, -6), 2)
                        });

                    return fileList.OrderByDescending(x=>x.DateModified).ToList();

                }
                catch
                {
                    throw new Exception("Fayl mövcud deyil!");
                }
                
            }).ConfigureAwait(false);

        /// <summary>
        /// Upload file
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<FileUploadResponseModel> UploadFile(FileUploadRequestModel request)
            => await Task.Run(async() =>
             {
                 try
                 {
                     int dotLastIndex = request.File.FileName.LastIndexOf('.');
                     string fileExtension = request.File.FileName.Substring(dotLastIndex);
                     string fileName = $"{request.File.FileName.Remove(dotLastIndex).Replace(' ', '_')}_{Guid.NewGuid().ToString().Substring(0, 6)}{fileExtension}";
                     string direcrotyPath = Path.Combine(_hostEnvironment.WebRootPath, request.DownloadTo);
                     if (!Directory.Exists(direcrotyPath))
                         Directory.CreateDirectory(direcrotyPath);
                     string filePath = Path.Combine(direcrotyPath, fileName);
                     using FileStream stream = new FileStream(filePath, FileMode.Create);
                     await request.File.CopyToAsync(stream); 

                     return new FileUploadResponseModel
                     {
                         FileName = fileName,
                     };

                 }
                 catch
                 {

                     throw new Exception("Əməliyyat zamanı problem yarandı. Yenidən yoxluyun. Problem davam etsə administrator ilə əlaqə saxlıyın!");
                 }
             }).ConfigureAwait(false);

        /// <summary>
        /// Delete file
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public async Task<FileRemoveResponse> DeleteFile(string fileName, string path)
        {
                if (!(await Exists(fileName, path)).IsExist)
                    throw new Exception("Fayl tapılmadı!");

                File.Delete(Path.Combine(_hostEnvironment.WebRootPath, path, fileName));
                return new FileRemoveResponse
                {
                    IsDeleted = true
                };
           
        }
    }
}
