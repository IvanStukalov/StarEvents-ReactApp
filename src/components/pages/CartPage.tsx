import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ModelsStar } from "../../api/Api";
import { api } from "../../api";
import CardList from "../cards/CardList";

interface Props {
	setURL: (path: string, slug: string) => void,
	draftID: number,
}

const CartPage: React.FC<Props> = ({ setURL, draftID }) => {
	const location = useLocation();
	useEffect(() => {
		setURL(location.pathname, "Корзина");
	}, []);

	const [starList, setStarList] = useState<ModelsStar[]>([]);
	useEffect(() => {
		// getStarList();
		api.api.eventDetail(draftID)
		.then((res) => {
			setStarList(res.data.star_list)
			console.log("result", res.data.star_list, "draft:", draftID)
		})
		.catch(err => console.log(err))
	}, []);

	// const getStarList = async () => {
	// 	const response = await api.api.eventDetail(draftID);
	// 	;
	// 	console.log(starLis/t)
	// }

	return (
		<>
			<div className="cart__page">
				<h2 className="cart__header">Корзина</h2>

				<CardList starList={starList} isMain={false} />
			</div>
		</>
	);
}

export default CartPage;
