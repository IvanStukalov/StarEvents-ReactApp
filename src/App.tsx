import React, { useEffect, useState } from "react";
import NavBar from "./components/UI/Navbar.tsx";
import StarListPage from "./components/pages/StarListPage.tsx";
import { Routes, Route, Link } from "react-router-dom";
import StarItemPage from "./components/pages/StarItemPage.tsx";
import RegPage from "./components/pages/RegPage.tsx";
import AuthPage from "./components/pages/AuthPage.tsx";
import { useUser } from "./hooks/useUser.ts";
import OrderListPage from "./components/pages/OrderListPage.tsx";
import OrderItemPage from "./components/pages/OrderItemPage.tsx";
import Loader from "./components/UI/Loader.tsx";
import CreateStarPage from "./components/pages/CreateStarPage.tsx";
import StarTablePage from "./components/pages/StarTablePage.tsx";

const App: React.FC = () => {
  const [navloading, setNavLoading] = useState<boolean>(false);
  const [draftId, setDraftId] = useState<number>(0);
  const [starChanged, setStarChanged] = useState<any>(0);

  const [path, setPath] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const setURL = (path: string, slug: string) => {
    setPath(path);
    setSlug(slug);
  }

  const { authorize } = useUser();
  useEffect(() => {
    (async () => {
      try {
        await authorize();
      } catch (error: any) {
        console.log(error.response)
      }
    })();
  }, []);


  return (
    <>
      <div style={{ fontWeight: "bold", fontSize: "1.3em", marginLeft: "10%", height: "3em", display: "flex", alignItems: "center", color: "#717274" }}>
      <Link to="/" >ЭВОЛЮЦИЯ БЛИЖАЙШИХ К СОЛНЦУ ЗВЕЗД</Link>
      </div>
      <NavBar path={path} slug={slug} draftId={draftId} setLoading={setNavLoading} />
      {
        navloading &&
        <Loader />
      }
      <Routes>
        <Route path="*" element={<StarListPage setURL={setURL} draftId={draftId} setDraftId={setDraftId} starChanged={starChanged} />} />
        <Route path="/" element={<StarListPage setURL={setURL} draftId={draftId} setDraftId={setDraftId} starChanged={starChanged} />} />
        <Route path="/starTable" element={<StarTablePage setURL={setURL} starChanged={starChanged} setStarChanged={setStarChanged} />} />
        <Route path="/star/:id" element={<StarItemPage setURL={setURL} />} />
        <Route path="/reg" element={<RegPage setURL={setURL} />} />
        <Route path="/auth" element={<AuthPage setURL={setURL} />} />
        <Route path="/orders" element={<OrderListPage setURL={setURL} />} />
        <Route path="/orders/:id" element={<OrderItemPage setURL={setURL} setDraftId={setDraftId} />} />
        <Route path="/star/create/:id" element={<CreateStarPage setURL={setURL} setStarChanged={setStarChanged} />} />
      </Routes>
    </>
  )
}

export default App
