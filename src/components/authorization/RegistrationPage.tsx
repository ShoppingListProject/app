import { Link } from "react-router";
import PageContent from "../shared/PageContent";
import GoogleLogo from '../../assets/google-icon.png';
import AuthInput from "./utils/AuthInput";

function RegistrationPage() {
 return (
    <PageContent title="Sign Up">
        
      <button type="button" className="flex justify-center items-center shadow-lg bg-blue-300 hover:bg-blue-400 rounded p-2 hover w-full md:w-1/2 mx-auto my-4 cursor-pointer">
        <img src={GoogleLogo} alt="Google Logo" className="h-10" />
        <span className="inline-block">Sign up with Google</span>
      </button>
      
      <form className="flex flex-col gap-4 w-full md:w-1/2 mx-auto">

        <AuthInput label="Email" type="email" name="email" />
        <AuthInput label="Password" type="password" name="password" />
        <AuthInput label="Repeat Password" type="password" name="password" />
        <AuthInput label="Activation Code" type="text" name="activation-code" />
        <AuthInput label="First Name" type="text" name="first-name" />
        <AuthInput label="Surname" type="text" name="surname" />
       
        <label className="flex flex-col">
          Date of Birth:
          <input type="date" name="dateOfBirth" className="border rounded p-2" />
        </label>

        <button type="submit" className="bg-blue-300 rounded p-2 hover:bg-blue-400">
          Sign up
        </button>

      </form>

      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center" >
        <span>Do you have an account?</span>
        <Link to="/login" className="text-blue-500 hover:underline">
          Log in here
        </Link>
      </div>
    </PageContent>
  );
}

export default RegistrationPage; 