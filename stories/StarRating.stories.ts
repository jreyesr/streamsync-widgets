import type { Meta, StoryObj } from "@storybook/vue3";

import StarRating from "../StarRating.vue";

const meta: Meta<typeof StarRating> = {
	component: StarRating,
	parameters: {
		styleProps: ["normalSize", "hoverSize", "accentColor"],
	},
};

export default meta;
type Story = StoryObj<typeof StarRating>;

const render = (args, { argTypes }) => ({
	components: { StarRating },
	props: Object.keys(argTypes),
	template: "<StarRating/>",
});

export const Simple: Story = {
	render,
	args: {
		numStars: 5,
		currentStars: 2,
		normalSize: "x-large",
		hoverSize: "xx-large",
		accentColor: "gold",
	},
};

export const ColorChange: Story = {
	render,
	args: {
		...Simple.args,
		accentColor: "red",
	},
};
