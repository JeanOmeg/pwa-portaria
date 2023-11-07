<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page class='row items-center justify-evenly'>
    <q-card bordered class='col-xs-10 col-sm-6 col-md-6 col-lg-4 q-pa-md'>
      <div class='text-bold text-primary text-center q-ma-lg' style='font-size: 1.5em'>
        <q-btn class='col-12' icon='apartment' color='primary' size='xl' />
      </div>
      <div class='text-bold text-primary text-center q-ma-lg' style='font-size: 1.5em'>
        <span>
          Acesse sua conta OnPort
        </span>
      </div>
      <q-form @submit='enviarLogin' class='q-gutter-md'>
        <q-input square filled clearable v-model='formulario.login' type='text' label='Login' :rules="[ (val) => (val && val.length > 0) || 'Email é obrigatório!', (val) => (val && val.length < 81) || 'Email invalido!' ]" hide-bottom-space />
        <q-input square filled clearable v-model='formulario.senha' type='password' label='Senha' :rules="[ (val) => (val && val.length > 0) || 'Senha é obrigatório!', (val) => (val && val.length < 50) || 'Senha invalida!' ]" hide-bottom-space />
        <div class='row justify-between col-12'>
          <q-btn class='col-5' size='md' label='Cadastro' color='primary' text-color='white' :to="{ name: 'registerPage' }" />
          <q-btn class='col-5' label='Login' color='primary' type='submit' size='md' />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import loginPage from './login-page'
export default loginPage
</script>

<style>
  .text-none {
    text-decoration: none;
  }
</style>
