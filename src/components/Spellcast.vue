<template>
    <div class="spellcast" style="position: relative;">
        <img :src="icon" alt="" class="spell-icon">
        <span class="spell-name">
            {{ spells[spell].name }}
        </span>
        <span v-if="warning">&mdash; <span class="warning">{{ warning }}</span></span>
    </div>
</template>

<script>
import spells from './support/spell-data';
export default {
    props: {
        'spell': String,
        'warning': {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            spells: spells
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
    .spellcast {
        cursor: move;
    }

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

    .warning {
        font-size: 0.8em;
        position: relative;
        top: -1px;
        color: #c00;
        font-weight: bold;
    }
</style>