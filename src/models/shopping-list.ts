export interface ShoppingListItem {
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
  category: string;
}

export interface Recipe {
  id: string;
  name: string;
  items: ShoppingListItem[]
}

export interface ShoppingListCreateRequest {
  name: string;
  items: ShoppingListItem[];
}

export interface ShoppingList extends ShoppingListCreateRequest{
  id: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}
