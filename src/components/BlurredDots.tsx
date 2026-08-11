import React from "react";

export interface BlurredDotsProps {
	count?: number;
}

export const BlurredDots: React.FC<BlurredDotsProps> = ({ count = 8 }) => {
	const colors = ["dot-mint", "dot-peach", "dot-sage", "dot-coral"];

	const dots = Array.from({ length: count }, (_, index) => ({
		id: index,
		left: (index * 37 + 13) % 100,
		top: (index * 53 + 7) % 100,
		size: 200 + ((index * 71) % 300),
		color: colors[index % colors.length],
		duration: 15 + ((index * 3) % 5),
		animationDelay: (index * 7) % 15,
	}));

	return (
		<div className="blurred-dots">
			{dots.map((dot) => (
				<div
					key={dot.id}
					className={`dot ${dot.color}`}
					style={{
						left: `${dot.left}%`,
						top: `${dot.top}%`,
						width: `${dot.size}px`,
						height: `${dot.size}px`,
						animation: `float ${dot.duration}s ease-in-out infinite`,
						animationDelay: `${dot.animationDelay}s`,
					}}
				/>
			))}
		</div>
	);
};

export default BlurredDots;
