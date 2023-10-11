import { Preview } from "@storybook/vue3";
import injectionKeys from "../../injectionKeys";
import { ref } from "vue";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [
		(story, { args, parameters }) => {
			// Streamsync expects the component's configurable params to be passed as an Object with Ref values
			let fields = {};
			for (const k of Object.keys(args)) {
				fields[k] = ref(args[k]);
			}

			// For each style, build up the CSS vars and plop them on a wrapper object
			let styles = {};
			for (const k of parameters.styleProps) {
				styles["--" + k] = args[k];
			}	

			return {
				components: { story },
				template: `<div :style='${JSON.stringify(
					styles,
				)}'><story /></div>`,
				name: "Style Provider",
				provide: {
					[injectionKeys.evaluatedFields as symbol]: fields,
				},
			};
		},
	],
};

export default preview;
