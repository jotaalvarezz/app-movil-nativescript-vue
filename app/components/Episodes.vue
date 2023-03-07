<template>
    <page>
        <ActionBar>
            <Label text="Jikan Anime" />
        </ActionBar>

        <ListView for="item in episodes.episodes" @itemTap="onItemTap">
            <v-template>
                <Label :text="item.title"></Label>
                <Label :text="item.episode" />
                <Label :text="item.url"></Label>
            </v-template>
        </ListView>
    </page>
</template>

<script>
import axios from 'axios';

export default{

    props:['anime_id'],
    data() {
        return {
           episodes:[], 
        }
    },

    computed: {
        
    },

    methods: {
        async getEpisodes(){
            console.log("props => ", this.anime_id)
            const episodes = await axios.get(`https://api.jikan.moe/v4/anime/${this.anime_id}/videos`)
            this.episodes = episodes.data.data
            console.log(episodes)
        },

        onItemTap(){

        }
    },

    created() {
        this.getEpisodes()
    },
}
</script>