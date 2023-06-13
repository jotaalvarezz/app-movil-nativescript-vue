<template>
    <FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
        <ListView for="item in listOfItems" @itemTap="onItemTap">
            <v-template>
                <Label :text="'fa-ship' | fonticon" class="fas" fontSize="80"/>
            </v-template>
        </ListView>
    </FlexboxLayout>
</template>

<script>
export default {
    name: 'Ships',
    data() {
        return {
            listOfItems: [{ text: 'first' }, { text: 'second' }, { text: 'three' }, { text: 'four' }]
        }
    },

    methods: {
        onItemTap() {
            console.log('success')
        }
    }
}
</script>
