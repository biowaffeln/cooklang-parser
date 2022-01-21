export interface TextToken {
	type: "text";
	value: string;
}

export interface IngredientToken {
	type: "ingredient";
	name: string;
	quantity: string | number;
	units: string;
}

export interface CookwareToken {
	type: "cookware";
	name: string;
	quantity: string | number;
}

export interface TimerToken {
	type: "timer";
	name: string;
	quantity: string | number;
	units: string;
}

export const text = (value: string): TextToken => ({
	type: "text",
	value,
});

export const ingredient = (
	name: string,
	quantity: string | number,
	units: string
): IngredientToken => ({
	type: "ingredient",
	name,
	quantity,
	units,
});

export const cookware = (
	name: string,
	quantity: string | number
): CookwareToken => ({
	type: "cookware",
	name,
	quantity,
});

export const timer = (
	name: string,
	quantity: string | number,
	units: string
): TimerToken => ({
	type: "timer",
	name,
	quantity,
	units,
});
