using System.Text.Json.Serialization;

namespace School.Areas.Admin.ViewModels
{
    public class GroupTeacherViewModel
    {
        [JsonPropertyName("groupid")]
        public int GroupID { get; set; }
        [JsonPropertyName("teacherid")]
        public int TeacherID { get; set; }
    }
}
