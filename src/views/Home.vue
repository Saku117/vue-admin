<template>
  <div class="home">
    <h2>{{ data.count }}</h2>
    <h2>{{ data.doubleCounter }}</h2>
  </div>
  <model-button></model-button>
</template>

<script>
  import { computed, onMounted, onUnmounted, reactive } from "vue";
  // @ is an alias to /src
  export default {
    name: "Home",
    components:{
    },
    setup() {
      const data = reactive({
        count: 1,
        name: "wwwx",
        doubleCounter: computed(() => {
          return data.count * 2;
        }),
      });

      let timer;

      onMounted(() => {
        timer = setInterval(() => {
          data.count++;
        }, 1000);
      });

      onUnmounted(() => {
        clearInterval(timer);
      });
      return {
        data,
      };
    },
  };
</script>
