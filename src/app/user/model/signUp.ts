export class SignUp {
  username: string;
  password: string;
  fullName: string;
  address: string;
  email: string;
  role: string[];

  constructor(username: string, password: string, fullName: string, address: string, email: string) {
    this.username = username;
    this.password = password;
    this.fullName = fullName;
    this.address = address;
    this.email = email;
    this.role = ['ROLE_USER'];
  }


}
