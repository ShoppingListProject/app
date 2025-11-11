import PageContent from "../shared/PageContent";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import Pagination from "../shared/table/Pagination";
import { useRef, useState, type RefObject } from "react";
import type { CategorizedItems, ShoppingList } from "@shopping-list-project/sl-api-models";
import type { TableRow } from "../../models/tableModels";
import Modal, { type ModalRef } from "../shared/modal/Modal";
import ShoppingListModal from "./ShoppingListModal";
import CreationButton from "../shared/CreationButton";
import { useFetchShoppingLists } from "../../api/useFetchShoppingLists";
import { useFetchConstants } from "../../api/useFetchConstants";

function ShoppingLists() {

  const { categories, units} = useFetchConstants();
  const {shoppingLists} = useFetchShoppingLists();

  const [currentOpenList, setCurrentOpenList] = useState<ShoppingList | null>(null);
  const [modalKey, setModalKey] = useState(0);

  const modalRef: RefObject<ModalRef | null> = useRef(null);

  function convertShoppingListsToTableRows(shoppingLists: ShoppingList[]): TableRow[] {
    
    return shoppingLists.map( (shoppingList) => {

      const creationDate = new Date(shoppingList.createdAt).toLocaleDateString();

      return {
        id: shoppingList.shoppingListId,
        name: shoppingList.name,
        createdAt: creationDate
      }
    })
  }

  function handleOnClickShoppingList(shoppingListId: string) {
    const currentOpenList = shoppingLists.find(list => list.shoppingListId === shoppingListId)!;
    setCurrentOpenList(currentOpenList);

    modalRef.current?.open();
  }

  function handleOnClose() {
    modalRef.current?.close();

    // workaround to cancel all changes in ShoppingList component
    refreshModal();
  }

  function refreshModal() {
    setModalKey(prevModalKey => prevModalKey + 1);
  }

  return (
    <PageContent title="Shopping Lists">

      <SearchInput placeholder="Weekend Shopping List" />
      <Table headerName="List Name" rows={convertShoppingListsToTableRows(shoppingLists)} onClickItem={handleOnClickShoppingList}/>
      <Pagination/>
      <CreationButton text="Create Empty Shopping List"/> 

      <Modal
        key={modalKey}
        ref={modalRef} 
        onClose={handleOnClose}
      >
        {currentOpenList != null && 
          <ShoppingListModal 
            key={currentOpenList.shoppingListId} 
            shoppingList={currentOpenList}
            onClose={handleOnClose}
            units={units}
            categories={categories}
          />}
      </Modal>
    </PageContent>
  )
}

export default ShoppingLists;