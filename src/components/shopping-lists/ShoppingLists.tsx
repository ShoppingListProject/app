import PageContent from "../shared/PageContent";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import Pagination from "../shared/table/Pagination";
import { useEffect, useRef, useState, type RefObject } from "react";
import { getShoppingLists } from "../../api/shoppingList";
import type { CategorizedItems, ShoppingList } from "../../models/shoppingList";
import type { TableRow } from "../../models/tableModels";
import Modal, { type ModalRef } from "../shared/Modal";
import ShoppingListModal from "./shopping-list/shoppingListModal";

function ShoppingLists() {

  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [currentOpenListName, setCurrentOpenListName] = useState<string | null>(null); 

  console.log(shoppingLists);

  const modalRef: RefObject<ModalRef | null> = useRef(null);

  useEffect( () => {
    getShoppingLists()
      .then(setShoppingLists)
      .catch((err) => console.log(err));
  }, []);

  function convertShoppingListsToTableRows(shoppingLists: ShoppingList[]): TableRow[] {
    
    return shoppingLists.map( (shoppingList) => {

      const creationDate = new Date(shoppingList.createdAt).toLocaleDateString();

      return {
        name: shoppingList.name,
        createdAt: creationDate
      }
    })
  }

  function handleOnClickItem(name: string) {
    setCurrentOpenListName(name);
    modalRef.current?.open();
  }

  function findItemsOfSelctedList(name: string): CategorizedItems[] {
    return shoppingLists.find(list => list.name === name)!.itemsPerCategory;
  }

  return (
    <PageContent title="Shopping Lists">

      <SearchInput placeholder="Weekend Shopping List" />
      <Table headerName="List Name" rows={convertShoppingListsToTableRows(shoppingLists)} onClickItem={handleOnClickItem}/>
      <Pagination/>

      <Modal
        ref={modalRef} 
        title={currentOpenListName} 
      >
        {currentOpenListName != null && <ShoppingListModal key={currentOpenListName} itemsPerCategory={findItemsOfSelctedList(currentOpenListName)} />}
      </Modal>
      

    </PageContent>
  )
}

export default ShoppingLists;