import React from "react";
import NavBar from "./components/Navbar.tsx";
import StarListPage from "./components/pages/StarListPage.tsx";
import { Routes, Route } from "react-router-dom";
import StarItemPage from "./components/pages/StarItemPage.tsx";

const App: React.FC = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<StarListPage />} />
        <Route path="/:id" element={<StarItemPage />} />
      </Routes>

    </>
  )
}

export default App
