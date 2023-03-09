<template>
    <page>
        <ActionBar backgroundColor="#3c495e">
            <Label text="Jikan Anime" class="cardtitle" fontSize="18" />
        </ActionBar>

        <ListView for="item in episodes.episodes" @itemTap="onItemTap">
            <v-template>
                <StackLayout backgroundColor="#3c495e">
                    <!-- <Label :text="item.title" height="70" backgroundColor="#43b883" />
                    <Label :text="item.episode" height="30" backgroundColor="#289062" /> -->
                    <!-- <card-view class="position" ripple="true" elevation="20" margin="4" radius=20 height="230" width="31%">
                        <stack-layout orientation="horizontal" style="background-color: #1c6b48;" height="auto">
                            <Image backgroundColor="blue" :src="item.images.jpg.image_url" stretch="fill" />
                        </stack-layout>
                    </card-view> -->
                     <Label :text="item.url" height="70" fontSize="15" style="color: blue;" />
                </StackLayout>
            </v-template>
        </ListView>
    </page>
</template>

<script>
import axios from 'axios';

export default {

    props: ['anime_id'],
    data() {
        return {
            episodes: [],
        }
    },

    computed: {

    },

    methods: {
        async getEpisodes() {
            console.log("props => ", this.anime_id)
            const episodes = await axios.get(`https://api.jikan.moe/v4/anime/${this.anime_id}/videos`)
            this.episodes = episodes.data.data
            console.log(episodes)
        },

        onItemTap() {

        }
    },

    created() {
        this.getEpisodes()
    },
}
</script>
<style>
    .cardtitle {
    text-align: center;
    font-weight: bold;
    color: #fff;
}
</style>