<template>
  <DragParser />
</template>
<script >
import DragParser from '../components/DragParser.vue'
import SkillService from '../service/SkillService'
import SpecService from '../service/SpecService'
export default {
  components: {
    DragParser,
  },
  data() {
    return {}
  },
  methods: {

  },
  async mounted() {
    await SkillService.InitData();
    await SpecService.InitData();
  }
}
</script>