<template lang="html">
  <form>
    <div class="col-xs-12 col-sm-4">
      <div class="form-group">
        <label for="field1">База</label>
        <textarea name="field1" id="field1" class="form-control" v-model="base"></textarea>
      </div>
    </div>
    <div class="col-xs-12 col-sm-8">
      <div class="form-group">
        <label for="field2">Отчёт (результат прогона)</label>
        <textarea name="field2" id="field2" class="form-control" v-model="good"></textarea>
      </div>
    </div>
    <div class="col-xs-offset-8 col-xs-4">
      <button
        type="submit"
        id="submit"
        class="btn btn-primary pull-right"
        @click.prevent="sendForm">Обработать</button>
    </div>
  </form>
</template>

<script>
export default {
  props: ['base', 'good'],
  mounted: function()
  {
    var winHei = $(window).height();
    var navHei = $('nav').outerHeight();
    var labelHei = $('label').outerHeight();
    var submitHei = $('#submit').parent().outerHeight();
    var hei = winHei - (navHei + submitHei + labelHei + 20 + 70 );
    $("textarea").css("height", hei + 'px');
  },
  methods: {
    sendForm(){
      if (!this.base.length || !this.good.length) return;
      this.$emit('sendForm', {base: this.base, good: this.good});
      this.base = '';
      this.good = '';
    }
  }
}
</script>

<style lang="css">
</style>
