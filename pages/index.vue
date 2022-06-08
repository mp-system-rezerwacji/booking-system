<template>
  <div v-if="$store.state.user">Hello, {{$store.state.user.email}}</div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
