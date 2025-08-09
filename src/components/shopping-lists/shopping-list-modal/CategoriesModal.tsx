import { useState } from "react";
import type { CategorizedItems } from "../../../models/shoppingList";

interface CategoriesModalProps {
  editedItemsPerCategory: CategorizedItems[]
  categories: string[]
  onAddNewCategory: (newCategory: string) => void
}

function CategoriesModal({editedItemsPerCategory, categories, onAddNewCategory}: CategoriesModalProps) {

  const [isAddCategoryClicked, setIsAddCategoryClicked] = useState(false);

    const usedCategories: string[] = editedItemsPerCategory.map( 
      (catagorizedItems: CategorizedItems) => catagorizedItems.category
    )
  
    const unusedCateogries = categories.filter(category => {
  
      // TODO - remove name property
  
      if(usedCategories.includes(category.name))
        return false;
  
      return true;
    })

  return (
    <div className="flex justify-center">
      <button 
        className="bg-green-300 rounded hover:bg-green-400 cursor-pointer px-2 py-1 mt-2 shadow relative"
        onClick={() => setIsAddCategoryClicked( prevIsAddCategoryClicked => !prevIsAddCategoryClicked )}
        >
        <span>Add New Category</span>
        {
          isAddCategoryClicked && 
              <>
                <div className="fixed inset-0 cursor-default bg-black/50"></div>
                <ul className="fixed mb-2 bottom-30 max:h-1/2 left-1/2 -translate-x-1/2 shadow rounded-lg bg-blue-200 overflow-x-auto border text-xl max-h-100 overscroll-contain">
                  
                  {/* TODO - remove the name property from category later */}

                  {unusedCateogries.map(category => 
                    <li 
                      className="py-5 px-20 hover:bg-blue-300 border-b-2" 
                      onClick={() => onAddNewCategory(category.name)}
                      key={category.name} >
                        {category.name}
                    </li>
                  )}
                </ul>
              </>
        }
      </button>
    </div>
  )
}

export default CategoriesModal;