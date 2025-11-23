import { useNavigate } from 'react-router-dom';

const CreateCart = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<img
				src="sad_face.svg"
				alt="Happy Face"
				className="w-64 h-64 mt-8 object-contain rounded"
			/>
			<h1 className="text-neutral px-20 py-3 flex flex-row items-center justify-between text-3xl align-middle">
				You currently don't have a cart!
			</h1>
			<button
				className="text-textColor font-semibold text-2xl bg-button rounded py-2 px-4 hover:bg-blue-200 transition"
				onClick={async () => {
					const response = await fetch(
						'https://wci-neo-dev-2025api.vercel.app/cart/create',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								owner: localStorage.getItem('name'),
							}),
						}
					);
					if (response.ok) {
						navigate('/cart');
						window.location.reload();
					} else {
						const errorData = await response.text();
						alert(`Error creating cart: ${errorData}`);
					}
				}}
			>
				Create Cart
			</button>
		</div>
	);
};

export default CreateCart;
