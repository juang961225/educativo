<script setup lang="ts">
const router = useRouter();
const { logout } = useFirebaseAuth();

const { getFormSubmissions } = useFirebaseDB();
const formSubmissions: Ref<FormSubmission[]> = ref([]);
const status = ref<'pending' | 'success' | 'error'>('pending');
const q: Ref<string> = ref('')

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

const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: 'List',
  icon: 'i-heroicons-link'
}]

const columns: Column[] = [
  { key: 'materialName', sortable: true, label: 'Material Name' },
  { key: 'materialType', sortable: true, label: 'Material Type' },
  { key: 'subject', sortable: true, label: 'Subject' },
  { key: 'course', sortable: true, label: 'Course' },
  { key: 'period', sortable: true, label: 'Period' },
  { key: 'score', sortable: true, label: 'Score' },
  { key: 'description', sortable: true, label: 'Description' },
  { key: 'contents', sortable: true, label: 'Contents' },
  { key: 'dba', sortable: true, label: 'DBA' },
  { key: 'indicator', sortable: true, label: 'Indicator' },
  { key: 'targetPeriod', sortable: true, label: 'Target Period' },
  { key: 'id', sortable: true, label: 'ID' },
  { key: 'actions', label: 'Actions' }
];
const selectedColumns: Ref<Column[]> = ref(columns.filter(col => col.key !== 'materialLink'));

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
    <div class=" flex justify-between">
      <UBreadcrumb :links="links" />
      <UButton class="" @click="logout">
        Logout
      </UButton>
    </div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
      <UInput class="px-3" v-model="q" placeholder="Filter people..." />
    </div>

    <UTable :loading="status === 'pending'"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :progress="{ color: 'primary', animation: 'carousel' }" class="w-full" :columns="selectedColumns"
      :rows="filteredRows">
      <template #materialName-data="{ row }">
        <a :href="row.materialLink" target="_blank"  class="text-primary-500 underline">
          {{ row.materialName }}
        </a>
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
