/**
 * Original file is © ramedina86, 
 * https://github.com/streamsync-cloud/streamsync/
 * 
 * https://github.com/streamsync-cloud/streamsync/blob/master/ui/src/injectionKeys.ts
 * 
 * Changed to only keep the one injection key that we need for Storybook
 */

import { ComputedRef, InjectionKey } from "vue";

export default {
	evaluatedFields: Symbol() as InjectionKey<Record<string, ComputedRef<any>>>,
};
