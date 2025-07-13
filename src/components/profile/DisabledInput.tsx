interface DisabledInputProps {
  label: string;
}

function DisabledInput({ label }: DisabledInputProps) {
  return (
    <li className="border-b-2 w-full justify-between flex p-2">
      <span>{label}: </span>
      <input type="text" disabled 
        className="bg-gray-200 rounded border text-center cursor-not-allowed" 
        value="info"/>
    </li>
  );
}

export default DisabledInput;