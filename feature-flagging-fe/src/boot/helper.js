const helper = {
  audit_trail_excluded_properties: ['id', 'application_id', 'created_by', 'password', 'user_id'],
  auditables_display: {
    "App\\Models\\UserProfileWorkExperienceModel": {
      display: 'User Profile Work Experience',
      icon: 'job'
    },
    "App\\Models\\UserProfileEducationModel": {
      display: 'User Profile Educational History',
      icon: 'school'
    },
    "App\\Models\\User": {
      display: 'User Information',
      icon: 'manage_accounts'
    },
    "App\\Models\\UserJobPostingApplicationModel": {
      display: 'Job Posting Application',
      icon: 'work'
    },
    "App\\Models\\ApplicationStatusRemarksModel": {
      display: 'Job Posting Application Remarks',
      icon: 'description'
    },
    "App\\Models\\AlumniResourceModel": {
      display: 'Alumni Resource',
      icon: 'newspaper'
    },
    "App\\Models\\JobPostingModel": {
      display: 'Job Posting',
      icon: 'post_add'
    },
    "App\\Models\\UserProfileSkillModel": {
      display: 'User Profile Skill',
      icon: 'manage_accounts'
    }
  },
  job_application_status_color: {
      'hired': 'green',
      'interview': 'orange',
      'pending': 'grey',
      'exam': 'orange',
      'not-selected': 'red',
  },
  job_posting_status_color: {
    active: 'green-5',
    closed: 'red-5',
    archived: 'grey-6'
  },
  application_statuses_confirm_display: {
    hired: "hire",
    interview: "interview",
    'not-selected': "decline",
    exam: "to set an examination for",
    pending: "your application has been sent"
  },
  dashboard_application_statuses_confirm_display: {
    hired: "hired",
    interview: "scheduled for interview",
    'not-selected': "declined",
    exam: "scheduled for examination",
    pending: "submitted"
  },
  job_posting_status_question_display: {
    active: "activate",
    archived: "archive",
    closed: "close",
  },
  resources_forms: ['Career Counseling', 'Job Interview Tips'],
  resources_types: ['PDF', 'YouTube'],
  user_types: ['Admin', 'Alumni', 'Employer'],
  table_sizes: [10, 25, 50, 100],
  educational_level_options: ["Primary Education", "High School Diploma", "Vocational Training", "Associate Degree", "Master's Degree", "Doctorate (PhD)", "Professional Certification"],
  employment_types: [
    "Regular",
    "Job Order",
    "Contractual",
    "Project-Based",
    "Part-Time",
    "Casual",
    "Temporary",
    "Seasonal",
    "Freelance",
    "Internship"
  ],
  batch_year_start: 2000,
  payload2FormData(payload){
      let fd = new FormData();
      for(let column in payload){
          fd.append(column, payload[column]);
      }

      return fd;
  },
  trimObjectValues(obj) {
    if (!obj || typeof obj !== 'object') return obj

    const trimmedObject = {}
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'string') {
        trimmedObject[key] = obj[key].trim()
      } else {
        trimmedObject[key] = obj[key]
      }
    })

    return trimmedObject
  },
  
  formatNumber(number, decimals = 2){
    return number.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals}
    )
  },
}

export default ({ app }) => {
  app.config.globalProperties.$helper = helper
}
