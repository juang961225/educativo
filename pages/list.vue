<script setup lang="ts">

interface FormSubmission {
  id: string;
  contents?: string;
  course?: string;
  createdAt?: string;
  dba?: string;
  description?: string;
  indicator?: string;
  materialLink?: string;
  materialName?: string;
  materialType?: string;
  period?: string;
  score?: number;
  subject?: string;
  targetPeriod?: string;
  toggle?: boolean;
}

interface Column {
  key: string;
  label?: string;
}

const { getFormSubmissions } = useFirebaseDB();
const formSubmissions: Ref<FormSubmission[]> = ref([]);

const fetchData = async (): Promise<void> => {
  try {
    const data = await getFormSubmissions();
    formSubmissions.value = data as FormSubmission[];
  } catch (error) {
    console.error('Error:', error);
  }
};
fetchData();

const people = computed<FormSubmission[]>(() => 
  formSubmissions.value.map(sub => ({
    id: sub.id,
    contents: sub.contents ?? '',
    course: sub.course ?? '',
    dba: sub.dba ?? '',
    description: sub.description ?? '',
    indicator: sub.indicator ?? '',
    materialLink: sub.materialLink ?? '',
    materialName: sub.materialName ?? '',
    materialType: sub.materialType ?? '',
    period: sub.period ?? '',
    score: sub.score ?? 0,
    subject: sub.subject ?? '',
    targetPeriod: sub.targetPeriod ?? '',
    toggle: sub.toggle ?? false,
  }))
);

watch(people, (newPeople) => {
  console.log('Datos transformados:', newPeople);
});

const columns: Column[] = [
  { key: 'id', label: 'ID' },
  { key: 'contents', label: 'Contents' },
  { key: 'course', label: 'Course' },
  { key: 'dba', label: 'DBA' },
  { key: 'description', label: 'Description' },
  { key: 'indicator', label: 'Indicator' },
  { key: 'materialLink', label: 'Material Link' },
  { key: 'materialName', label: 'Material Name' },
  { key: 'materialType', label: 'Material Type' },
  { key: 'period', label: 'Period' },
  { key: 'score', label: 'Score' },
  { key: 'subject', label: 'Subject' },
  { key: 'targetPeriod', label: 'Target Period' },
  { key: 'toggle', label: 'Toggle' },
  { key: 'actions' }
];


const items = (row: FormSubmission) => [
  [{ label: 'Edit', icon: 'i-heroicons-pencil-square-20-solid', click: () => console.log('Edit', row.id) }],
  [{ label: 'Duplicate', icon: 'i-heroicons-document-duplicate-20-solid' }],
  [{ label: 'Delete', icon: 'i-heroicons-trash-20-solid' }]
];

const selected: Ref<FormSubmission[]> = ref([]);
</script>

<template>
  <UTable v-model="selected" :rows="people" :columns="columns">
    <template #materialName-data="{ row }">
      <span :class="[selected.find(p => p.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{ row.materialName }}</span>
    </template>

    <template #actions-data="{ row }">
      <UDropdown :items="items(row)"><UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" /></UDropdown>
    </template>
  </UTable>
</template>
