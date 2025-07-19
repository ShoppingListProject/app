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

export interface Recipe extends RecipeCreate{
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingListCreate {
  name: string;
  items: ShoppingListItem[];
}

export interface ShoppingList extends ShoppingListCreate{
  id: string;
  createdAt: string;
  updatedAt: string;
}
