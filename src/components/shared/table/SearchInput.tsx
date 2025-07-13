import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

interface SearchInputProps {
  placeholder: string;
}

function SearchInput({ placeholder }: SearchInputProps) {
  return (
     <div className="shadow-lg rounded-lg grow border">
          <div>
            <label className="flex items-center gap-2 p-2">
              <div className="pr-2 border-r-2" >
                <MagnifyingGlassIcon className="h-10" />
              </div>
              <input className="w-full p-2" name="listSearch" placeholder={placeholder} />
            </label>
          </div>
    </div>
  );
}

export default SearchInput;