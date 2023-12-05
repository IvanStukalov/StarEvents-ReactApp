import React from "react";
import NavBar from "./components/Navbar/Navbar.tsx";
import CardList from "./components/CardList/CardList.tsx";
import {Star} from "./models/models.ts";

const App: React.FC = () => {
  const starList: Star[] = [
    {
      id: 1,
      name: "Солнце",
      description: "Наша родная звезда, которая светит нам и греет нас",
      distance: 0,
      magnitude: -26.7,
      image: "sun.png",
      age: 5.6,
    },
    {
      id: 2,
      name: "Проксима Центавра",
      description: "Звезда, красный карлик, относящаяся к звёздной системе Альфа Центавра, ближайшая к Солнцу звезда",
      distance: 4.2,
      magnitude: 11.1,
      image: "Proxima_Centauri.jpg",
      age: 4.8,
    },
    {
      id: 3,
      name: "Звезда Барнарда",
      description: "Одиночная звезда в созвездии Змееносца",
      distance: 5.96,
      magnitude: 9.57,
      image: "Barnard.jpeg",
      age: 1.5,
    },
    {
      id: 4,
      name: "Сириус",
      description: "Ярчайшая звезда ночного неба",
      distance: 8.6,
      magnitude: -1.46,
      image: "Sirius.jpg",
      age: 3.3,
    },
    {
      id: 5,
      name: "Лейтен 726-8",
      description: "Двойная звезда в созвездии Кита",
      distance: 8.73,
      magnitude: 12.5,
      image: "Leiten.jpg",
      age: 5.3,
    },
  ]

  return (
    <>
      <NavBar/>

      <CardList starList={starList}/>
    </>
  )
}

export default App
