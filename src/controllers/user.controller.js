import UserModel from "../models/user.model.js";

export default class UserController {

  // Render login page with no error message initially
  renderLoginPage(req, res) {
    res.render('user-login', { errorMessage: null });
  }

  // Handle registration form submission
  handleRegister(req, res) {
    try {
      UserModel.addUser(req.body);
      res.redirect('/login');
    } catch (error) {
      res.status(400).render('user-login', { errorMessage: error.message });
    }
  }

  // Handle login logic and session management
  handleLogin(req, res) {
    const authenticatedUser = UserModel.validateCredentials(req.body);

    if (!authenticatedUser) {
      return res.render('user-login', { errorMessage: "Invalid email or password" });
    }

    req.session.user = authenticatedUser; // Set session
    res.redirect('/jobs');
  }

  // Handle logout logic
  handleLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res.status(500).send('Error logging out');
      }

      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  }
}
