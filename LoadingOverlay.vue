<template>
    <div data-streamsync-container class="container">
        <Transition>
            <div v-if="isLoading" class="overlay">
                <div class="lds-dual-ring center"></div>
            </div>
        </Transition>

        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    streamsync: {
        name: "Loading Overlay",
        description: "Renders a semi-transparent overlay over other components, and blocks interaction with them.",
        category: "Layout",
        allowedChildrenTypes: ["image"],

        fields: {
            loading: {
                name: "Loading",
                desc: "Whether the overlay will be displayed",
                type: FieldType.Text,
                options: {
                    true: "true",
                    false: "false",
                },
                default: "false"
            },

            // Styling
            containerBackgroundColor: { ...containerBackgroundColor, default: "#a0a0a060" },
            accentColor: { ...accentColor, default: "white" },
            spinnerSize: {
                name: "Spinner size",
                type: FieldType.Text,
                category: FieldCategory.Style,
                applyStyleVariable: true,
                default: "32px",
            }
        },
    },
};
</script>

<script setup lang="ts">
import { FieldCategory, FieldType } from "../streamsyncTypes";
import injectionKeys from "../injectionKeys";
import { inject, computed } from "vue";

import {
    containerBackgroundColor,
    accentColor,
} from "../renderer/sharedStyleFields";


const fields = inject(injectionKeys.evaluatedFields);

const isLoading = computed(() => fields.loading.value === "true")
</script>

<style scoped>
div.container {
    position: relative;
}

div.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--containerBackgroundColor);
    backdrop-filter: blur(2px);
}

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.v-enter-active {
    transition: opacity 1s, backdrop-filter 1s;
}

.v-leave-active {
    transition: opacity 0.4s, backdrop-filter 0.4s;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    backdrop-filter: blur(0px);
}

/* From here onwards, code comes from https://loading.io/css/ */
/* Code is under CC0, AKA public domain */
.lds-dual-ring {
    --margin: calc(var(--spinnerSize) * 0.125);

    display: inline-block;
    width: calc(var(--spinnerSize) + 2 * var(--margin));
    height: calc(var(--spinnerSize) + 2 * var(--margin));
}

.lds-dual-ring:after {
    content: " ";
    display: block;
    width: var(--spinnerSize);
    height: var(--spinnerSize);
    margin: var(--margin);
    border-radius: 50%;
    border-width: calc(var(--margin) * 0.75);
    border-style: solid;
    border-color: var(--accentColor);
    border-color: var(--accentColor) transparent var(--accentColor) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>