import React, { useEffect, useState } from 'react';
import AddItemModel from './AddItemModel';
import CartItem from './CartItem';

const ViewCart = () => {
	const [cartItems, setCartItems] = useState([]);
	const [cartOwner, setCartOwner] = useState('');

	const loadCart = async () => {
		if (localStorage.getItem('prime') == 'false') {
			const cartNameResponse = await fetch(
				'https://wci-neo-dev-2025api.vercel.app/user/getCart',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ name: localStorage.getItem('name') }),
				}
			);

			const cartNameData = await cartNameResponse.json();
			setCartOwner(cartNameData.cart);
		} else {
			setCartOwner(localStorage.getItem('name'));
		}
		const response = await fetch(
			'https://wci-neo-dev-2025api.vercel.app/cart/getCart',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					owner: cartOwner,
				}),
			}
		);

		if (response.ok) {
			const data = await response.json();
			console.log('Cart Items:');
			console.log(data);
			setCartItems(data.items);
			console.log(cartItems);
		} else {
			const error = await response.text();
			alert(`Failed to load cart: ${error}`);
		}
	};

	useEffect(() => {
		loadCart();
	}, []);

	let cartContent;
	const [isModalOpen, setIsModalOpen] = useState(false);

	if (cartItems.length === 0) {
		cartContent = (
			<div className="flex flex-col items-center justify-center gap-4">
				<img
					src="smile_face.svg"
					alt="Happy Face"
					className="w-64 h-64 mt-8 object-contain rounded"
				/>
				<h1 className="text-neutral px-20 py-3 flex flex-row items-center justify-between text-3xl align-middle">
					You are all caught up!
				</h1>
				<button
					className="text-textColor bg-button rounded py-2 px-4 hover:bg-blue-200 transition"
					onClick={() => setIsModalOpen(true)}
				>
					Add to Cart
				</button>
			</div>
		);
	} else {
		cartContent = cartItems.map((item) => (
			<CartItem item={item} key={item.id || item._id || item.name} />
		));
	}

	// render modal for adding items
	const modal = (
		<AddItemModel
			isOpen={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			onAdded={() => {
				setIsModalOpen(false);
				loadCart();
			}}
			cartOwner={cartOwner}
		/>
	);

	return (
		<>
			{cartContent}
			{modal}
		</>
	);
};

export default ViewCart;
