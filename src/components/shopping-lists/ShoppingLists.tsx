import PageContent from "../shared/PageContent";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import Pagination from "../shared/table/Pagination";

function ShoppingLists() {
  return (
    <PageContent title="Shopping Lists">

      <SearchInput placeholder="Weekend Shopping List" />
      <Table headerName="List Name" />
      <Pagination/>

    </PageContent>
  )
}

export default ShoppingLists;