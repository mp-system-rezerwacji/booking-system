<template>
  <div>
    <h1 class="mb-2">Login</h1>
    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>
    <v-form @submit.prevent="login">
      <v-text-field v-model="email" label="Email"/>
      <v-text-field v-model="password" type="password" label="Password"/>
      <v-btn type="submit" :loading="loading">Login</v-btn>
    </v-form>
  </div>
</template>

<script lang='ts'>
import { FirebaseError } from '@firebase/app';
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    email: '',
    password: '',
    error: '',
    loading: false,
  }),
  methods: {
    async login() {
      this.loading = true;
      try {
        const user = await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        );

        const token = await user.user?.getIdTokenResult();
        if(!token?.claims.verified) {
          await this.$fire.auth.signOut();
          this.error = 'Unverified user!';
          this.loading = false;
          return;
        }

        await new Promise((resolve, reject) => setTimeout(resolve, 200));

        await this.$router.push({
          path: '/',
        });
      } catch (err) {
        if (err instanceof FirebaseError) {
          this.error = err.message;
        }
      }
      this.loading = false;
    },
  },
});
</script>

<style>
</style>
