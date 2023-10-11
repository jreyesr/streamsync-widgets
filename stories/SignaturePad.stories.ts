import type { Meta, StoryObj } from "@storybook/vue3";

import SignaturePad from "../SignaturePad.vue";

const meta: Meta<typeof SignaturePad> = {
	component: SignaturePad,
	parameters: {
		styleProps: ["accentColor", "containerBackgroundColor"],
	},
};

export default meta;
type Story = StoryObj<typeof SignaturePad>;

const render = (args, { argTypes }) => ({
	components: { SignaturePad },
	props: Object.keys(argTypes),
	template: "<SignaturePad/>",
});

export const Simple: Story = {
	render,
	args: {
		height: "200px",
		accentColor: "black",
		containerBackgroundColor: "lightgray"
	},
};

