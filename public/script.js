var PRICE = 9.99;
var LOAD_NUM = 10;

new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [],
    cart: [],
    results: [],
    newSearch: 'anime',
    lastSearch: '',
    loading: false,
    price: PRICE
  },
  methods: {
    appendItems: function () {
      if (this.items.length < this.results.length) {
        var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
        this.items = this.items.concat(append);
      }
    },
    onSubmit: function () {
      // console.log('SUBMITTED='.concat(this.$http));
      this.items = [];
      this.loading = true;
      this.$http.get('/search/'.concat(this.newSearch))
        .then(function(resp) {
          this.lastSearch = this.newSearch;
          this.results = resp.data;
          this.appendItems();
          // console.log(resp);
          this.loading = false;
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
  },
  mounted: function () {
    this.onSubmit();

    var viewInstance = this;
    console.log(scrollMonitor);
    var elem = document.getElementById('product-list-bottom');
    var watcher = scrollMonitor.create(elem);
    watcher.enterViewport(function () {
      console.log('ENETRED VIEWPORT');
      viewInstance.appendItems();
    })
  }
});