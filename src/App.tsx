import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar.tsx";
import StarListPage from "./components/pages/StarListPage.tsx";
import { Routes, Route } from "react-router-dom";
import StarItemPage from "./components/pages/StarItemPage.tsx";
import { StarListMock } from "./models/mocks.ts";
import { Star } from "./models/models.ts";

const App: React.FC = () => {
  const [starList, setStarList] = useState<Star[]>([]);

  useEffect(() => {
    getStarList("");
  }, []);

  const getStarList = async (queryParam: string) => {
    try {
      let queryString = "http://localhost:3000/api/star"
      if (queryParam) {
        queryString += `?name=${queryParam}`
      }
      const response = await fetch(queryString);
      const data = await response.json();
      setStarList(data.stars);
    } catch (error) {
      console.log(error)
      setStarList(StarListMock);
    }
  }

  const [path, setPath] = useState<String>("");
  const emergeData = (path: String) => {
    setPath(path);
  }
  
  return (
    <>
      <NavBar path={path}/>
      <Routes>
        <Route path="/" element={<StarListPage starList={starList} getStarList={getStarList} emergeData={emergeData}/>} />
        <Route path="/star/:id" element={<StarItemPage emergeData={emergeData}/>} />
      </Routes>

    </>
  )
}

export default App
