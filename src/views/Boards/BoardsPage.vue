<script setup lang="ts">
import { reactive, ref } from "vue"
import type { Ref } from "vue"

const labelBoards: Record<string, unknown> = reactive({
  toDo: [],
  inProgress: [],
  finished: []
})

const heldLabel: Ref<null | undefined | Record<string, any>> = ref({})
const heldLabelDescription: Ref<HTMLElement | null> = ref(null)
const toDoLabelRef: Ref<HTMLElement | null> = ref(null)
const inProgressLabelRef: Ref<HTMLElement | null> = ref(null)
const finishedLabelRef: Ref<HTMLElement | null> = ref(null)

function addItem(item: string) {
  const innerItem: any = labelBoards[item]
  innerItem.push({
    title: heldLabel.value?.title,
    description: heldLabel.value?.description,
    isEditing: false
  })
  clearHeldLabel()
}

function createHeldLabel(innerLabel: string) {
  heldLabel.value = {
    title: "",
    description: "",
    label: innerLabel,
    isEditing: false
  }
}

function focusDescription(event: null | KeyboardEvent | FocusEvent | Event) {
  if (event instanceof FocusEvent) {
    if (heldLabel.value && heldLabel.value.hasOwnProperty('title')) {
      if (!heldLabel.value?.title.length) {
        clearHeldLabel()
        return
      }
    }
  }
  if (event instanceof KeyboardEvent && event?.key !== "Enter") return
  heldLabelDescription.value[0].focus()
}

function clearHeldLabel() {
  heldLabel.value = {}
}

function createItem(label: string) {
  addItem(label)
}

function editLabel(index: number, label: string) {
  labelBoards[label][index]["isEditing"] = true
}

function updateItem(index: number, label: string) {
  labelBoards[label][index]['isEditing'] = false
}

function moveLabel(e, currentIndex, currentLabel) {
  const clickPath = e.path
  let clickedItem = clickPath.filter(node => {
    if (node.className) {
      return node.className.indexOf("listed-label") !== -1 ? true : false
    }
    return false
  })
  clickedItem = clickedItem[0]
  window.isMovingLabel = true
  window.onmousemove = (event) => {
    if (window.isMovingLabel) {
      clickedItem.classList.add("label-backgrounded")
      const { x, y } = event
      const topValue = (y - (93 / 2))
      const leftValue = (x - (402 / 2))
      clickedItem.style.top = `${topValue}px`
      clickedItem.style.left = `${leftValue}px`
      clickedItem.style.position = "absolute"
    } else {
      window.onmousemove = {}
      if (clickPath[0].tagName === "I" || clickPath[0].className.indexOf("q-btn") !== -1) return false
      const labelBoardsRefs = [toDoLabelRef, inProgressLabelRef, finishedLabelRef]
      const labelBoardsValues = labelBoardsRefs.map(label => label.value[0].getBoundingClientRect().x)
      const clickedItemPositions = clickedItem.getBoundingClientRect()
      const closestValue = labelBoardsRefs.reduce((prev, curr) => Math.abs(curr.value[0].getBoundingClientRect().x - clickedItemPositions.x) < Math.abs(prev.value[0].getBoundingClientRect().x - clickedItemPositions.x) ? curr : prev)
      const droppedLabel = Object.keys(labelBoards)[labelBoardsValues.indexOf(closestValue.value[0].getBoundingClientRect().x)]
      labelBoards[droppedLabel].push(labelBoards[currentLabel][currentIndex])
      labelBoards[currentLabel].splice(currentIndex, 1)
      clickedItem.classList.remove("label-backgrounded")
      clickedItem.style.position = "relative"
      clickedItem.style.top = ""
      clickedItem.style.left = ""
    }
  }

  window.onmouseup = () => {
    if (window.isMovingLabel)
      window.isMovingLabel = false
  }
}

window.isMovingLabel = false
</script>

<template>
  <div
    class="row gap-10 px-10"
  >
    <div
      v-for="(value, label, index) in labelBoards"
      :key="index"
      :ref="`${label}LabelRef`"
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
            v-model="heldLabel.title"
            class="mb-2"
            placeholder="title"
            autofocus
            outlined
            @blur="e => focusDescription(e)"
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
        style="position: unset"
        :key="`${item['title']}-${index}`"
        class="mt-2"
      >
        <q-card-section 
          v-if="!item['isEditing']"
          class="listed-label"
          @mousedown="e => moveLabel(e, index, label)"
        >
          {{label}}
          <div
            class="row justify-between"
          >
            <h6 class="mb-2 mt-0">
              {{ item['title'] }}
            </h6>
            <q-btn
              icon="create"
              @click="editLabel(index, label)"
              flat
            />
          </div>
          <p class="mb-0">
            {{ item['description'] }}
          </p>
        </q-card-section>
        <q-card-section
          v-else
        >
          <q-input
            v-model="item.title"
            class="mb-2"
            placeholder="title"
            autofocus
            outlined
            @blur="e => focusDescription(e)"
            @keydown="e => focusDescription(e)"
          />
          <q-input
            ref="heldLabelDescription"
            v-model="item.description"
            placeholder="description"
            outlined
            @blur="updateItem(index, label)"
            @keydown="e => e.key === 'Enter' ? updateItem(index, label) : ''"
          />
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

  .listed-label {
    cursor: pointer;
    width: 402px;
  }

  .label-backgrounded {
    z-index: 2;
    background: white;
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);  
  }
</style>