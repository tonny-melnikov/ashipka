<template>
  <div class="row">
    <component :is="stage"
      :base="base"
      :good="good"
      :clear="clear"
      @sendForm="sendForm"
      @newForm="newForm"></component>
  </div>
</template>

<script>
import Form from './components/FormComponent.vue';
import Preloader from './components/PreloaderComponent.vue';
import Result from './components/ResultComponent.vue';

export default {
  components: {
    'app-form': Form,
    'app-preloader': Preloader,
    'app-result': Result,
  },
  data () {
    return {
      base: '',
      good: '',
      clear: '',
      stage: 'app-form'
    }
  },
  methods: {
    sendForm: function(data){
      this.stage = 'app-preloader';

      var baseArray = data.base
        .toLowerCase()
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter(x => /https?:\/\/(www\.)?([a-z0-9-]{2,}\.)+[a-z0-9-]{2,}/.test(x))
        .map((x) => {
          const result = /https?:\/\/(www\.)?([a-z0-9-]{2,}\.)+[a-z0-9-]{2,}/.exec(x)
          return result[0];
        });
      var clearBaseArray = [...(new Set(baseArray))];
      console.log(clearBaseArray);

      var goodArray = data.good
        .toLowerCase()
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter(x => /https?:\/\/(www\.)?([a-z0-9-]{2,}\.)+[a-z0-9-]{2,}/.test(x))
        .map((x) => {
          const result = /https?:\/\/(www\.)?([a-z0-9-]{2,}\.)+[a-z0-9-]{2,}/.exec(x)
          return result[0];
        });
      var clearGoodArray = [...(new Set(goodArray))];
      console.log(clearGoodArray);

      var resultArray = [];
      for (let i = 0; i < clearBaseArray.length; i += 1) {
        console.log('clearBaseArray[i] = '+clearBaseArray[i]);
        if (clearGoodArray.indexOf(clearBaseArray[i]) === -1) resultArray.push(clearBaseArray[i]);
      }

      this.clear = resultArray.join('\n');
      console.log(this.clear);
      this.stage = 'app-result';
    },
    newForm() {
      this.clear = '';
      this.stage = 'app-form';
    }
  }
}
</script>

<style></style>
