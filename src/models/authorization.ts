export interface LoginUser {
  email: string;
  password: string;
}

export interface RegistrationUser extends LoginUser{
  repeatPassword: string;
  activationCode: string;
  firstName: string;
  surname: string;
  dataOfBirth: string;
}

export interface User {
  email: string,
  firstName: string,
  surname: string,
  dateOfBirth: string,
  joined: string
}