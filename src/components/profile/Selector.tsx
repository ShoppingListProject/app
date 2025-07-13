interface SelectorProps {
  label: string;
  values: string[];
}

function Selector({ label, values }: SelectorProps) {
  return (
     <li className="border-b-2 w-full justify-between flex p-2">
          <label>{label}: </label>
          <select name={label} className="rounded border text-center p-1 cursor-pointer bg-blue-200">
            {values.map((value, index) => (
              <option key={index} value={value} className="rounded-full">
                {value}
              </option>
            ))}    
          </select>
        </li>
  );
}

export default Selector;