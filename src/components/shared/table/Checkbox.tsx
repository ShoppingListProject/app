import { CheckIcon } from "@heroicons/react/16/solid";

interface CheckboxProps {
    isChecked: boolean
    onClick: () => void
}

function Checkbox({isChecked, onClick}: CheckboxProps) {

    const optionalClasses = isChecked ? "bg-green-200" : "";

    return (
        <div className="pl-2 flex items-center ">
            <button 
                onClick={() => onClick()}
                className={"relative group flex justify-center items-center size-12 border-2 rounded shadow-lg cursor-pointer " + optionalClasses}
            >
                {isChecked && <CheckIcon className="text-green-600" />}
                <span className="
                    absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                    hidden group-hover:block
                    md:w-3xs
                    rounded bg-gray-800 px-2 py-1 text-xs text-white z-10">
                 Check this box if you want to display public recipes
                </span>
            </button>
        </div>
    );
}

export default Checkbox;