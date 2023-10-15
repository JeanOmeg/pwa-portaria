<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
    <div class="row justify-center items-center col-12">
      <div class="col-4 q-gutter-sm q-col-gutter-sm">
        <q-space />
        <div class="row justify-center text-bold text-primary" style="font-size: 1.5em">
          Acesse sua conta da OnPortaria
        </div>
        <q-space />
        <q-card bordered class="q-pa-md">
          <q-form @submit="enviarLogin" class="q-gutter-md">
            <q-input square filled clearable v-model="formulario.email" type="email" label="E-mail" :rules="[
              (val) =>
                (val && val.length > 0) || 'Email é obrigatório!',
              (val) => (val && val.length < 81) || 'Email invalido!',
            ]" hide-bottom-space />
            <q-input square filled clearable v-model="formulario.senha" type="password" label="Senha" :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Password is required. Password cannot be empty!',
              (val) => (val && val.length < 50) || 'Invalid password!',
            ]" hide-bottom-space />
            <div class="row justify-between">
              <q-btn size="md" label="Registrar conta" color="negative" text-color="white" :to="{ name: 'registerPage' }"
                style='min-width: 200px;' />
              <q-btn label="Fazer login" color="primary" type="submit" size="md" style='min-width: 200px;' />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang='ts'>
import loginPage from './login-page'
export default loginPage
</script>

<style>
.text-none {
  text-decoration: none;
}
</style>
