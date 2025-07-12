import PageContent from "../shared/PageContent";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import Pagination from "../shared/table/Pagination";

function ShoppingLists() {
  return (
    <PageContent title="Shopping Lists">

      <SearchInput />
      <Table />
      <Pagination/>

    </PageContent>
  )
}

export default ShoppingLists;