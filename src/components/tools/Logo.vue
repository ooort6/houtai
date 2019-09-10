<template>
  <div class="logo">
    <router-link :to="{name:'Content'}">
      <!-- <LogoSvg alt="logo" /> -->
      <!-- <img src="@/assets/logo_3.png" style="width:50%" alt=""> -->
      <h1 sty>{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo_2.png'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '紫霖集团',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
