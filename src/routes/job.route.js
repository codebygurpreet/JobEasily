import express from 'express';
import upload from '../middlewares/fileUpload.middleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import JobController from '../controllers/job.controller.js';
import validateRequest from '../middlewares/validateCompanyLogo.middleware.js'

const router = express.Router();
const jobController = new JobController();

// ---------- Error Page ----------
router.get('/404', (req, res) => {
  res.render("404", { msg: "Page Not Found" });
});

// ---------- Public Landing Page ----------
router.get('/', (req, res) => {
  res.render('landing-page');
});

// ---------- Job Routes ----------

// Display all jobs
router.get('/jobs', jobController.displayAllJobs);

// Show form to post a job (Protected)
router.get('/postjob', authMiddleware, jobController.showPostJobForm);

// Handle new job creation (Protected + File Upload)
router.post('/job', authMiddleware, upload.single("logo"), validateRequest, jobController.createJob);

// Show specific job details
router.get('/jobs/:id', jobController.displayJobDetails);

// Show job update form
router.get('/job/update/:id', jobController.showUpdateJobForm);

// Update specific job
router.post('/job/update/:id', upload.single("logo"),jobController.updateJobForm);

// Delete a job by ID (Can later be changed to DELETE)
router.get('/jobs/delete/:id', jobController.deleteJobById);


// ---------- Job Applicants Routes ----------

router.get('/job/applicants/:id', jobController.showAllApplicants);

router.post('/apply/:id', upload.single('resume'), jobController.addNewApplicant);


export default router;
