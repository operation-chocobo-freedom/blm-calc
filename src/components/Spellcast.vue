<template>
    <div>
        {{ spells[spell].name }}
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
    }
}
</script>

<style scoped>

</style>