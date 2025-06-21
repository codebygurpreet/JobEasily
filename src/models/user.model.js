export default class UserModel {
  static users = [
    {
      id: 1,
      name: "Gurpreet Singh",
      email: "gurri304@gmail.com",
      password: "123" // ⚠️ Plain text; use hashed passwords in production!
    }
  ];

  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Add a new user (recruiter)
  static addUser({ name, email, password }) {
    const existingUser = this.users.find(user => user.email === email);
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    const newUser = new UserModel(this.users.length + 1, name, email, password);
    this.users.push(newUser);
    console.log(this.users)
  }

  // Validate login credentials
  static validateCredentials({ email, password }) {
    return this.users.find(user => user.email === email && user.password === password);
  }
}
