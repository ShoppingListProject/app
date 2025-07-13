import PageContent from "../shared/PageContent";
import DisabledInput from "./DisabledInput";
import ProfileImage from "./ProfileImage";
import Selector from "./Selector";

function Profile() {
  return (
    <PageContent title="Profile">

      <ProfileImage />

      <ul className="flex flex-col gap-2 items-start mx-auto w-full md:w-1/2">
        <DisabledInput label="Email" />
        <DisabledInput label="Name" />
        <DisabledInput label="Surname" />
        <DisabledInput label="Joined" />

        <li className="mt-4"></li>

        <Selector label="Language" values={["English", "Polish"]} />
        <Selector label="Mode" values={["Dark", "Light"]} />
        
    </ul> 

    </PageContent>
  );
}

export default Profile;