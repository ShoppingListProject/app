import PageContent from "../shared/PageContent";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import Pagination from "../shared/table/Pagination";
import { useEffect, useState } from "react";
import { getShoppingLists } from "../../api/shoppingList";
import type { ShoppingList } from "../../models/shoppingList";
import type { TableRow } from "../../models/tableModels";

function ShoppingLists() {

  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  console.log(shoppingLists);

  useEffect( () => {
    getShoppingLists()
      .then(setShoppingLists)
      .catch((err) => console.log(err));
  }, []);

  function convertShoppingListsToTableRows(shoppingLists: ShoppingList[]): TableRow[] {
    
    return shoppingLists.map( (shoppingList) => {

      return {
        id: shoppingList.id,
        name: shoppingList.name,
        createdAt: shoppingList.createdAt,
      }

    })
  }

  return (
    <PageContent title="Shopping Lists">

      <SearchInput placeholder="Weekend Shopping List" />
      <Table headerName="List Name" rows={convertShoppingListsToTableRows(shoppingLists)}/>
      <Pagination/>

    </PageContent>
  )
}

export default ShoppingLists;