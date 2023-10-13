<template>
    <div ref="rootEl">
        <vue-cal class="vuecal--blue-theme" hide-view-selector active-view="week" today-button
            :events="fields.entries.value" :on-event-click="onEventClick" :time-from="timeToMinutes(fields.hourStart.value)"
            :time-to="timeToMinutes(fields.hourEnd.value)" :time-cell-height="50"></vue-cal>
    </div>
</template>

<script lang="ts">
const sampleEvents = [
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
];

export default {
    streamsync: {
        name: "Agenda",
        description: "Shows a weekly calendar with a set of events. See the docs for the vue-cal package: https://antoniandre.github.io/vue-cal",
        category: "Content",

        fields: {
            entries: {
                name: "Entries",
                desc: "Entries that appear in the calendar",
                default: JSON.stringify(sampleEvents, null, 2),
                type: FieldType.Object,
            },
            hourStart: {
                name: "Start time",
                desc: "At which hour does the calendar start",
                default: "00:00",
                type: FieldType.Text,
            },
            hourEnd: {
                name: "End time",
                desc: "At which hour does the calendar end",
                default: "24:00",
                type: FieldType.Text,
            },
            height:
            {
                name: "Height",
                type: FieldType.Text,
                default: "50vh",
                category: FieldCategory.Style,
                applyStyleVariable: true,
            }
        },

        events: {
            "event-clicked": {
                desc: "Emitted when an event is clicked.",
                stub: `def on_event_clicked(state, payload):\n	print(payload)`
            },
        },
    },
}
</script>

<script setup lang = "ts" >
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { FieldType, FieldCategory } from '../streamsyncTypes';
import { Ref, inject, ref } from 'vue';
import injectionKeys from '../injectionKeys';

function timeToMinutes(t: string): number {
    const parts = t.split(":")
    return parseInt(parts[0]) * 60 + parseInt(parts[1])
}


function onEventClick(clickedEvent) {
    const payload = clickedEvent;
    const event = new CustomEvent("event-clicked", {
        detail: {
            payload,
        },
    });
    rootEl.value.dispatchEvent(event);
}

const rootEl: Ref<HTMLElement> = ref(null);
const fields = inject(injectionKeys.evaluatedFields);
</script>

<style scoped>
.vuecal {
    height: var(--height);
}
</style>