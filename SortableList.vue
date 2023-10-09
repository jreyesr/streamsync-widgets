<!-- This file contains code that was adapted from /ui/src/core_components/CoreRepeater.vue
in the Streamsync repo: https://github.com/streamsync-cloud/streamsync/blob/master/ui/src/core_components/CoreRepeater.vue,
which is under the Apache-2.0 license -->

<template>
    <div data-streamsync-container class="container" ref="rootEl">
        <Sortable v-if="children.length > 0" ref="sortableRef" :list="sortableList" itemKey="__key" :options="options"
            @update="onUpdate" class="container">
            <template #item="{ element, index, key }">
                <div :key="key" class="elem" :data-id="key">
                    <i class="ri-draggable handle"></i>
                    <component :is="() => renderChild(index)" />
                </div>
            </template>
        </Sortable>
        <slot v-else></slot> <!-- This is used when the Repeater has no child elements -->
    </div>
</template>

<script lang="ts">
const defaultRepeaterObject = {
    a: { desc: "Option A" },
    b: { desc: "Option B" },
};

const options = {
    animation: 200,
    handle: ".handle"
}

export default {
    streamsync: {
        name: "Sortable List",
        description: "Renders a list where elements can be drag-and-dropped to reorder them.",
        category: "Layout",
        allowedChildrenTypes: ["inherit"],
        fields: {
            repeaterObject: {
                name: "Repeater object",
                default: JSON.stringify(defaultRepeaterObject, null, 2),
                type: FieldType.Object,
                desc: "Include a state reference to the dictionary used for repeating the child components. Alternatively, specify a JSON object.",
            },
            keyVariable: {
                name: "Key variable name",
                default: "itemId",
                init: "itemId",
                type: FieldType.Text,
                desc: "Set the name of the variable that will store the key of the current repeater object entry.",
            },
            valueVariable: {
                name: "Value variable name",
                default: "item",
                init: "item",
                type: FieldType.Text,
                desc: "Set the name of the variable that will store the value of the current repeater object entry.",
            },
        },
        events: {
            "list-reorder": {
                desc: "Emitted when the list is reordered.",
                stub: `def onreorder_handler(state, payload):\n	print(payload)\n	state["list"] = payload`
            }
        }
    },
};
</script>

<script setup lang="ts">
import { FieldType } from "../streamsyncTypes";
import injectionKeys from "../injectionKeys";
import { inject, computed, ref } from "vue";

import { Sortable } from "sortablejs-vue3"

const sortableRef = ref(null);
const rootEl = ref(null); // Root element is used to fire events

const fields = inject(injectionKeys.evaluatedFields);
const ss = inject(injectionKeys.core);
const componentId = inject(injectionKeys.componentId);
const renderProxiedComponent = inject(
    injectionKeys.renderProxiedComponent
);

const sortableList = computed(() => Object.entries(fields.repeaterObject.value).map(([k, v]: [string, any]) => ({ ...v, __key: k })))

const children = computed(() => ss.getComponents(componentId, true));

function renderChild(itemIndex) {
    return children.value.map((childComponent) =>
        renderProxiedComponent(childComponent.id, itemIndex)
    )
}

function onUpdate() {
    const newIDs = sortableRef.value.sortable.toArray();
    const newObject = Object.fromEntries(newIDs.map(id => [id, fields.repeaterObject.value[id]]))
    const event = new CustomEvent("list-reorder", {
        detail: {
            payload: newObject,
        },
    });
    rootEl.value.dispatchEvent(event);
}
</script>

<style scoped>
.container:not(.childless) {
    display: contents;
}

[data-streamsync-container].horizontal .container.childless {
    flex: 1 0 auto;
}

.handle {
    cursor: move;
}

.elem {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
}
</style>