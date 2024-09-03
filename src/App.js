import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen"
import NotFound from "./components/NotFound";
import Restaurants from "./screens/user/restaurants"
import CreateRestaurant from "./screens/admin/createRestaurant";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route exact path="/order-online" element={<Restaurants />} />
        <Route path="/admin/create-restaurant" element={<CreateRestaurant />} />
        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
