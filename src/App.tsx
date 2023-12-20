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

  const getStarList = async (queryParam: string, distTop?: number, distBot?: number, ageTop?: number, ageBot?: number, magTop?: number, magBot?: number) => {
    try {
      let queryString = "http://localhost:3000/api/star?"

      if (queryParam) {
        queryString += `name=${queryParam}&`;
      }

      if (distTop) {
        queryString += `dist_top=${distTop}&`;
      }

      if (distBot) {
        queryString += `dist_bot=${distBot}&`;
      }

      if (ageTop) {
        queryString += `age_top=${ageTop}&`;
      }

      if (ageBot) {
        queryString += `age_bot=${ageBot}&`;
      }

      if (magTop) {
        queryString += `mag_top=${magTop}&`;
      }

      if (magBot) {
        queryString += `mag_bot${magBot}`;
      }

      const response = await fetch(queryString);
      const data = await response.json();

      setStarList(data.stars);
    } catch (error) {
      console.log(error)
      setStarList(StarListMock);
    }
  }

  const [path, setPath] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const emergeData = (path: string, slug: string) => {
    setPath(path);
    setSlug(slug);
  }

  return (
    <>
      <NavBar path={path} slug={slug} />
      <Routes>
        <Route path="*" element={<StarListPage starList={starList} getStarList={getStarList} emergeData={emergeData} />} />
        <Route path="/" element={<StarListPage starList={starList} getStarList={getStarList} emergeData={emergeData} />} />
        <Route path="/star/:id" element={<StarItemPage emergeData={emergeData} />} />
      </Routes>

    </>
  )
}

export default App
