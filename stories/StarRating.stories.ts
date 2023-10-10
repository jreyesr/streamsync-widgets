import type { Meta, StoryObj } from "@storybook/vue3";

import StarRating from "../StarRating.vue";

const meta: Meta<typeof StarRating> = {
	component: StarRating,
};

export default meta;
type Story = StoryObj<typeof StarRating>;

const render = (args, { argTypes }) => ({
    components: { StarRating },
    props: Object.keys(argTypes),
    template: "<StarRating/>",
})

export const Simple: Story = {
	render,
	args: {
		// These appear on the injected Fields object
		props: {
			numStars: 5,
			currentStars: 2,
		},
		// Keys in styles will be injected as CSS vars, and also in the Fields object as the props above
		styles: {
			normalSize: "x-large",
			hoverSize: "xx-large",
			accentColor: "gold",
		},
	},
};

export const ColorChange: Story = {
	render,
	args: {
		props: Simple.args.props,
		styles: {
            ...Simple.args.styles,
			accentColor: "red",
		},
	},
};
