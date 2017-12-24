var PRICE = 9.99;

new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [
      { id: 1, title: "Item 1"},
      { id: 2, title: "Item 2"},
      { id: 3, title: "Item 3"}
    ],
    cart: []
  },
  methods: {
    addItem: function(index) {
      // console.log('addItem() called with index=' + index);
      this.total += 9.99;
      var item = this.items[index];
      var found = false;
      for (var i=0; i<this.cart.length; i++) {
        if (this.cart[i].id === item.id) {
          this.cart[i].qty++;
          found = true;
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