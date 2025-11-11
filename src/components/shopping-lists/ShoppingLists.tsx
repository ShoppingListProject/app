import PageContent from "../shared/PageContent";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import Pagination from "../shared/table/Pagination";
import { useEffect, useRef, useState, type RefObject } from "react";
import { getShoppingLists } from "../../api/shoppingList";
import { getUnits } from "../../api/units";
import type { CategorizedItems, ShoppingList } from "@shopping-list-project/sl-api-models";
import type { TableRow } from "../../models/tableModels";
import Modal, { type ModalRef } from "../shared/modal/Modal";
import ShoppingListModal from "./ShoppingListModal";
import { getCategories } from "../../api/categories";
import CreationButton from "../shared/CreationButton";

function ShoppingLists() {

  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [currentOpenListName, setCurrentOpenListName] = useState<string | null>(null); 
  const [units, setUnits] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [modalKey, setModalKey] = useState(0);

  const modalRef: RefObject<ModalRef | null> = useRef(null);

  useEffect( () => {

    getShoppingLists()
      .then(setShoppingLists)
      .catch((err) => console.error(err));

    getUnits()
      .then(setUnits)
      .catch((err) => console.error(err));

    getCategories()
      .then(setCategories)
      .catch((err) => console.error(err));

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

  function handleOnClickShoppingList(name: string) {
    setCurrentOpenListName(name);
    modalRef.current?.open();
  }

  function findItemsOfSelctedList(name: string): CategorizedItems[] {
    return shoppingLists.find(list => list.name === name)!.itemsPerCategory;
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
        {currentOpenListName != null && 
          <ShoppingListModal 
            key={currentOpenListName} 
            onClose={handleOnClose}
            itemsPerCategory={findItemsOfSelctedList(currentOpenListName)} 
            shoppingListName={currentOpenListName}
            units={units}
            categories={categories}
          />}
      </Modal>
    </PageContent>
  )
}

export default ShoppingLists;