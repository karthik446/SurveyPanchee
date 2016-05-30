using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SPService.Models
{
    public class Survey
    {
        public int SurveyId { get; set; }

        [Required]
        public string SurveyName { get; set; }

        [Required]
        public List<SurveyQuestion> SurveyQuestions { get; set; }

        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

    }

    public class SurveyQuestion
    {
        public int SurveyQuestionId { get; set; }

        public int SurveyId { get; set; }

        [Required]
        public string SurveyQuestionText { get; set; }

        [Required]
        public List<SurveyOption> SurveyOptions { get; set; }

        [Required]
        public QuestionType QuestionTypeId { get; set; }
    }

    public enum QuestionType
    {
        SingleSelection,
        MultipleSelection,
        Rating5,
        Rating10
    }

    public class SurveyOption
    {
        public int SurveyOptionId { get; set; }

        public int SurveyQuestionId { get; set; }

        [Required]
        public string SurveyOptionText { get; set; }
    }
}