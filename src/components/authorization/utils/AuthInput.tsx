interface AuthInputProps {
  label: string;
  type: string;
  name: string;
}

function AuthInput({label, type, name,}: AuthInputProps) {
  return (
    <label className="flex flex-col">
      {label}:
      <input type={type} name={name} required className="border rounded p-2" />
    </label>
  )
}

export default AuthInput;