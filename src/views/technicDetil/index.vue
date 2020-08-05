<template>
  <div class="technicDetil">
    <div class="top">
      <navbar></navbar>
    </div>
    <div class="main">
      <div class="title">{{ technicDetil.title }}</div>
      <div class="detil">
        <div class="time">
          {{ technicDetil.created_at | formatTime }}
        </div>
        <div class="read">
          <i class="iconfont iconicon_liulanliang"></i>{{ technicDetil.read }}
        </div>
        <div class="star">
          <i
            class="iconfont iconicon_dianzanliang
"
          ></i
          >{{ technicDetil.star }}
        </div>
      </div>
      <div class="cover" v-if="technicDetil.cover">
        <img :src="technicDetil.cover" alt="" />
      </div>
      <div class="contant" v-html="technicDetil.content"></div>
    </div>
  </div>
</template>

<script>
import { technicdetil } from '@/api/find.js'
export default {
  name: 'technicDetil',
  data () {
    return {
      technicDetil: {}
    }
  },
  created () {
    // console.log(+this.$route.query.id)
    technicdetil(this.$route.params.id).then(res => {
      console.log('technicDetil', res)
      this.technicDetil = res.data
    })
  }
}
</script>

<style></style>
