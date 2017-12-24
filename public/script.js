var PRICE = 9.99;

new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [],
    cart: [],
    newSearch: '',
    lastSearch: ''
  },
  methods: {
    onSubmit: function () {
      // console.log('SUBMITTED='.concat(this.$http));
      this.$http.get('/search/'.concat(this.newSearch))
        .then(function(resp) {
          this.lastSearch = this.newSearch;
          this.items = resp.data;
          // console.log(resp);
        })
      ;
    },
    addItem: function(index) {
      // console.log('addItem() called with index='.concat(index));
      this.total += 9.99;
      var item = this.items[index];
      var found = false;
      for (var i=0; i<this.cart.length; i++) {
        if (this.cart[i].id === item.id) {
          this.cart[i].qty++;
          found = true;
          break;
        }
      }
      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          qty: 1,
          price: PRICE
        });
      }
    },
    inc: function(item) {
      item.qty++;
      this.total += item.price;
    },
    dec: function(item) {
      item.qty--;
      this.total -= item.price;
      if (item.qty <= 0) {
        for (var i=0; i<this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1);
          }
        }
      }
    }
  },
  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    }
  }
});