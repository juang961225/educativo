<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'


const { addFormData } = useFirebaseDB();
const { logout } = useFirebaseAuth();
const toast = useToast()

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


const optionsMaterial = [
  { label: 'ficha para imprimir', value: 'fichaImprimir' },
  { label: 'cuento', value: 'cuento' },
  { label: 'video', value: 'video' },
  { label: 'presentación', value: 'presentación' },
  { label: 'actividad', value: 'actividad' },
  { label: 'ambiente', value: 'ambiente' },
  { label: 'provocaciones', value: 'provocaciones' },
  { label: 'material manipulativo', value: 'material-manipulativo' },
]

const options = [
  { label: 'Aritmética', value: 'Aritmética' },
  { label: 'geometría', value: 'geometría' },
  { label: 'estadística', value: 'estadística' },
  { label: 'portugués', value: 'portugués' },
  { label: 'artística', value: 'artística' },
  { label: 'educación física', value: 'educación-física' },
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
  selectMaterial: undefined,
  dba: '',
  contents: '',
  indicator: '',
  description: '',
  materialLink: '',
  materialName: '',
  score: undefined, // Aquí para un número que no tenga valor inicialmente
  targetPeriod: '',
  toggle: false,
})

const schema = z.object({
  selectCourse: z.string().refine((value: string) => !!value, {
    message: 'Select a course',
  }),
  selectPeriod: z.string().refine((value: string) => !!value, {
    message: 'Select a period',
  }),
  selectMaterial: z.string().refine((value: string) => !!value, {
    message: 'Select a type material',
  }),
  selectSubject: z.string().refine((value: string) => !!value, {
    message: 'Select a subject',
  }),
  dba: z.string().min(10),
  score: z.preprocess((val) => Number(val) || 0, z.number().min(0).max(999)),
  contents: z.string().min(10),
  indicator: z.string().min(10),
  description: z.string().min(10),
  materialLink: z.string().url({ message: 'Enter a valid URL' }),
  materialName: z.string().min(10),
  targetPeriod: z.string().min(10),
  toggle: z.boolean().refine((value: boolean) => value, {
    message: 'Toggle me',
  }),
})

type Schema = z.infer<typeof schema>

const form = ref()

function resetForm() {
  Object.assign(state, {
    selectCourse: undefined,
    selectPeriod: undefined,
    selectSubject: undefined,
    selectMaterial: undefined,
    dba: '',
    contents: '',
    indicator: '',
    description: '',
    materialLink: '',
    materialName: '',
    score: undefined,
    targetPeriod: '',
    toggle: false,
  });
}


const loading = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  console.log('Formulario enviado:', event.data);

  try {
    const docId = await addFormData({
      course: state.selectCourse,
      period: state.selectPeriod,
      subject: state.selectSubject,
      materialType: state.selectMaterial,
      dba: state.dba,
      contents: state.contents,
      indicator: state.indicator,
      description: state.description,
      materialLink: state.materialLink,
      materialName: state.materialName,
      score: state.score,
      targetPeriod: state.targetPeriod,
      toggle: state.toggle,
      createdAt: new Date().toISOString(),
    });

    toast.add({
      title: "Formulario creado exitosamente",
      description: `ID del documento: ${docId}`,
      timeout: 3000,
    });

    resetForm();
  } catch (error) {
    toast.add({
      title: "Error al crear el formulario",
      description: error.message || "Hubo un problema al guardar la información.",
      color: "red",
      timeout: 3000,
    });
  } finally {
    loading.value = false;
  }
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

      <UFormGroup name="indicator" label="indicator">
        <UTextarea v-model="state.indicator" />
      </UFormGroup>

      <UFormGroup name="score" label="number of activity">
        <UInput v-model="state.score" type="number" placeholder="number of activity" />
      </UFormGroup>

      <UFormGroup name="description" label="description">
        <UTextarea v-model="state.description" />
      </UFormGroup>

      <div class="grid grid-cols-3 gap-4">
        <!-- Primera columna: Inputs de Material Name y Material Link -->
        <div class="col-span-2 space-y-4">
          <UFormGroup name="materialName" label="Material Name">
            <UInput v-model="state.materialName" placeholder="Ej. Video educativo" />
            <!-- <UInput v-model="state.materialName" placeholder="Enter material name" /> -->
          </UFormGroup>

          <UFormGroup name="materialLink" label="Material Link">
            <UInput v-model="state.materialLink" type="url" placeholder="https://example.com" />
            <!-- <UInput v-model="state.materialLink" type="url" placeholder="Enter material link (https://)" /> -->
          </UFormGroup>
        </div>

        <!-- Segunda columna: Select de Material -->
        <div class="col-span-1 flex items-center">
          <UFormGroup name="selectMaterial" label="Material Type" class="w-full">
            <USelect v-model="state.selectMaterial" placeholder="Select Type Material..." :options="optionsMaterial" />
          </UFormGroup>
        </div>
      </div>



      <UFormGroup name="toggle" label="Toggle">
        <UToggle v-model="state.toggle" />
      </UFormGroup>

      <UButton :loading="loading" type="submit">
        Submit
      </UButton>


      <UButton variant="outline" class="ml-2" @click="resetForm">
        Clear
      </UButton>
    </UForm>
  </div>
</template>