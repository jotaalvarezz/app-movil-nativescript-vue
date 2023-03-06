<template>
    <Page>
        <ActionBar>
            <Label text="Api Pokemon" />
        </ActionBar>

        <FlexboxLayout flexDirection="column" backgroundColor="#3c495e" height="100%">
            <SearchBar alignSelf="center" width="90%" hint="Search hint" :text="searchPhrase" 
                        textFieldBackgroundColor="white" textFieldHintColor="white"
                        @textChange="onTextChanged" @submit="onSubmit" height="40" 
                        class="search"/>
            <!-- <ActivityIndicator busy="true" @busyChange="onBusyChanged" /> -->
            <ScrollView height="90%">
                <FlexboxLayout alignSelf="center" flexWrap="wrap">
                    <FlexboxLayout flexDirection="column" v-for="(item, index) in pokemons" :key="index" height="auto">
                        <card-view class="position" ripple="true" elevation="20" margin="4" radius=20 height="230"
                            width="31%">
                            <stack-layout orientation="horizontal" style="background-color: #1c6b48;" height="auto">
                                <Image backgroundColor="blue"
                                    src="https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg "
                                    stretch="fill" />
                            </stack-layout>
                        </card-view>
                        <Label :text="item.name" width="31%" height="40" class="cardtitle" fontSize="18"></Label>
                    </FlexboxLayout>
                </FlexboxLayout>
            </ScrollView>
        </FlexboxLayout>
    </Page>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            activate: false,
            pokemons: [],
            searchPhrase: '',
            pokemons_copy: []
        }
    },
    computed: {
        ...mapState(['msg', 'count', 'welcome']),
        message() {
            return this.msg;
        }
    },

    methods: {
        ...mapMutations(['increment']),

        async getPokemons() {
            const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
            console.log(pokemons)
            this.pokemons = pokemons.data.results
            this.pokemons_copy = pokemons.data.results
        },

        onTextChanged() {
            let busqueda = this.searchPhrase;
            let expresion = new RegExp(`${busqueda}.*`, "i");
            let pokemons = this.pokemons.filter(pokemon => expresion.test(pokemon.name))
            this.pokemons = pokemons
            console.log("poke => ", pokemons)
        },

        visualize() {
            if (this.activate == false) {
                this.activate = true
            } else {
                this.activate = false
            }
        }
    },

    created() {
        this.getPokemons()
    },
};
</script>

<style scoped lang="scss">
@import '@nativescript/theme/scss/variables/blue';

// Custom styles
.fas {
    @include colorize($color: accent);
}

.info {
    font-size: 40;
}

.cardtitle {
    text-align: center;
    font-weight: bold;
    color: #000;
}

/* ion-searchbar {
  input {
    border-radius: 30px !important;
  }
} */

.search{
    margin-top: 5px;
    border-top-right-radius: 30;
}

.position {}
</style>
