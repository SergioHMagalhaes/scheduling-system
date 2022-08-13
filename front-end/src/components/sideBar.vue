<template>
    <aside :class="`${this.active}`">
        <button type="button" :class="`btn btn-light create ${this.active}`" @click="this.$emit('openModal')"><i
                :class="`bi bi-calendar2-plus ${this.active}`"></i>Agendar</button>
        <nav ref="navbar-aside">
            <ul :class="`${this.active}`">
                <li :class="`${this.active}`">
                    <div :class="`input-group rounded Search`">
                        <input v-model="searchInput" type="search" class="form-control rounded input"
                            placeholder="Pesquisar" aria-label="Search" aria-describedby="search-addon"
                            @keyup.enter="search" />
                        <span type="button" class="input-group-text bg-white border-0" @click="search">
                            <i class="bi-search " @click="search"></i>
                        </span>
                    </div>
                </li>
                <li :class="`${this.active}`" @click="this.$router.push({path: '/'})"><i class="bi bi-house-door"></i>
                    Home</li>
                <li :class="`${this.active}`"><a href="https://github.com/SergioHMagalhaes/scheduling-system"
                        target="_blank" rel="noopener noreferrer"><i class="bi bi-github"></i> Repositório</a></li>
            </ul>
        </nav>
    </aside>
</template>

<script>
export default {
    emits: ['openModal'],
    data() {
        return {
            active: false,
            searchInput: ''
        };
    },
    props: {
        hideSideBar: {
            type: Boolean
        },
    },
    watch: {
        hideSideBar: function (newVal) {
            this.showSideBar(newVal)
        },
    },
    methods: {
        showSideBar(show) {
            show ? this.active = 'active' : this.active = ''
        },
        search() {
            console.log('Ok')
            if (this.searchInput) this.$router.push({
                path: '/search',
                query: {
                    search: this.searchInput
                }
            })
            this.active = ''
        }
    }
}
</script>

<style scoped>

aside{
    width: 0;
}

aside.active {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    width: 211.1px;
    min-height: 100vh;
    transition: 0.2s ease-out;
    z-index: 5;
}



ul, li, .create, .create i, .Search{ display: none;}
ul.active { list-style: none; display: block; }

li.active { padding-bottom: 15px; display: block; cursor: pointer; }

a{
    text-decoration: none;
    color: #2C3E50;
}

a:hover {
     color: #2C3E50;
}

.create.active{
    display: flex;
    justify-content: center;
    margin: 15px;
    height: 40px;
    background-color: rgba(255,255,255,.5);
    border: 1px solid rgba(143,40,140,1);
    width: 150px;
    -webkit-border-radius: 48px;
    border-radius: 48px;
    margin-bottom: 30px;
}

.create i.active  {
    display: block;
    margin-right: 10px;
}


@media screen and (max-width: 650px){
aside.active {
    min-width: 100%;
}

.Search { 
    display: flex;
    padding-bottom: 10px;
    margin-left: -15px;
}

}
</style>