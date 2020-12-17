<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup () {
    return {}
  }
})
</script>

<style scoped lang="less">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  margin: 100px auto 0;
}
</style>
