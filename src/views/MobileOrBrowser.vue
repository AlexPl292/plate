<template>
  <mobile-not-supported v-if="isMobile()" />
  <HomeView v-else />
</template>

<script lang="ts">
import HomeView from '@/views/HomeView.vue'
import MobileNotSupported from '@/views/MobileNotSupported.vue'

export default {
  name: 'MobileOrBrowser',
  components: { MobileNotSupported, HomeView },
  methods: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    }
  }
}
</script>
