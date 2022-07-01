<script lang="ts" setup>
import { ref } from "vue"
import type { Ref } from "vue"

const email: Ref<string> = ref("")
const password: Ref<string> = ref("")
</script>

<template>
  <div class="row full-page justify-center">
    <div class="col">
      <q-input 
        v-model="email" 
        outlined 
        label="E-mail" 
      />
      <q-input 
        v-model="password" 
        outlined 
        label="Password" 
      />
    </div>
  </div>
</template>