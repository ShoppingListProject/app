import PageContent from "../shared/PageContent";
import Pagination from "../shared/table/Pagination";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";

function Recipes() {
  return (
    <PageContent title="Recipes">

      <SearchInput placeholder="Spaghetti" />
      <Table headerName="Recipe Name" />
      <Pagination/>

    </PageContent>
  );
}

export default Recipes;