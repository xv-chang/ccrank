<template>
  <div class="drag-parser" @dragover.prevent.stop @dragleave.prevent.stop @dragenter.prevent.stop @drop.prevent.stop="handleDrop" @click="handleClick">
    <p>点击这里或拖拽文件进行解析</p>
    <input class="hidden-file" ref="file" accept=".evtc,.zevtc" type="file" style="" @change="handleChange" />
  </div>
</template>


<script  lang="ts" >
import EvtcParser from '../EvtcParser'
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    handleClick() {
      this.$refs.file.click()
    },
    handleChange(e) {
      this.initParse(this.$refs.file.files)
    },
    handleDrop(e) {
      this.initParse(e.dataTransfer.files)
    },

    async initParse(files) {
      if (!files || files.length == 0) {
        return
      }
      let file = files[0]
      var parser = new EvtcParser()
      parser.parse(file)
    },
  },
  mounted() {},
}
</script>
<style lang="less" scoped>
.hidden-file {
  display: none;
}
.drag-parser {
  max-width: 300px;
  height: 150px;
  border-radius: 4px;
  border: 1px dashed #ccc;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  p {
    text-align: center;
  }
  &:hover {
    border: 1px dashed #2d8cf0;
  }
}
</style>