import JobModel from "../models/job.model.js";
import {sendMailConfirmation} from "../middlewares/sendMail.middleware.js";

export default class JobController {


  // ---------- Job Routes ----------

  // Fetch and render all job listings
  displayAllJobs(req, res) {
    const jobs = JobModel.getAllJobs();
    res.render('list-all-jobs', { jobs });
  }

  // Render form for posting a new job
  showPostJobForm(req, res) {
    res.render('new-job');
  }

  // Handle creation of a new job
  createJob(req, res) {
    if (!req.file) {
      return res.status(400).send("Logo image is required");
    }

    const logoPath = 'images/' + req.file.filename;
    const jobDetails = {
      ...req.body,
      logo: logoPath
    };

    JobModel.createNewJob(jobDetails);
    res.redirect('/jobs');
  }

  // Render specific job details by ID
  displayJobDetails(req, res) {
    const jobId = req.params.id;
    const job = JobModel.findById(jobId);

    if (!job) return res.redirect('/404');

    res.render('job-details', { data: job });
  }

  // Show form to update a job
  showUpdateJobForm(req, res) {
    const jobId = req.params.id;
    const job = JobModel.findById(jobId);
    res.render('update-job', { job });
  }

  updateJobForm(req, res) {
    let jobDetail = req.body;
    let id = req.params.id;

    // Add file path only if a new file is uploaded
    let logoPath;
    if (req.file) {
      jobDetail.logo = 'images/' + req.file.filename;
    } else {
      // Keep the old logo path
      jobDetail.logo = jobDetail.existingLogo; // assuming it's sent in the form as a hidden input
    }

    // const jobDetails = {
    //   ...jobDetail,
    //   logo: logoPath
    // };

    JobModel.updateJob(jobDetail, id);

    res.redirect("/jobs");
  }


  // Delete job by ID
  deleteJobById(req, res) {
    const jobId = req.params.id;
    const deleted = JobModel.deleteById(jobId);

    if (!deleted) return res.redirect('/404');

    res.redirect('/jobs');
  }


  // ---------- Job Applicants Controller ----------

  showAllApplicants(req, res) {
    const jobId = req.params.id;
    const allApplicants = JobModel.getAllApplicants(jobId);
 
    if (!allApplicants) {
      return res.status(404).render('404');
    }

    res.render('all-applicants', { allApplicants });
  }

  async addNewApplicant(req, res) {
    const jobId = req.params.id;
    const { name, contact, email } = req.body;
    const resumePath = req.file?.filename;

    if (!resumePath || !name || !contact || !email) {
      return res.status(400).render('error', { message: 'Invalid applicant data.' });
    }

    const result = JobModel.addApplicant(jobId, { name, contact, email, resumePath });

    await sendMailConfirmation(result);

    if (!result) {
      return res.status(404).render('404');
    }

    res.redirect('/jobs');
  }

}
