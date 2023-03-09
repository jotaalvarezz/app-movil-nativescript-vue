<template>
    <page>
        <ActionBar backgroundColor="#3c495e">
            <Label text="Jikan Anime" class="cardtitle" fontSize="18" />
        </ActionBar>
        <ScrollView height="100%">
            <card-view class="position" ripple="true" elevation="20" margin="4" radius=20 height="auto" width="95%">
                <FlexboxLayout flexDirection="column" paddingBottom="20" height="50%">
                    <card-view alignSelf="center" elevation="20" margin="20" radius=0 height="50%" width="90%">
                        <Image backgroundColor="blue" :src="info.images.jpg.image_url" stretch="fill" />
                    </card-view>
                    <GridLayout columns="auto, *" rows="auto,auto,auto" height="auto" marginTop="7">
                        <Label style="font-weight: bold;" text="Title:" marginLeft="20" row="0" col="0"></Label>
                        <Label :text="info.title" textWrap="true" marginLeft="5" marginRight="20" row="0" col="1"></Label>
                        <Label style="font-weight: bold;" :text="sinopsis" marginLeft="20" row="1" col="0"></Label>
                        <Label :text="info.synopsis" textWrap="true" marginLeft="5" marginRight="20" row="1"
                            col="1"></Label>
                        <Label style="font-weight: bold;" text="type:" marginLeft="20" row="2" col="0"></Label>
                        <Label :text="info.genres[0].name" textWrap="true" marginLeft="5" marginRight="20" row="2"
                            col="1"></Label>
                    </GridLayout>
                    <FlexboxLayout flexDirection="column" height="auto" marginTop="40">
                        <Button style="font-weight: bold; height:200px; color: aliceblue;" backgroundColor="#3c495e" :text="'fa-list-alt' | fonticon" class="far" height="auto"
                            fontSize="35" alignSelf="center" @tap="getEpisodes()">
                            <!-- <Label backgroundColor="green" style="font-weight: bold;" :text="'fa-list-alt' | fonticon" class="far"
                            height="auto" fontSize="25" alignSelf="center"></Label> -->
                        </Button>
                    </FlexboxLayout>
                </FlexboxLayout>
            </card-view>
        </ScrollView>

    </page>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Episodes from './Episodes.vue';

export default {
    props: ['anime_id'],
    data() {
        return {
            info: [],
            sinopsis: 'Sinopsis:'
        }
    },

    computed: {
        ...mapState(['animes_store'])
    },

    methods: {
        getAnimeInfo() {
            const anime = this.animes_store.find(
                (d) => d.mal_id == this.anime_id
            )
            this.info = anime
        },

        getEpisodes() {
            this.$navigateTo(Episodes, { props: { anime_id: this.anime_id } })
        },
    },

    created() {
        this.getAnimeInfo();
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