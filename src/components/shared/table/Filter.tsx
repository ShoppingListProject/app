import Checkbox from "./Checkbox";
import SearchInput from "./SearchInput";

interface FilterProps {
    placeholder: string
    isCheckboxChecked: boolean
    onClickCheckbox: () => void
}

function Filter({placeholder, isCheckboxChecked, onClickCheckbox}: FilterProps) {
    return (
        <div className="flex">
            <SearchInput placeholder={placeholder} />
            <Checkbox  
                isChecked={isCheckboxChecked}
                onClick={onClickCheckbox}
            />
        </div>
    )
}

export default Filter;