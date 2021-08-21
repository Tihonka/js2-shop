Vue.component('HeaderComp', {
    data() {
        return {
            showMenu: false,
            showCart: false,
        }
    },
    template: `
        <header class="header">
            <div class="header__links container">
                <div class="header__links__left">
                    <a class="header__links__left--logo" href="index.html">
                        <img src="image/logo.png" width="44" height="38" alt="logo">
                    </a>
                    <search-comp></search-comp>
                </div>
                <div class="header__links__right">
                    <button class="header__links__right--menu" @click="showMenu = !showMenu">
                         <img src="image/burger.svg" width="32" height="23" alt="menu">                    
                    </button>
                    <a class="header__links__right--login" href="#">
                        <img src="image/registration.svg" width="29" height="29" alt="registration">
                    </a>
                    <button class="header__links__right--cart" @click='showCart = !showCart'>
                        <img src="image/cart.png" width="32" height="29" alt="cart">
                    </button>    
                </div>
            </div>
            <nav-comp></nav-comp>
        </header>
    `
});

Vue.component('SearchComp', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `
        <div class="header__links__left--search">
            <form action="#" method="post" @submit.prevent="$root.$refs.products.filter(userSearch)">
                <input type="text" class="header__links__left--search-field" placeholder="Поиск товара" v-model="userSearch">
                    <button type="submit">
                        <img src="image/search.svg" width="26" height="27" alt="search">                     
                    </button>
            </form>
        </div>
    `
});

Vue.component('NavComp', {
    template: `
        <nav class="nav" v-show="$parent.showMenu">
            <div class="nav__container">
                <h3>Menu</h3>
                <ul class="nav__container__parent">
                    <li class="nav__container__parent--li">Man</li>
                        <ul class="nav__container__child">
                            <li><a href="#">Accessories</a></li>
                            <li><a href="#">Bags</a></li>
                            <li><a href="#">Denim</a></li>
                            <li><a href="#">T-Shirts</a></li>
                        </ul>
                    <li class="nav__container__parent--li">Woman</li>
                        <ul class="nav__container__child">
                            <li><a href="#">Accessories</a></li>
                            <li><a href="#">Jackets & Coats</a></li>
                            <li><a href="#">Polos</a></li>
                            <li><a href="#">T-Shirts</a></li>
                            <li><a href="#">Shirts</a></li>
                        </ul>
                    <li class="nav__container__parent--li">Kids</li>
                        <ul class="nav__container__child">
                            <li><a href="#">Accessories</a></li>
                            <li><a href="#">Jackets & Coats</a></li>
                            <li><a href="#">Polos</a></li>
                            <li><a href="#">T-Shirts</a></li>
                            <li><a href="#">Shirts</a></li>
                            <li><a href="#">Bags</a></li>
                        </ul>
                </ul>
            </div>
            <div class="nav__icon-close">
                <button @click="$parent.showMenu = !$parent.showMenu">
                    <img src="image/close.svg" width="12" height="12" alt="close">   
                </button>
            </div>
        </nav>
    `
});