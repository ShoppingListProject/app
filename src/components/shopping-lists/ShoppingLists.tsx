import PageContent from "../shared/PageContent";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import Pagination from "../shared/table/Pagination";
import { useRef, useState, type RefObject } from "react";
import type { ShoppingList } from "@shopping-list-project/sl-api-models";
import type { TableRow } from "../../models/tableModels";
import Modal, { type ModalRef } from "../shared/modal/Modal";
import ShoppingListModal from "./ShoppingListModal";
import CreationButton from "../shared/CreationButton";
import { useGetConstants } from "../../api-hooks/useGetConstants";
import { useGetShoppingLists } from "../../api-hooks/useGetShoppingLists";
import useDeleteShoppingList from "../../api-hooks/useDeleteShoppingList";

function ShoppingLists() {

  const { categories, units} = useGetConstants();
  const { shoppingLists, retrieveShoppingLists } = useGetShoppingLists();
  const { removeShoppingList } = useDeleteShoppingList();

  const [currentOpenList, setCurrentOpenList] = useState<ShoppingList | null>(null);
  const [doesCurrentOpenListExist, setDoesCurrentOpenListExist] = useState<boolean | null>(null);
  const [modalKey, setModalKey] = useState(0);
  const [isNecessaryToRefreshData, setIsNecessaryToRefreshData] = useState(false);

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

    setDoesCurrentOpenListExist(true);
    modalRef.current?.open();
  }

  function handleOnClose() {

    function refreshModal() {
      setModalKey(prevModalKey => prevModalKey + 1);
    }

    modalRef.current?.close();
    refreshModal();
    setDoesCurrentOpenListExist(null);

    if(isNecessaryToRefreshData) {
      refreshData();
    }

    setIsNecessaryToRefreshData(false);
  }

  function openEmptyShoppingList() {

    const newEmptyShoppingList: ShoppingList = {
      name: "My New Shopping List",
      itemsPerCategory: [],
      shoppingListId: crypto.randomUUID(),
      updatedAt: new Date(),
      createdAt: new Date(),
    }

    setDoesCurrentOpenListExist(false);
    setCurrentOpenList(newEmptyShoppingList);
    modalRef.current?.open();
  }

  function handleOnSaveChanges() {
    setIsNecessaryToRefreshData(true);
  }

  async function handleOnDelete(shoppingListId: string) {
  
    const shoppingList: ShoppingList | null = await removeShoppingList(shoppingListId);

    if(shoppingList != null) {
      refreshData();
    }
  }

  function refreshData() {
    retrieveShoppingLists();
  }

  return (
    <PageContent title="Shopping Lists">

      <SearchInput placeholder="Weekend Shopping List" />
      <Table
        headerName="List Name" 
        rows={convertShoppingListsToTableRows(shoppingLists)}
        onClickItem={handleOnClickShoppingList}
        onDeleteItem={handleOnDelete}
      />
      <Pagination/>
      <CreationButton text="Create Empty Shopping List" onClick={openEmptyShoppingList}/> 

      <Modal
        key={modalKey}
        ref={modalRef} 
        onClose={handleOnClose}
      >
        {currentOpenList != null && 
          <ShoppingListModal 
            key={currentOpenList.shoppingListId} 
            shoppingList={currentOpenList}
            units={units}
            categories={categories}
            onClose={handleOnClose}
            onSaveChanges={handleOnSaveChanges}
            doesShoppingListExists={doesCurrentOpenListExist!}
          />}
      </Modal>
    </PageContent>
  )
}

export default ShoppingLists;