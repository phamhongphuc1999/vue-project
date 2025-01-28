<script setup lang="ts">
import { LS } from '@/configs/constance'
import type { LoginApiType } from '@/global'
import useLocalTranslate from '@/hooks/useLocalTranslate'
import { wordQuery } from '@/services/word-query'
import useUserStore from '@/stores/user-store'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Button, InputText, Message } from 'primevue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const { t } = useLocalTranslate()

const initialValues = ref({ username: '', password: '' })
const userStore = useUserStore()
const router = useRouter()

const resolver = ref(
  zodResolver(
    z.object({
      username: z.string().min(1, { message: 'Username is required.' }),
      password: z.string().min(1, { message: 'Password is required.' }),
    })
  )
)

async function onFormSubmit(event: FormSubmitEvent) {
  const { valid, states } = event
  if (valid) {
    try {
      const username = states['username'].value
      const password = states['password'].value
      const data = await wordQuery.post<LoginApiType>('/user/login', { username, password })
      const accessToken = data.data.token
      const expire = data.data.expireDate
      localStorage.setItem(LS.ACCESS_TOKEN, accessToken)
      localStorage.setItem(LS.TOKEN_EXPIRE, expire)
      userStore.setAccessToken(accessToken)
      router.push('/word')
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit">
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <div class="w-[180px]">
            <p>{{ t('username') }}</p>
          </div>
          <InputText name="username" type="text" :placeholder="t('username')" fluid />
        </div>
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
          $form.username.error?.message
        }}</Message>
      </div>
      <div class="mt-2 flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <div class="w-[180px]">
            <p>{{ t('password') }}</p>
          </div>
          <InputText name="password" type="text" :placeholder="t('password')" fluid />
        </div>
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
          $form.password.error?.message
        }}</Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>
