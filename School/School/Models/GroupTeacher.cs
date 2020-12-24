using System.Text.Json.Serialization;

namespace School.Models
{
    public class GroupTeacher
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("groupid")]
        public int GroupID { get; set; }
        [JsonPropertyName("teacherid")]
        public int TeacherID { get; set; }
    }
}
