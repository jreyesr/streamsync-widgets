import type { Meta, StoryObj } from "@storybook/vue3";

import Agenda from "../Agenda.vue";

const meta: Meta<typeof Agenda> = {
	component: Agenda,
	parameters: {
		styleProps: ["height"],
	},
};

export default meta;
type Story = StoryObj<typeof Agenda>;

const render = (args, { argTypes }) => ({
	components: { Agenda },
	props: Object.keys(argTypes),
	template: "<Agenda/>",
});

export const Simple: Story = {
	render,
	args: {
		entries: [],
		hourStart: "09:00",
		hourEnd: "14:00",
		height: "400px",
	},
};

export const WithEvents: Story = {
	render,
	args: {
		entries: [
			{
				id: 1,
				title: 'Doctor appointment',
				content: 'Go visit the doctor',
				start: "2023-10-09 11:00",
				end: "2023-10-09 12:00",
			},
			{
				id: 2,
				title: 'Concert',
				content: 'Piano concert',
				start: "2023-10-09 18:00",
				end: "2023-10-09 19:30",
			},
		],
		hourStart: "09:00",
		hourEnd: "22:00",
		height: "400px",
	},
};

export const OverlappingEvents: Story = {
	render,
	args: {
		entries: [
			{
				id: 1,
				title: 'Doctor appointment',
				content: 'Go visit the doctor',
				start: "2023-10-09 11:00",
				end: "2023-10-09 12:00",
			},
			{
				id: 2,
				title: 'Another Doctor appointment',
				content: 'Concurrently visit another doctor',
				start: "2023-10-09 11:30",
				end: "2023-10-09 12:30",
			},
		],
		hourStart: "09:00",
		hourEnd: "22:00",
		height: "400px",
	},
};

