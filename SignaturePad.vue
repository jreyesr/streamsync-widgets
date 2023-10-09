<!-- Parts of this file are Copyright 2023 (?) WangShayne

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

See https://github.com/WangShayne/vue3-signature/blob/main/src/components/Vue3Signature.vue
-->

<template>
    <div class="container" ref="rootEl">
        <div :style="{ width: '100%', height: fields.height.value }" @touchmove.prevent>
            <canvas :id="state.uid" class="canvas" :data-uid="state.uid"></canvas>
            <button title="Clear" class="floating-right clear-button" @click="clear">Clear</button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    streamsync: {
        name: "Signature Pad",
        description: "Provides a space to hand-draw a signature.",
        category: "Input",

        fields: {
            height: {
                name: "Height",
                desc: "Height of the component",
                type: FieldType.Text,
                default: "400px",
            },

            // Styles
            accentColor: { ...accentColor, default: "black" },
            containerBackgroundColor: { ...containerBackgroundColor, default: "#f8f8f8" },
        },

        events: {
            "signature-change": {
                desc: "Emitted when the drawn signature is changed.",
                stub: `def onchange_handler(state, payload):\n	print(payload)\n	state["current_sig"] = payload`
            },
        },
    },
};

</script>

<script setup lang="ts">
import { FieldCategory, FieldType } from "../streamsyncTypes";
import injectionKeys from "../injectionKeys";
import { Ref, inject, computed, ref, reactive } from "vue";

import SignaturePad from "signature_pad";

import {
    accentColor,
    containerBackgroundColor
} from "../renderer/sharedStyleFields";
import { onMounted } from "vue";


const fields = inject(injectionKeys.evaluatedFields);
const rootEl: Ref<HTMLElement> = ref(null); // Root element is used to fire events

function emitChangeEvent(dataURL: string) {
    const event = new CustomEvent("signature-change", {
        detail: {
            payload: dataURL.replace(/^(data:image\/png;base64,)/, ""),
        },
    });
    rootEl.value.dispatchEvent(event);
}

const options = computed(() => ({ penColor: fields.accentColor.value, backgroundColor: fields.containerBackgroundColor.value }))
let state = reactive({
    sig: null,
    option: options,
    uid: "",
});
state.uid = "canvas" + Math.random();

const draw = () => {
    let canvas = document.getElementById(state.uid) as HTMLCanvasElement;
    state.sig = new SignaturePad(canvas, state.option);

    function resizeCanvas(c: HTMLCanvasElement) {
        // if there were any contents, preserve them before resizing (resizing nukes the Canvas)
        let url;
        if (!state.sig.isEmpty()) {
            url = state.sig.toDataURL();
        }

        // Compute new canvas size and force resize everything
        let ratio = Math.max(window.devicePixelRatio || 1, 1);
        c.width = c.offsetWidth * ratio;
        c.height = fields.height.value.replace(/px/g, "") * ratio;
        c.getContext("2d").scale(ratio, ratio);

        // clear and restore the previous contents, if they existed
        state.sig.clear();
        if (url !== undefined) {
            state.sig.fromDataURL(url);
        };
    }

    window.addEventListener("resize", () => resizeCanvas(canvas));
    resizeCanvas(canvas);

    // Turn on event listeners
    state.sig.addEventListener("endStroke", () => {
        emitChangeEvent(state.sig.toDataURL());
    });
    emitChangeEvent(state.sig.toDataURL());

    state.sig.on();
};
onMounted(() => draw());

function clear() {
    state.sig?.clear();
    emitChangeEvent(state.sig.toDataURL())
}
</script>

<style scoped>
.container {
    position: relative;
}

.floating-right {
    position: absolute;
    top: 10px;
    right: 10px;
}

.clear-button {
    padding: 5px;
    border-radius: 5px;
    border-width: 0px;
    background-color: transparent;
}

canvas {
    width: 100%;
    height: 100%;
}
</style>