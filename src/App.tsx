import Main from './components/Main';
import NavBar from './components/nav-bar/NavBar';
import { BrowserRouter, Route, Routes } from "react-router";
import ShoppingLists from './components/shopping-lists/ShoppingLists';
import CreateShoppingList from './components/shopping-lists/CreateShoppingList';
import Profile from './components/profile/Porfile';
import LoginPage from './components/authorization/LoginPage';
import NotFound from './components/other/NotFound';
import RegistrationPage from './components/authorization/RegistrationPage';
import Recipes from './components/recipes/Recipes';

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Main />} />
          <Route path="/shopping-lists" element={<ShoppingLists />} />
          <Route path="/create-shopping-list" element={<CreateShoppingList />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
