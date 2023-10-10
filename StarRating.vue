<template>
    <div class="container" ref="rootEl">
        <div class="stars-container">
            <span class="star" v-for="i in Array(fields.numStars.value).keys()" @mouseenter="hovered = i + 1"
                @mouseleave="hovered = 0" @click="() => emitChangeEvent(i + 1)">
                {{ starFor(i) }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    streamsync: {
        name: "Star Rating",
        description: "Shows a rating component that uses stars to collect a number.",
        category: "Input",

        fields: {
            numStars: {
                name: "Number of stars",
                type: FieldType.Number,
                default: "5",
            },
            currentStars: {
                name: "Stars",
                type: FieldType.Number,
                desc: "The current value. Bind to state if desired"
            },

            // Styles
            accentColor: { ...accentColor, default: "gold" },
            normalSize: {
                name: "Normal size",
                type: FieldType.Text,
                category: FieldCategory.Style,
                applyStyleVariable: true,
                options: { "small": "Small", "normal": "Medium", "large": "Large", "x-large": "Larger", "xx-large": "Largest" },
                default: "x-large",
            },
            hoverSize: {
                name: "Hover size",
                type: FieldType.Text,
                category: FieldCategory.Style,
                applyStyleVariable: true,
                options: { "small": "small", "normal": "normal", "large": "large", "x-large": "x-large", "xx-large": "xx-large" },
                default: "xx-large",
            },
        },

        events: {
            "ss-number-change": {
                desc: "Emitted when a different number of stars is selected.",
                stub: `def onchange_handler(state, payload):\n	print(payload)\n	state["num_stars"] = payload`
            },
        },
    },
};

</script>

<script setup lang="ts">
import { FieldCategory, FieldType } from "../streamsyncTypes";
import injectionKeys from "../injectionKeys";
import { Ref, inject } from "vue";
import { ref } from "vue";

import {
    accentColor,
} from "../renderer/sharedStyleFields";


const fields = inject(injectionKeys.evaluatedFields);
const rootEl: Ref<HTMLElement> = ref(null); // Root element is used to fire events

const hovered = ref(0);

function starFor(i) {
    // If `hovered` is set, takes priority over the `currentStars` prop
    // Otherwise, just consider the `currentStars` prop, which probably comes from state
    if (i < (hovered.value || fields.currentStars.value)) {
        return "★"; // Filled
    } else {
        return "☆"; // Hollow
    }
}

function emitChangeEvent(i: Number) {
    console.log(i)
    const event = new CustomEvent("ss-number-change", {
        detail: {
            payload: i,
        },
    });
    rootEl.value.dispatchEvent(event);
}
</script>

<style scoped>
.container {
    width: fit-content;
}

.stars-container {
    min-height: 40px;
    display: flex;
    align-items: center;
}

.star {
    font-size: var(--normalSize);
    color: var(--accentColor);
    cursor: pointer;
}

.star:hover {
    font-size: var(--hoverSize);
}
</style>