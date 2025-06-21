export default class JobModel {
  constructor(
    id, logo, job_designation, company_name, job_location,
    experience, salary, employees, skills_required,
    job_category = 'General', apply_by = 'Not specified',
    number_of_openings = '1', company_founded
  ) {
    this.id = id;
    this.logo = logo;
    this.job_designation = job_designation;
    this.company_name = company_name;
    this.job_location = job_location;
    this.experience = experience;
    this.salary = salary;
    this.employees = employees;
    this.skills_required = skills_required;
    this.job_category = job_category;
    this.apply_by = apply_by;
    this.number_of_openings = number_of_openings;
    this.company_founded = company_founded;
    this.job_posted = new Date().toLocaleDateString();
    this.applicants = [];
  }

  // Return all jobs
  static getAllJobs() {
    return jobData;
  }

  // Add a new job
  static createNewJob(details) {
    const {
      logo, job_designation, company_name, job_location,
      experience, salary, employees, skills_required,
      job_category, apply_by, number_of_openings, company_founded
    } = details;


    const newJob = new JobModel(
      jobData.length + 1,
      logo, job_designation, company_name, job_location,
      experience, salary, employees,
      JobModel.parseSkills(skills_required),
      job_category, apply_by, number_of_openings, company_founded
    );
    jobData.push(newJob);
  }

  // Find job by ID
  static findById(id) {
    return jobData.find(job => job.id == id);
  }

  // update specific job
  static updateJob(jobDetail, id) {
    const job = JobModel.findById(id)
    if (!job) return false;

    const {
      logo, job_designation, company_name, job_location,
      experience, salary, employees, skills_required,
      job_category, apply_by, number_of_openings, company_founded
    } = jobDetail;

    // if (logo !== undefined) job.logo = logo;
    if (logo && logo.trim() !== '' && !logo.startsWith('images/')) {
      job.logo = 'images/' + logo;
    } else if (logo && logo.trim() !== '') {
      job.logo = logo; // already has full path
    }


    if (job_designation !== undefined) job.job_designation = job_designation;
    if (company_name !== undefined) job.company_name = company_name;
    if (job_location !== undefined) job.job_location = job_location;
    if (experience !== undefined) job.experience = experience;
    if (salary !== undefined) job.salary = salary;
    if (employees !== undefined) job.employees = employees;
    if (skills_required !== undefined)
      job.skills_required = JobModel.parseSkills(skills_required);
    if (job_category !== undefined) job.job_category = job_category;
    if (apply_by !== undefined) job.apply_by = apply_by;
    if (number_of_openings !== undefined)
      job.number_of_openings = number_of_openings;
    if (company_founded !== undefined)
      job.company_founded = company_founded;

    console.log(jobData)

    return true; // Update successful

  };



  // Delete job by ID
  static deleteById(id) {
    const index = jobData.findIndex(job => job.id == id);
    if (index !== -1) {
      jobData.splice(index, 1);
      return true;
    }
    return false;
  }

  // Convert string to skill array
  static parseSkills(skills) {
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'string') {
      return skills.split(',').map(skill => skill.trim());
    }
    return [];
  }

  // ---------- Job applicants ----------

  // ---------- Job Applicants Model ----------

  static getAllApplicants(jobId) {
    const job = jobData.find(job => job.id == jobId);
    return job?.applicants || null;
  }

  static addApplicant(jobId, applicant) {
    const jobIndex = jobData.findIndex(job => job.id == jobId);

    if (jobIndex === -1) return null;

    if (!jobData[jobIndex].applicants) {
      jobData[jobIndex].applicants = [];
    }

    jobData[jobIndex].applicants.push(applicant);
    console.log('Updated Applicants:', jobData[jobIndex].applicants);

    return jobData[jobIndex].applicants;
  }

}



let jobData = [
  {
    id: 1,
    featured: true,
    logo: 'https://logo.clearbit.com/google.com',
    job_designation: 'Frontend Developer',
    company_name: 'Google',
    job_location: 'Bangalore, India',
    experience: '0-1 year',
    salary: '₹8 LPA',
    employees: '10,000+ employees',
    skills_required: ['HTML', 'CSS', 'JavaScript', 'React'],
    job_posted: '2 days ago',
    number_of_openings: "8",
    applicants: []
  },
  {
    id: 2,
    featured: false,
    logo: 'https://logo.clearbit.com/microsoft.com',
    job_designation: 'Backend Developer',
    company_name: 'Microsoft',
    job_location: 'Hyderabad, India',
    experience: '1-3 years',
    salary: '₹12 LPA',
    employees: '20,000+ employees',
    skills_required: ['Node.js', 'MongoDB', 'REST APIs'],
    job_posted: '3 days ago',
    number_of_openings: "10",
    applicants: []
  },
  {
    id: 3,
    featured: true,
    logo: 'https://logo.clearbit.com/amazon.com',
    job_designation: 'Full Stack Engineer',
    company_name: 'Amazon',
    job_location: 'Remote',
    experience: 'Fresher',
    salary: '₹10 LPA',
    employees: '50,000+ employees',
    skills_required: ['React', 'Node.js', 'AWS'],
    job_posted: '1 day ago',
    number_of_openings: "11",
    applicants: []
  },
  {
    id: 4,
    featured: false,
    logo: 'https://logo.clearbit.com/meta.com',
    job_designation: 'Intern Software Developer',
    company_name: 'Meta',
    job_location: 'Mumbai, India',
    experience: 'Internship',
    salary: '₹30K/month',
    employees: '15,000+ employees',
    skills_required: ['Python', 'Flask', 'Machine Learning'],
    job_posted: '5 days ago',
    number_of_openings: "62",
    applicants: []
  }
];