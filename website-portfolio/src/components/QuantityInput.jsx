import React from 'react';

function QuantityInput({ value, setValue }) {
	return (
		<div className="relative inline-flex items-center">
			<input
				type="number"
				min={1}
				value={value}
				onChange={(e) => setValue(Math.max(1, Number(e.target.value || 1)))}
				className="appearance-none no-spinner mt-1 p-2 border rounded bg-[var(--button-color)] text-[var(--text-color)] pr-12 w-32"
			/>
			<div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col">
				<button
					type="button"
					onClick={() => setValue((v) => Number(v) + 1)}
					className="w-8 h-6 flex items-center justify-center bg-[var(--button-color)] text-[var(--text-color)] rounded-t hover:bg-[#d9d0be]"
					aria-label="Increase quantity"
				>
					▲
				</button>
				<button
					type="button"
					onClick={() => setValue((v) => Math.max(1, Number(v) - 1))}
					className="w-8 h-6 flex items-center justify-center bg-[var(--button-color)] text-[var(--text-color)] rounded-b hover:bg-[#d9d0be]"
					aria-label="Decrease quantity"
				>
					▼
				</button>
			</div>
		</div>
	);
}

export default QuantityInput;
