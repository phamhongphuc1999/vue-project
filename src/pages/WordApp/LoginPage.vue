<script setup lang="ts">
import { APP_NAME, LS } from '@/configs/constance'
import type { LoginApiType } from '@/global'
import useLocalTranslate from '@/hooks/useLocalTranslate'
import { wordQuery } from '@/services/word-query'
import useUserStore from '@/stores/user-store'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useHead } from '@unhead/vue'
import { Button, InputText, Message } from 'primevue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

useHead({
  title: `${APP_NAME} | Login`,
})

const { t } = useLocalTranslate()

const isShowPassword = ref(false)
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
  <div class="flex flex-col items-center gap-2">
    <p class="text-[48px] font-[500] text-[#FFFFFF]">Sign In</p>
    <div class="mt-[77px]">
      <div
        class="flex h-[60px] w-[400px] cursor-pointer items-center justify-center gap-[8px] rounded-[18px] border-[4px] border-[#30303D]"
      >
        <i class="pi pi-google" style="font-size: 1rem"></i>
        <p>Continue with Google</p>
      </div>
      <div
        class="mt-[1rem] flex h-[60px] w-[400px] cursor-pointer items-center justify-center gap-[8px] rounded-[18px] border-[4px] border-[#30303D]"
      >
        <i class="pi pi-facebook" style="font-size: 1rem"></i>
        <p>Continue with Facebook</p>
      </div>
    </div>
    <p class="my-[1rem]">or</p>
    <div class="w-[400px]">
      <Form
        v-slot="$form"
        :resolver="resolver"
        :initialValues="initialValues"
        @submit="onFormSubmit"
      >
        <div class="form h-[60px]">
          <InputText
            id="username"
            class="form__input"
            name="username"
            type="text"
            fluid
            autocomplete="off"
          />
          <label for="username" class="form__label">{{ t('username') }}</label>
        </div>
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
          $form.username.error?.message
        }}</Message>
        <div class="form mt-[1rem] h-[60px]">
          <InputText
            id="password"
            class="form__input"
            name="password"
            v-bind:type="isShowPassword ? 'text' : 'password'"
            fluid
            autocomplete="off"
          />
          <div>
            <i
              class="pi form__eye"
              :class="isShowPassword ? 'pi-eye' : 'pi-eye-slash'"
              @click="isShowPassword = !isShowPassword"
            ></i>
          </div>
          <label for="username" class="form__label">{{ t('password') }}</label>
        </div>
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
          $form.password.error?.message
        }}</Message>
        <Button
          class="mt-[1rem] h-[60px] w-full rounded-[16px] bg-[#B72EB2]"
          type="submit"
          severity="secondary"
          label="Sign In"
        />
      </Form>
    </div>
  </div>
</template>
