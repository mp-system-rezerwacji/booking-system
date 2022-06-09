<template>
  <div v-if="loading">
    <v-progress-linear indeterminate/>
  </div>
  <div v-else-if="!invite.exists">
    not found
  </div>
  <div v-else>
    <h1 class="mb-5">You have been invited to Booking System</h1>
    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>
    <v-form @submit.prevent="register">
      <v-text-field label="Email" :value="invite.get('email')" disabled/>
      <v-text-field v-model="password" label="Password" type="password" />
      <v-btn type="submit" :loading="registerLoading">Register</v-btn>
    </v-form>
  </div>
</template>

<script>
import { FirebaseError } from "@firebase/app";
import ky from 'ky';
import { sleep } from "@/utils/utils";

export default {
  name: "Invite",
  data: () => ({
    loading: true,
    registerLoading: false,
    invite: null,
    password: '',
    error: '',
  }),
  async created() {
    this.invite = await this.$fire.firestore.collection('invites').doc(this.$route.query.uid).get();
    this.loading = false;
  },
  methods: {
    async register() {
      this.registerLoading = true;

      try {
        const user = await this.$fire.auth.createUserWithEmailAndPassword(this.invite.get('email'), this.password);
        const token = await user.user.getIdToken();
        await ky.post('/api/finalize-registration', {
          json: {
            inviteID: this.invite.id
          },
          headers: {
            authorization: token
          }
        });

        await this.$fire.auth.signOut();
        await this.$fire.auth.signInWithEmailAndPassword(this.invite.get('email'), this.password);

        this.error = '';
        await sleep(500);
        await this.$router.push({
          path: '/'
        });
      } catch (err) {
        if (err instanceof FirebaseError) {
          this.error = err.message;
        }
      }
      this.registerLoading = false;
    }
  }
}
</script>

<style scoped>

</style>
