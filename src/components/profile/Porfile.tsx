import PageContent from "../shared/PageContent";

function Profile() {
  return (
    <PageContent title="Profile">

      <div className="flex justify-center mt-5">
        <img
          src=""
          alt="Profile"
          className="w-32 h-32 border shadow-lg rounded"
        />
      </div>

      <ul className="flex flex-col gap-2 items-start mx-auto w-full md:w-1/2">
        <li className="border-b-2 w-full justify-between flex p-2">
          <span>Email: </span>
          <input type="text" disabled 
            className="bg-gray-200 rounded border text-center cursor-not-allowed" 
            value="jan@wp.pl"/>
        </li>
        <li className="border-b-2 w-full justify-between flex p-2">
          <span>Name: </span>
           <input type="text" disabled 
            className="bg-gray-200 rounded border text-center cursor-not-allowed" 
            value="Jan"/>
        </li>
         <li className="border-b-2 w-full justify-between flex p-2">
          <span>Surname: </span>
            <input type="text" disabled 
            className="bg-gray-200 rounded border text-center cursor-not-allowed" 
            value="Kowalski"/>
        </li>
        <li className="border-b-2 w-full justify-between flex p-2">
          <span>Joined: </span>
           <input type="text" disabled 
            className="bg-gray-200 rounded border text-center cursor-not-allowed" 
            value="20-11-2009"/>
        </li>

        <li className="mt-4 border-b-2 w-full justify-between flex p-2">
          <label>Language: </label>
          <select name="language" className="rounded border text-center p-1 cursor-pointer">
            <option value="english" className="rounded-full">English</option>
            <option value="polish">Polish</option>
          </select>
        </li>
         <li className="border-b-2 w-full justify-between flex p-2">
          <span>Mode: </span>
          <select name="mode" className="rounded border text-center p-1 cursor-pointer">
            <option value="dark" className="rounded-full">Dark</option>
            <option value="light">Light</option>
          </select>
        </li>
        
    </ul> 

    </PageContent>
  );
}

export default Profile;