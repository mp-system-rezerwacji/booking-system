<template>
  <div v-if="$store.state.user">
    <div>Hello, {{$store.state.user.email}} {{$store.state.user.verified}}</div>
    <div v-for="doc in data" :key="doc.id">
      {{doc.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    loading: true,
    data: []
  }),
  async created() {
    const res = await this.$fire.firestore.collection('reservations').get();
    this.data = res.docs.map(x => x.data());
  }
}
</script>
