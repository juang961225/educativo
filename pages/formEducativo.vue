<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { logout } = useFirebaseAuth();

definePageMeta({
  middleware: 'auth' // Redirige a usuarios autenticados fuera de esta página
});

const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: 'Formulario',
  icon: 'i-heroicons-link'
}]

const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
]
const optionsCourse = [
  { label: '1°', value: 'option-1' },
  { label: '2°', value: 'option-2' },
  { label: '3°', value: 'option-3' },
  { label: '4°', value: 'option-4' },
  { label: '5°', value: 'option-5' },
  { label: '6°', value: 'option-6' },
  { label: '7°', value: 'option-7' },
  { label: '8°', value: 'option-8' },
  { label: '9°', value: 'option-9' },
  { label: '10°', value: 'option-10' },
  { label: '11°', value: 'option-11' },
]
const optionsPeriod = [
  { label: 'period 1', value: 'option-1' },
  { label: 'period 2', value: 'option-2' },
  { label: 'period 3', value: 'option-3' },
  { label: 'period 4', value: 'option-4' },
]

const state = reactive({
  selectCourse: undefined,
  selectPeriod: undefined,
  selectSubject: undefined,
  dba: undefined,
  contents: undefined,
  targetPeriod: undefined,
  toggle: undefined,
})

const schema = z.object({
  selectCourse: z.string().refine((value: string) => !!value, {
    message: 'Select a course',
  }),
  selectPeriod: z.string().refine((value: string) => !!value, {
    message: 'Select a course',
  }),
  selectSubject: z.string().refine((value: string) => !!value, {
    message: 'Select a subject',
  }),
  dba: z.string().min(10),
  contents: z.string().min(10),
  targetPeriod: z.string().min(10),
  toggle: z.boolean().refine((value: boolean) => value, {
    message: 'Toggle me',
  }),
})

type Schema = z.infer<typeof schema>

const form = ref()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
  <div>
    <div class=" flex justify-between">
      <UBreadcrumb :links="links" />
      <UButton class="" @click="logout">
        Logout
      </UButton>
    </div>

    <UForm ref="form" :schema="schema" :state="state" class="space-y-4 mt-3" @submit="onSubmit">

      <UFormGroup name="selectCourse" label="Course">
        <USelect v-model="state.selectCourse" placeholder="select Course..." :options="optionsCourse" />
      </UFormGroup>

      <UFormGroup name="selectSubject" label="Subject">
        <USelect v-model="state.selectSubject" placeholder="select Subject..." :options="options" />
      </UFormGroup>

      <UFormGroup name="dba" label="DBA">
        <UTextarea v-model="state.dba" />
      </UFormGroup>

      <UFormGroup name="targetPeriod" label="Target per period">
        <UTextarea v-model="state.targetPeriod" />
      </UFormGroup>

      <UFormGroup name="selectPeriod" label="period">
        <USelect v-model="state.selectPeriod" placeholder="select Course..." :options="optionsPeriod" />
      </UFormGroup>

      <UFormGroup name="contents" label="contents">
        <UTextarea v-model="state.contents" />
      </UFormGroup>

      <UFormGroup name="toggle" label="Toggle">
        <UToggle v-model="state.toggle" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>

      <UButton variant="outline" class="ml-2" @click="form.clear()">
        Clear
      </UButton>
    </UForm>
  </div>
</template>