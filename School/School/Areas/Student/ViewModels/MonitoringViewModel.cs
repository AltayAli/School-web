using Newtonsoft.Json;

namespace School.Areas.Student.ViewModels
{
    public class MonitoringViewModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("path")]
        public string Path { get; set; }
    }
}
