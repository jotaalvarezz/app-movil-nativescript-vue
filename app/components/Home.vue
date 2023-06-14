<template>
    <Page>
        <ActionBar backgroundColor="#222A37">
            <NavigationButton />
            <GridLayout columns="50, *">
                <Label text="Jikan Anime" class="action-bar-title cardtitle" fontSize="18" colSpan="2"/>
                <Label class="fas" text.decode="&#xf0c9;" @tap="openDrawer" />
            </GridLayout>
            <ActionItem android.systemIcon="ic_menu_camera" ios.position="left" text="scan code" @tap="readCode" />
            <ActionItem android.systemIcon="ic_menu_search" ios.position="right" text="delete" @tap="modalSearch" />
        </ActionBar>
        <RadSideDrawer ref="drawer" @drawerOpened="onDrawerOpened" @drawerClosed="onDrawerClosed">
            <!-- Contenido principal -->
            <StackLayout ~mainContent>
                <!-- Agrega tus elementos de contenido principal aquí -->
                <TabView :selectedIndex="selectedIndex" @selectedIndexChange="indexChange" androidTabsPosition="buttom"
                    tabBackgroundColor="#222A37">
                    <TabViewItem style="background-color:#F40000;" fontSize="35" :title="'fa-dragon' | fonticon"
                        class="fas">
                        <Animes></Animes>
                    </TabViewItem>
                    <TabViewItem fontSize="35" :title="'fa-barcode' | fonticon" class="fas">
                        <Scanner></Scanner>
                    </TabViewItem>
                    <TabViewItem fontSize="35" :title="'fa-barcode' | fonticon" class="fas">
                        <Ships></Ships>
                    </TabViewItem>
                </TabView>
            </StackLayout>
            <!-- Contenido del Drawer -->
            <StackLayout ~drawerContent>
                <!-- Agrega tus elementos de contenido del Drawer aquí -->
                <ContentDrawer></ContentDrawer>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import Animes from './Animes.vue'
import { isIOS } from "@nativescript/core";
import { BarcodeScanner } from "nativescript-barcodescanner";
import Scanner from './scanner/ScanCode.vue'
import searchView from './search/searchView.vue';
import Ships from './Ships/Ship.vue'
import { mapState } from 'vuex';
import ContentDrawer from './contentDrawer/ContentDrawer.vue';

export default {
    components: {
        Animes,
        Scanner,
        Ships,
        ContentDrawer
    },

    data() {
        return {
            tab_item: 0,
            activate: false,
            isIOS
        }
    },
    computed: {
        ...mapState(['animes_store'])
    },

    methods: {
        modalSearch() {
            this.$showModal(searchView, { fullscreen: true, props: { animes: this.animes_store } });
        },

        openDrawer(){
            const drawer = this.$refs.drawer.nativeView
            drawer.showDrawer()
        }

    },

    created() {

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
