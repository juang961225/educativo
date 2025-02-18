<script setup lang="ts">
const router = useRouter();

interface FormSubmission {
  id: string;
  contents?: string;
  course?: string;
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
}

interface Column {
  key: string;
  label?: string;
  sortable?: boolean;
}

const columns: Column[] = [
  { key: 'id', sortable: true, label: 'ID' },
  { key: 'contents', sortable: true, label: 'Contents' },
  { key: 'course', sortable: true, label: 'Course' },
  { key: 'dba', sortable: true, label: 'DBA' },
  { key: 'description', sortable: true, label: 'Description' },
  { key: 'indicator', sortable: true, label: 'Indicator' },
  { key: 'materialLink', sortable: true, label: 'Material Link' },
  { key: 'materialName', sortable: true, label: 'Material Name' },
  { key: 'materialType', sortable: true, label: 'Material Type' },
  { key: 'period', sortable: true, label: 'Period' },
  { key: 'score', sortable: true, label: 'Score' },
  { key: 'subject', sortable: true, label: 'Subject' },
  { key: 'targetPeriod', sortable: true, label: 'Target Period' },
  { key: 'actions', label: 'Actions'}
];



const selectedColumns: Ref<Column[]> = ref([...columns]);
const { getFormSubmissions } = useFirebaseDB();
const formSubmissions: Ref<FormSubmission[]> = ref([]);

const status = ref<'pending' | 'success' | 'error'>('pending');

const fetchData = async (): Promise<void> => {
  try {
    status.value = 'pending';
    const data = await getFormSubmissions();
    formSubmissions.value = data as FormSubmission[];
    status.value = 'success';
  } catch (error) {
    console.error('Error:', error);
    status.value = 'error';
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
  }))
);

watch(people, (newPeople) => {
  console.log('Datos transformados:', newPeople);
});

const items = (row: FormSubmission): Array<Array<{ label: string; icon: string; click?: () => void }>> => [
  [{ label: 'Edit', icon: 'i-heroicons-pencil-square-20-solid', click: () => console.log('Edit', row.id) }],
  [{ label: 'Duplicate', icon: 'i-heroicons-document-duplicate-20-solid' }],
  [{ label: 'Delete', icon: 'i-heroicons-trash-20-solid' }]
];

const selected: Ref<FormSubmission[]> = ref([]);

const q: Ref<string> = ref('')

const filteredRows = computed<FormSubmission[]>(() => {
  if (!q.value) {
    return people.value
  }

  return people.value.filter((person: FormSubmission) => {
    return Object.values(person).some((value: unknown) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const redirectToForm = () => {
  router.push('/formEducativo');
};
</script>

<template>
  <div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
      <UInput class="px-3" v-model="q" placeholder="Filter people..." />
    </div>
  
    <UTable :loading="status === 'pending'"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :progress="{ color: 'primary', animation: 'carousel' }" class="w-full" :columns="selectedColumns" v-model="selected"
      :rows="filteredRows">
      <template #materialName-data="{ row }">
        <span :class="[selected.find(p => p.id === row.id) && 'text-primary-500 dark:text-primary-400']">
          {{ row.materialName }}
        </span>
      </template>
  
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
      <template #empty-state>
      <div class="flex flex-col items-center justify-center py-6 gap-3">
        <span class="italic text-sm">No one data!</span>
        <UButton label="Add entry" @click="redirectToForm" />
      </div>
    </template>
    </UTable>
  </div>
</template>
