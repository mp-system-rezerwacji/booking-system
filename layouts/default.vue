<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title>
        Booking system
      </v-toolbar-title>
      <v-spacer />
      <div v-if="$store.state.user">
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="signOut">
              <v-list-item-title>Log out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  methods: {
    async signOut() {
      await this.$fire.auth.signOut();
      await this.$router.push({
        path: '/login'
      });
    }
  }
}
</script>
