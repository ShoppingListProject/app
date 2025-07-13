import PageContent from "../shared/PageContent";
import Pagination from "../shared/table/Pagination";
import SearchInput from "../shared/table/SearchInput";
import CreationButtons from "./create-shopping-list/CreationButtons";
import CreationTable from "./create-shopping-list/CreationTable";

function CreateShoppingList() {
  return (
    <PageContent title="Create Shopping List">
      <SearchInput placeholder="Spaghetti"/>
      <CreationTable/>
      <Pagination />
      <CreationButtons />
    </PageContent>
  )
}

export default CreateShoppingList;