import { Link } from "react-router";
import PageContent from "../shared/PageContent";
import GoogleLogo from '../../assets/google-icon.png';

function RegistrationPage() {
 return (
    <PageContent title="Sign Up">

        
      <button type="button" className="flex justify-center items-center shadow-lg bg-blue-300 hover:bg-blue-400 rounded p-2 hover w-full md:w-1/2 mx-auto my-4 cursor-pointer">
        <img src={GoogleLogo} alt="Google Logo" className="h-10" />
        <span className="inline-block">Sign up with Google</span>
      </button>
      
      <form className="flex flex-col gap-4 w-full md:w-1/2 mx-auto">
        <label className="flex flex-col">
          *Email:
          <input type="email" name="email" required className="border rounded p-2" />
        </label>
        <label className="flex flex-col">
          *Password:
          <input type="password" name="password" required className="border rounded p-2" />
        </label>
        <label className="flex flex-col">
          *Repeat Password:
          <input type="password" name="password" required className="border rounded p-2" />
        </label>
        <label className="flex flex-col">
          *Activation Code:
          <input type="text" name="activationCode" className="border rounded p-2" />
        </label>
        <label className="flex flex-col">
          Name:
          <input type="text" name="name" className="border rounded p-2" />
        </label>
        <label className="flex flex-col">
          Surname:
          <input type="text" name="surname" className="border rounded p-2" />  
        </label>
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