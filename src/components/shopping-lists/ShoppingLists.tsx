import PageContent from "../shared/PageContent";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import Pagination from "../shared/table/Pagination";
import { useEffect, useRef, useState, type RefObject } from "react";
import { getShoppingLists } from "../../api/shoppingList";
import { getUnits } from "../../api/units";
import type { CategorizedItems, ShoppingList } from "../../models/shoppingList";
import type { TableRow } from "../../models/tableModels";
import Modal, { type ModalRef } from "../shared/Modal";
import ShoppingListModal from "./shopping-list-modal/ShoppingListModal";
import { getCategories } from "../../api/categories";

function ShoppingLists() {

  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [currentOpenListName, setCurrentOpenListName] = useState<string | null>(null); 
  const [units, setUnits] = useState<string[]>([]);
  const [categoris, setCategoris] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
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
      .then(setCategoris)
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

  function handleOnClickItem(name: string) {
    setCurrentOpenListName(name);
    modalRef.current?.open();
  }

  function findItemsOfSelctedList(name: string): CategorizedItems[] {
    return shoppingLists.find(list => list.name === name)!.itemsPerCategory;
  }

  function handleOnEdit() {
    setIsEditMode(true);
  }

  function handleOnCancel() {
    setIsEditMode(false);
  }

  function handleOnClose() {
    modalRef.current?.close();
    setIsEditMode(false);

    // workaround to cancel all changes in ShoppingList component
    refreshModal();
  }

  function refreshModal() {
    setModalKey(prevModalKey => prevModalKey + 1);
  }

  return (
    <PageContent title="Shopping Lists">

      <SearchInput placeholder="Weekend Shopping List" />
      <Table headerName="List Name" rows={convertShoppingListsToTableRows(shoppingLists)} onClickItem={handleOnClickItem}/>
      <Pagination/>

      <Modal
        key={modalKey}
        ref={modalRef} 
        title={currentOpenListName} 
        onClose={handleOnClose}
      >
        {currentOpenListName != null && 
          <ShoppingListModal 
            key={currentOpenListName} 
            itemsPerCategory={findItemsOfSelctedList(currentOpenListName)} 
            onCancel={handleOnCancel}
            isEditMode={isEditMode}
            onEdit={handleOnEdit}
            units={units}
            categoris={categoris}
          />}
      </Modal>
      

    </PageContent>
  )
}

export default ShoppingLists;