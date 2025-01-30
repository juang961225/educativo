<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useRouter } from 'vue-router';

const { login } = useFirebaseAuth();

const toast = useToast()
const router = useRouter();

const redirectTo = () => {
  router.push('/login');
};


const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: 'Login',
  icon: 'mdi:account-arrow-right-outline'
}]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Must be at least 6 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await login(event.data.email, event.data.password);
    toast.add({
      title: "To Home Page",
      timeout:1000,
      callback: () => {
        router.push("/")
      }
    })
  } catch (error) {
    console.log(error);

  }
}
</script>


<template>
  <div>
    <div class="w-full flex flex-col gap-y-4">
      <UBreadcrumb :links="links" />
      <h2 class=" gray  text-[18px]">login</h2>
      <UCard :ui="{ body: { base: 'grid grid-cols-3' } }">
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <UButton type="submit">
            Login
          </UButton>
        </UForm>


        <UDivider label="OR" orientation="vertical" />

        <div class="space-y-4 flex flex-col justify-center">
          <UButton color="black" label="To Register" icon="mdi:account-box-edit-outline" block @click="redirectTo" />
        </div>
      </UCard>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>