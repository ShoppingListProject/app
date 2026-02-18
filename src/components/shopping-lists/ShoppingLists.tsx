import PageContent from "../shared/PageContent";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import Pagination from "../shared/table/Pagination";
import { useRef, useState, type RefObject } from "react";
import type { ShoppingList } from "@shopping-list-project/sl-api-models";
import type { TableRow } from "../../models/tableModels";
import Modal, { type ModalRef } from "../shared/modal/Modal";
import ShoppingListModal from "./ShoppingListModal";
import { useGetConstants } from "../../api-hooks/useGetConstants";
import { itemsPerPage, useGetShoppingLists } from "../../api-hooks/useGetShoppingLists";
import { useGetShoppingListsPages } from "../../api-hooks/useGetShoppingListsPages.tsx";
import useDeleteShoppingList from "../../api-hooks/useDeleteShoppingList";
import CreationButtons from "./CreationButtons";

export interface shoppingListState {
  currentOpenList: ShoppingList | null
  doesCurrentOpenListExist: boolean | null
}

function ShoppingLists() {

  const { categories, units} = useGetConstants();
  const { shoppingLists, retrieveShoppingLists } = useGetShoppingLists();
  const { numberOfPages, getNumberOfPages} = useGetShoppingListsPages();
  const { removeShoppingList } = useDeleteShoppingList();

  const [shoppingListState, setShoppingListState] = useState<shoppingListState>({currentOpenList: null, doesCurrentOpenListExist: null})
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
    setShoppingListState({currentOpenList, doesCurrentOpenListExist: true});

    modalRef.current?.open();
  }

  function handleOnClose() {

    function refreshModal() {
      setModalKey(prevModalKey => prevModalKey + 1);
    }

    modalRef.current?.close();
    refreshModal();
    setShoppingListState({currentOpenList: null, doesCurrentOpenListExist: null})

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

    setShoppingListState({currentOpenList: newEmptyShoppingList, doesCurrentOpenListExist: false})
    modalRef.current?.open();
  }

  function handleOnSaveChanges(shoppingList: ShoppingList) {
    setIsNecessaryToRefreshData(true);
    setShoppingListState({currentOpenList: shoppingList, doesCurrentOpenListExist: true});
  }

  async function handleOnDelete(shoppingListId: string) {
  
    const shoppingList: ShoppingList | null = await removeShoppingList(shoppingListId);

    if(shoppingList != null) {
      refreshData();
    }
  }

  function refreshData() {
    getNumberOfPages()
    retrieveShoppingLists(0);
  }

  function getShoppingListsForPage(pageNumber: number) {

    const offset = (pageNumber - 1) * itemsPerPage;

    retrieveShoppingLists(offset);
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
      <Pagination 
        numberOfPages={numberOfPages} 
        getItemsForPage={getShoppingListsForPage}         
      />

      <CreationButtons onClickCreateNewEmptyShoppingList={openEmptyShoppingList}/>

      <Modal
        key={modalKey}
        ref={modalRef} 
        onClose={handleOnClose}
      >
        {shoppingListState.currentOpenList != null && 
          <ShoppingListModal 
            key={shoppingListState.currentOpenList.shoppingListId} 
            shoppingList={shoppingListState.currentOpenList}
            units={units}
            categories={categories}
            onClose={handleOnClose}
            onSaveChanges={handleOnSaveChanges}
            doesShoppingListExists={shoppingListState.doesCurrentOpenListExist!}
          />}
      </Modal>
    </PageContent>
  )
}

export default ShoppingLists;