<template>
    <div>
        <header class="header">
            <nav class="navBar">
                <div class="d-flex">
                    <img src="@/assets/img/menu.svg" class="menu" alt="menu" @click="addClickEvent()">
                    <a href="/"><img class="logoHeader" src="@/assets/img/logo.svg" alt="Logo"></a>
                </div>
                <div class="search-display">
                    <div class="input-group rounded Search ">
                        <input v-model="searchInput" type="search" class="form-control rounded input"
                            placeholder="Pesquisar" aria-label="Search" aria-describedby="search-addon"
                            @keyup.enter="search" />
                        <span type="button" class="input-group-text bg-white border-0" @click="search"> 
                        <i class="bi-search " @click="search"></i></span>
                    </div>
                </div>
                <a class="nav-link github" href="https://github.com/SergioHMagalhaes/scheduling-system"
                    target="_blank"><i class="bi-github"><span class="linksNavBar">Repositório</span></i></a>
            </nav>
        </header>
    </div>
</template>

<script>

export default {
    emits: ['esconderSideBar'],
    data() {
        return {
            display: true,
            searchInput: ''
        }

    },
    methods: {
        addClickEvent() {
            this.$emit('esconderSideBar')
        },
        search() {
            console.log('Ok')
            if (this.searchInput) this.$router.push({
                path: '/search',
                query: {
                    search: this.searchInput
                }
            })
        }
    }
}
</script>

<style scoped>

.linksNavBar{
    color: #21275f;
    font-size:15px;
    
}
.logoHeader{
    max-height: 40px;
}
.navBar{
    position: relative;
    display: flex;
    align-items: center;
    font-family:  'Hurme', sans-serif;
    height: 8vh;
}
.nav-list{
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    
}
.header{
    padding: 1vh 2vw;
    
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
.menu{
    padding-right: 25px;
    cursor: pointer;
    display: block;
    width: 50px;
}

.Search{
    display: flex;
    margin-left: 100px;
    max-width: 20vw;
}

.bi-github{
    font-size: 25px;
}

.github{
    position: absolute;
    right: 0;
}

.search-display{
    display: flex;
}

@media screen and (max-width: 650px){
    .search-display{
        display: none;
    }

    .bi-github{
        background-image: linear-gradient(0deg, rgba(143,40,140,1) 0%, rgba(33,39,95,1) 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: black;
    }
    
    .linksNavBar{
        display: none; 
    }
}
</style>