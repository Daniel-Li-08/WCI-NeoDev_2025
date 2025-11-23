import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	// null = not selected yet; will force user to choose
	const [isPrime, setIsPrime] = useState(null);
	const [message, setMessage] = useState(<></>);
	const [errorMessage, setErrorMessage] = useState('');
	const [primeMessage, setPrimeMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const name = localStorage.getItem('name');
		if (name !== null) {
			navigate('/cart');
		}
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Handle login logic here
		const data = JSON.stringify({
			name: username,
			pw: password,
			prime: isPrime,
		});
		console.log(data);
		try {
			const response = await fetch(
				'https://wci-neo-dev-2025api.vercel.app/user/create',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: data,
				}
			);

			if (response.ok) {
				setMessage(<p className="text-textColor">Success</p>);
				localStorage.setItem('name', username);
				localStorage.setItem('pw', password);
				// store both keys to keep other parts of the app compatible
				localStorage.setItem('prime', String(isPrime));
				localStorage.setItem('isPrime', String(isPrime));
				navigate('/cart');
			} else if (response.status === 400) {
				const error = await response.text();
				console.log(error);
				if (error === 'Name taken') {
					setErrorMessage('Username is already taken');
				} else {
					alert('A 400 error occurred: ' + error);
				}
			} else {
				const error = await response.text();
				alert('An unexpected error occurred: ' + error);
			}
		} catch (err) {
			alert('An unexpected error occurred: ' + err);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center my-[10vw]">
			<div className="p-8 w-full max-w-[30rem]">
				<h2 className="text-4xl font-bold mb-6 text-center text-textColor">
					Sign up
				</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					<p
						className={`font-semibold text-1xl ${
							errorMessage === 'Username is already taken'
								? 'text-red-500'
								: 'text-textColor'
						}`}
					>
						{errorMessage || 'Username'}
					</p>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
							setErrorMessage('');
						}}
						className="p-2 border rounded-[0.5rem] mb-2 focus:outline-none focus:ring-2 focus:ring-blue placeholder-textColor bg-button"
						required
					/>
					<p className="text-textColor font-semibold">Password</p>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="p-2 border rounded-[0.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-textColor bg-button"
						required
					/>
					<fieldset className="mt-2 flex flex-col text-textColor">
						<legend className="mb-2 text-textColor text-center font-semibold">
							Are you a Prime member?{' '}
							<span className="text-red-500 font-semibold">{primeMessage}</span>
						</legend>
						<div className="flex items-center justify-center gap-6">
							<label className="flex items-center gap-2">
								<input
									type="radio"
									name="isPrime"
									value="yes"
									checked={isPrime === true}
									onChange={(e) => {
										setIsPrime(true);
										// clear any custom validation message when user selects
										e.target.setCustomValidity('');
										setPrimeMessage('');
									}}
									onInvalid={(e) => {
										e.target.setCustomValidity('Please select Yes or No');
										setPrimeMessage(' Please select Yes or No');
									}}
									required
									className="accent-textColor"
								/>
								Yes
							</label>
							<label className="flex items-center gap-2">
								<input
									type="radio"
									name="isPrime"
									value="no"
									checked={isPrime === false}
									onChange={(e) => {
										setIsPrime(false);
										// clear any custom validation message when user selects
										e.target.setCustomValidity('');
										setPrimeMessage('');
									}}
									className="accent-textColor"
								/>
								No
							</label>
						</div>
					</fieldset>
					<button
						type="submit"
						className="text-textColor bg-button py-2 mt-4 rounded hover:bg-blue-200 transition"
					>
						Sign Up
					</button>
					<a
						href="/login"
						className="text-center text-textColor mt-4 hover:text-blue-200 transition"
					>
						Login Instead
					</a>
					{message}
				</form>
			</div>
		</div>
	);
};

export default SignUp;
