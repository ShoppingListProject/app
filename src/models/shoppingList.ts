export interface ShoppingListItem {
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
  category: string;
}

export interface RecipeCreate {
  name: string;
  items: ShoppingListItem[];
}

export interface Recipe extends RecipeCreate {
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingCategoryMap {
  [category: string]: ShoppingListItem[]
}

export interface ShoppingList {
  createdAt: string;
  updatedAt: string;
  name: string;
  itemsPerCategory: ShoppingCategoryMap;
}



