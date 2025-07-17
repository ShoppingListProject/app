interface AuthInputProps {
  label: string;
}

function AuthInput({label}: AuthInputProps) {
  return (
    <label className="flex flex-col">
      {label}:
      <input type="email" name="email" required className="border rounded p-2" />
    </label>
  )
}

export default AuthInput;