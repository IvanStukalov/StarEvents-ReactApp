import React, { useEffect, useState } from "react";
import NavBar from "./components/UI/Navbar.tsx";
import StarListPage from "./components/pages/StarListPage.tsx";
import { Routes, Route } from "react-router-dom";
import StarItemPage from "./components/pages/StarItemPage.tsx";
import { StarListMock } from "./models/mocks.ts";
import { Star } from "./models/models.ts";
import RegPage from "./components/pages/RegPage.tsx";
import AuthPage from "./components/pages/AuthPage.tsx";
import { api } from "./api/index.ts";
import { useUser } from "./hooks/useUser.ts";
import OrderListPage from "./components/pages/OrderListPage.tsx";
import OrderItemPage from "./components/pages/OrderItemPage.tsx";

const App: React.FC = () => {
  const [starList, setStarList] = useState<Star[]>([]);
  const [draftID, setDraftID] = useState(0);

  const getStarList = (queryParam: string, distTop: number, distBot: number, ageTop: number, ageBot: number, magTop: number, magBot: number) => {
    api.api.starList({
      name: queryParam ?? "",
      dist_top: distTop ?? "",
      dist_bot: distBot ?? "",
      age_top: ageTop ?? "",
      age_bot: ageBot ?? "",
      mag_top: magTop ?? "",
      mag_bot: magBot ?? "",
    })
      .then(res => {
        setStarList(res.data.stars)
        setDraftID(res.data.draft_id)
      })
      .catch(error => {
        console.log(error.response)
        setStarList(StarListMock.filter(star =>
          star.distance > distBot && star.distance < distTop &&
          star.age > ageBot && star.age < ageTop &&
          star.magnitude > magBot && star.magnitude < magTop &&
          star.name.includes(queryParam)));
      })
  }

  useEffect(() => {
    getStarList("", 100, 0, 13.8, 0, 100, -27);
  }, []);

  const [path, setPath] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const setURL = (path: string, slug: string) => {
    setPath(path);
    setSlug(slug);
  }

  const { authorize } = useUser();
  (async () => {
    try {
      await authorize();
    } catch (error: any) {
      console.log(error.response)
    }
  })();

  return (
    <>
      <NavBar path={path} slug={slug} draftId={draftID} />
      <Routes>
        {
          starList && starList.length !== 0 &&
          <>
            <Route path="*" element={<StarListPage starList={starList} getStarList={getStarList} setURL={setURL} setDraftId={setDraftID} />} />
            <Route path="/" element={<StarListPage starList={starList} getStarList={getStarList} setURL={setURL} setDraftId={setDraftID} />} />
          </>
        }

        <Route path="/star/:id" element={<StarItemPage setURL={setURL} />} />
        <Route path="/reg" element={<RegPage setURL={setURL} />} />
        <Route path="/auth" element={<AuthPage setURL={setURL} />} />
        <Route path="/orders" element={<OrderListPage setURL={setURL} />} />
        <Route path="/orders/:id" element={<OrderItemPage setURL={setURL} draftId={draftID} setDraftId={setDraftID} />} />
      </Routes>
    </>
  )
}

export default App
