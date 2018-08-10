<template lang="html">
  <form>
    <button
    class="btn btn-primary pull-right"
    @click.prevent="newForm" id="oneMore">Выполнить снова</button>
    <div class="col-xs-12 col-sm-10 col-sm-offset-1">
      <div class="form-group">
        <label for="field1">Результат:</label>
        <textarea name="field1" id="field1" class="form-control" readonly v-model="clear"></textarea>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ['clear'],
  mounted: function()
  {
    var winHei = $(window).height();
    var navHei = $('nav').outerHeight();
    var labelHei = $('label').outerHeight();
    var submitHei = $('#oneMore').outerHeight();
    var hei = winHei - (navHei + submitHei + labelHei + 20 + 70 );
    $("textarea").css("height", hei + 'px');
  },
  methods: {
    newForm() {
      this.$emit('newForm');
    }
  }
}
</script>

<style lang="css">
</style>
