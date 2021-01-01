using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School.Areas.Teacher.Models
{
    public sealed class MonthConvertor
    {
        private List<Month> _months = new List<Month>
        {
            new Month{MontAbr="Jan",Number = 1},
            new Month{MontAbr="Feb",Number = 2},
            new Month{MontAbr="Mar",Number = 3},
            new Month{MontAbr="Apr",Number = 4},
            new Month{MontAbr="May",Number = 5},
            new Month{MontAbr="Jun",Number = 6},
            new Month{MontAbr="Jul",Number = 7},
            new Month{MontAbr="Aug",Number = 8},
            new Month{MontAbr="Sep",Number = 9},
            new Month{MontAbr="Oct",Number = 10},
            new Month{MontAbr="Nov",Number = 11},
            new Month{MontAbr="Dec",Number = 12},
        };
       public int this[string abr]
        {
            get
            {
                return _months.FirstOrDefault(x => x.MontAbr == abr).Number;
            }
        }
    }
    
    internal class Month
    {
        public string MontAbr { get; set; }
        public int Number { get; set; }
    }
}
