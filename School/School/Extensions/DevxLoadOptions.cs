using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;
using System.Threading.Tasks;

namespace School.Areas.Extensions
{
    /// <summary>
    /// Author: Eynar Haji
    /// Description:
    /// Data binding service for Devextreme DataGrcode.
    /// </summary>
    [ModelBinder(typeof(DevxLoadOptionsBinder))]
    public class DevxLoadOptions : DataSourceLoadOptionsBase
    {
    }
    /// <summary>
    /// Devx load options binder
    /// </summary>
    public class DevxLoadOptionsBinder : IModelBinder
    {
        /// <summary>
        /// Bind model
        /// </summary>
        /// <param name="bindingContext"></param>
        /// <returns></returns>
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var loadOptions = new DevxLoadOptions();
            DataSourceLoadOptionsParser.Parse(loadOptions, key => bindingContext.ValueProvider.GetValue(key).FirstOrDefault());
            bindingContext.Result = ModelBindingResult.Success(loadOptions);
            return Task.CompletedTask;
        }
    }
}
