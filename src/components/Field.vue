<script>
import FieldCell from "./FieldCell.vue";
export default {
    name: "Field",
    components: {
        FieldCell,
    },
    props: {
        field: Array
    },
    methods: {
        checkColor(nr) {
            return this.field[nr-1]
        },
        sendToParent(event) {
            this.$emit('stoneSet',event)
        },
        coinRotate(event) {
            this.$emit('rotateCoin',event)
        },
        coinStatic(event) {
            this.$emit('staticCoin',event)
        }
    },
};
</script>

<template>
    <FieldCell v-for="i in 42" :id="i.toString()" :color="checkColor(i)" @stoneSet="sendToParent" @rotateCoin="coinRotate" @staticCoin="coinStatic"/>
</template>

