<script setup lang="ts">
import { reactive, ref } from "vue"
import type { Ref } from "vue"

const labelBoards: Record<string, unknown> = reactive({
  toDo: [],
  inProgress: [],
  finished: []
})

const heldLabelTitle: Ref<HTMLElement | null> = ref(null)
const heldLabelDescription: Ref<HTMLElement | null> = ref(null)
const heldLabel: Ref<null | undefined | Record<string, any>> = ref({})

function addItem(item: string) {
  const innerItem: any = labelBoards[item]
  innerItem.push({
    title: heldLabel.value?.title,
    description: heldLabel.value?.description
  })
  clearHeldLabel()
}

function createHeldLabel(innerLabel: string) {
  heldLabel.value = {
    title: "",
    description: "",
    label: innerLabel
  }
}

function focusDescription(event: null | KeyboardEvent | FocusEvent, label: string) {
  if (event instanceof FocusEvent) {
    if (!heldLabel.value?.title.length) {
      clearHeldLabel()
      return
    }
  }
  if (event?.key !== "Enter") return
  heldLabelDescription.value[0].focus()
}

function clearHeldLabel() {
  heldLabel.value = {}
}

function createItem(label: string) {
  addItem(label)
}

</script>

<template>
  <div
    class="row gap-10 px-10"
  >
    <div
      v-for="(value, label, index) in labelBoards"
      :key="index"
      class="col"
    >
      <h6 class="my-4">
        {{ label }}
      </h6>
      <q-btn
        padding="5px 30px"
        icon="add"
        class="full-button"
        @click="createHeldLabel(label)"
      />
      <q-card 
        v-if="heldLabel?.label === label"
      >
        <q-card-section>
          <q-input
            ref="heldLabelTitle"
            v-model="heldLabel.title"
            class="mb-2"
            placeholder="title"
            autofocus
            outlined
            @blur="e => focusDescription(e, label)"
            @keydown="e => focusDescription(e)"
          />
          <q-input
            ref="heldLabelDescription"
            v-model="heldLabel.description"
            placeholder="description"
            outlined
            @blur="createItem(label)"
            @keydown="e => e.key === 'Enter' ? createItem(label) : ''"
          />
        </q-card-section>
      </q-card>
      <q-card 
        v-for="(item, index) in value"
        :key="index"
        class="mt-2"
      >
        <q-card-section>
          <div
            class="row justify-between"
          >
            <h6 class="mb-2 mt-0">
              {{ item.title }}
            </h6>
            <q-btn
              icon="create"
              flat
            />
          </div>
          <p class="mb-0">
            {{ item.description }}
          </p>
        </q-card-section>
      </q-card>
    </div>
    <code style="position: absolute; bottom: 0;">{{ heldLabel }}</code>
  </div>
</template>

<style scoped>
  .full-button {
    width: 100%;
  }
</style>