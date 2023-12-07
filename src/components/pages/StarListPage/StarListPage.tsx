import React from "react";
import { Star } from "../../../models/models";
import CardList from "../../CardList/CardList";
import Input from "../../UI/Input/Input";

interface Props {
	starList: Star[]
}

const StarListPage: React.FC<Props> = ({ starList }) => {
	return (
		<>
			<Input/>

      <CardList starList={starList}/>
		</>
	)
}

export default StarListPage;
