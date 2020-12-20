using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using School.Services;
using School.ViewModels;
using System;
using System.Threading.Tasks;

namespace School.Controllers
{
    public class FilesController : Controller
    {
        private readonly IFilesRepository _fileRepository;

        /// <summary>
        /// Constructor of controller
        /// </summary>
        /// <param name="fileRepository"></param>
        public FilesController(IFilesRepository fileRepository)
        {
            _fileRepository = fileRepository;
        }

        /// <summary>
        /// Upload file to given path
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Upload([FromQuery]string path, IFormFile upload)
        {
            try
            {
                return Created("",_fileRepository.UploadFile(new FileUploadRequestModel { 
                    DownloadTo = path,
                    File = upload
                }).Result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Get file info
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetFileInfo(string fileName, string path)
        {
            try
            {
                return Ok(await _fileRepository.GetFileInfo(fileName, path));
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// Remove files
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> DeleteFile(string fileName, string path)
        {
            try
            {
                return Ok(await _fileRepository.DeleteFile(fileName, path));
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Get pysical file content 
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetPhysicalFile(string fileName, string path = "Files")
        {
            try
            {
                var fileInfo = await _fileRepository.GetPhysicalFile(fileName, path);
                return PhysicalFile(fileInfo.Name, fileInfo.ContentType);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
            //=> Json();

        /// <summary>
        /// Check if file exist or not
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<JsonResult> Exists(string fileName, string path)
            => Json(await _fileRepository.Exists(fileName, path));

        /// <summary>
        /// Check if file exist or not
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetFiles(string path)
        {
            try
            {
                return Ok(await _fileRepository.GetFiles(path));
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


    }
}