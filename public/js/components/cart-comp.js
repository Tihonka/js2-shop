Vue.component('CartComp', {
    data() {
        return {
            showCart: false,
            cartItems: [],
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson(`api/cart/${ product.id_product }/${ product.product_name }`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);
                        }
                    })
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${ product.id_product }/${ product.product_name }`, product)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        },
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el)
                }
            });
    },
    template: `
        <section class="cart" v-show="$root.$refs.showCart.showCart">
            <div class="cart__container">
                <h3>Cart</h3>
                <p class="cart__container--empty" v-if="!cartItems.length">Empty</p>
                <cart-single-comp v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item"
                :img="item.imgProduct"
                @remove="remove"></cart-single-comp>
            </div>
            <div class="nav__icon-close">
                <button @click="$root.$refs.showCart.showCart = !$root.$refs.showCart.showCart">
                    <img src="image/close.svg" width="12" height="12" alt="close">     
                </button>
            </div>
        </section>
    `
});

Vue.component('CartSingleComp', {
    props: ['cartItem'],
    template: `
        <article class="cart__product">
            <div class="cart__product__img">
                <img :src="cartItem.imgProduct" alt="Cart Product Image">
            </div>
            <div class="cart__product__info">
                <h3>{{ cartItem.product_name }}</h3>
                <p>Quantity: {{ cartItem.quantity }}</p>
                <p>Price per Item: $ {{ cartItem.price }}</p>
                <p class="cart__product__info--price">Total Price: $ {{ cartItem.quantity * cartItem.price }}</p>
                <button @click="$emit('remove', cartItem)">Remove</button>
            </div>
        </article>
`
});