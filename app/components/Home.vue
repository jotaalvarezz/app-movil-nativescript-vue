<template>
    <Page>
        <ActionBar backgroundColor="#3c495e">
            <Label text="Jikan Anime" class="cardtitle" fontSize="18" />
            <ActionItem android.systemIcon="ic_menu_search" ios.position="right" text="delete" @tap="modalSearch" />
        </ActionBar>

        <FlexboxLayout flexDirection="column" backgroundColor="#3c495e" height="auto">
            <!-- <SearchBar alignSelf="center" width="90%" hint="Search hint" :text="searchPhrase"
                textFieldBackgroundColor="white" textFieldHintColor="white" @textChange="onTextChanged" @submit="onSubmit"
                height="40" class="search" /> -->

            <ScrollView height="100%">
                <FlexboxLayout flexDirection="column">
                    <GridLayout class="carousel-layout-fix" style="width: 100%" rows="400">
                        <Carousel v-if="animes_popularities.length > 0" id="carousel" @pageChanged="myChangeEvent"
                            indicatorAlignment="bottom" ios:finite="true" ios:bounce="false" showIndicator="true"
                            indicatorAnimation="SWAP" indicatorColor="#66ccff" indicatorColorUnselected="#cceeff"
                            debug="true" row="0" col="0">
                            <CarouselItem id="slide1" v-for="(item, index) in animes_popularities" :key="index"
                                verticalAlignment="middle">
                                <stack-layout orientation="horizontal" style="background-color: #1c6b48;" height="auto">
                                    <Image :src="item.images.jpg.image_url" stretch="fill" />
                                </stack-layout>
                            </CarouselItem>
                        </Carousel>
                    </GridLayout>
                    <FlexboxLayout alignSelf="center" flexWrap="wrap" marginTop="30" height="auto">
                        <FlexboxLayout flexDirection="column" marginTop="15" v-for="(item, index) in animes" :key="index"
                            height="auto">
                            <card-view class="position" ripple="true" elevation="20" margin="4" radius=15 height="230"
                                width="31%" @tap="watchEpisodes(item.mal_id)">
                                <stack-layout orientation="horizontal" style="background-color: #1c6b48;" height="auto">
                                    <Image :src="item.images.jpg.image_url" stretch="fill" />
                                </stack-layout>
                            </card-view>
                            <Label :text="item.title" width="31%" height="40" class="cardtitle" fontSize="18"></Label>
                        </FlexboxLayout>
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
import AnimeInfo from './AnimeInfo.vue';

export default {
    data() {
        return {
            activate: false,
            animes: [],
            searchPhrase: '',
            animes_copy: [],
            animes_popularities: []
        }
    },
    computed: {
        ...mapState(['msg', 'count', 'welcome']),
        message() {
            return this.msg;
        }
    },

    methods: {
        ...mapMutations(['save_anime']),

        watchEpisodes(id) {
            this.$navigateTo(AnimeInfo, { props: { anime_id: id } })
        },

        modalSearch() {
            alert({
                title: "Warning!!",
                message: "EN CONSTRCCION...",
                okButtonText: "Aceptar"
            }).then(() => {
                console.log("Cerrar");
            });
        },

        popularities(animes) {
            for (let i = 0; i < animes.length; i++) {
                if (animes[i].popularity > 1200) {
                    this.animes_popularities.push(animes[i])
                }
            }
        },

        async getAnimes() {
            const animes = await axios.get('https://api.jikan.moe/v4/anime');
            console.log(animes)
            this.animes = animes.data.data
            this.save_anime(this.animes)
            this.popularities(this.animes)
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
        },

        async getEpisodes() {
            console.log("props => ", this.anime_id)
            const episodes = await axios.get(`https://api.jikan.moe/v4/anime/1/videos`)
            this.episodes = episodes.data.data
            console.log(episodes)
        },
    },

    created() {
        /* this.getEpisodes() */
        if (this.animes.length == 0) {
            this.getAnimes()
        }
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
