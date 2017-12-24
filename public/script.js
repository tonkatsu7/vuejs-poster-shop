new Vue({
  el: '#app',
  data: {
    total: 0
  },
  methods: {
    addItem: function() {
      console.log('addItem() called!');
      this.total += 9.99;
    }
  }
});