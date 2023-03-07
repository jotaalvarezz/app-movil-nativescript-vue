<template>
    <Page>
        <ActionBar>
            <Label text="Jikan Anime" />
        </ActionBar>

        <FlexboxLayout flexDirection="column" backgroundColor="#3c495e" height="100%">
            <SearchBar alignSelf="center" width="90%" hint="Search hint" :text="searchPhrase"
                textFieldBackgroundColor="white" textFieldHintColor="white" @textChange="onTextChanged" @submit="onSubmit"
                height="40" class="search" />

            <ScrollView height="95%">
                <FlexboxLayout alignSelf="center" flexWrap="wrap">
                    <FlexboxLayout flexDirection="column" v-for="(item, index) in animes" :key="index" height="auto">
                        <card-view class="position" ripple="true" elevation="20" margin="4" radius=20 height="230"
                            width="31%" @tap="watchEpisodes(item.mal_id)">
                            <stack-layout orientation="horizontal" style="background-color: #1c6b48;" height="auto">
                                <Image backgroundColor="blue"
                                    :src="item.images.jpg.image_url"
                                    stretch="fill" />
                            </stack-layout>
                        </card-view>
                        <Label :text="item.title" width="31%" height="40" class="cardtitle" fontSize="18"></Label>
                    </FlexboxLayout>
                </FlexboxLayout>
            </ScrollView>
        </FlexboxLayout>

        <!-- <Pager for="item in items">
            <v-template>
                <GridLayout class="pager-item" rows="auto, *" columns="*">
                    <Label :text="item.title" />
                    <Image stretch="fill" row="1" :src="item.image" />
                </GridLayout>
            </v-template>
        </Pager> -->
    </Page>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import axios from 'axios';
import Episodes from './Episodes.vue';

export default {
    data() {
        return {
            activate: false,
            animes: [],
            searchPhrase: '',
            animes_copy: []
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

        watchEpisodes(id){
            this.$navigateTo(Episodes, {props:{anime_id:id}})
        },

        async getAnimes() {
            const animes = await axios.get('https://api.jikan.moe/v4/anime');
            console.log(animes)
            this.animes = animes.data.data
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
        this.getAnimes()
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
    color: #fff;
}

/* ion-searchbar {
  input {
    border-radius: 30px !important;
  }
} */

.search {
    margin-top: 5px;
    border-top-right-radius: 30;
}

.position {}
</style>
