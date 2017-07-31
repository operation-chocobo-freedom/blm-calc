<template>
    <div style="position: relative;">
        <img :src="icon" alt="" class="spell-icon">
        <span class="spell-name">
            {{ spells[spell].name }}
        </span>
    </div>
</template>

<script>
import spells from './support/spell-data';
export default {
    props: [
        'spell'
    ],
    data () {
        return {
            spells: spells,
        }
    },
    computed: {
        icon () {
            return './static/' + this.spell + '.png';
        }
    }
}
</script>

<style scoped>
    .spell-icon {
        display: inline-block;
        height: 1.2rem;
        width: 1.2rem;
        position: absolute;
        top: 3px;
    }

    .spell-name {
        margin-left: 1.5rem;
        text-transform: uppercase;
        font-size: 0.8rem;
        position: relative;
        top: -1px;
    }
</style>