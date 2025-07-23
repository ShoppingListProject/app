export interface ShoppingListItem {
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
}

export interface RecipeCreate {
  name: string;
  items: ShoppingListItem[];
}

export interface Recipe extends RecipeCreate {
  createdAt: string;
  updatedAt: string;
}

export interface CategorizedItems {
  category: string,
  items: ShoppingListItem[]
}

export interface ShoppingList {
  createdAt: string;
  updatedAt: string;
  name: string;
  itemsPerCategory: CategorizedItems[];
}



