<template>
    <span>
        <div class="ice-diamond active" v-if="element === 'ice'" v-for="n in count"></div>
        <div class="ice-diamond" v-if="element === 'ice'" v-for="n in (3 - count)"></div>
        <div class="fire-diamond active" v-if="element === 'fire'" v-for="n in count"></div>
        <div class="fire-diamond" v-if="element === 'fire'" v-for="n in (3 - count)"></div>
        <small class="timer">{{ timer.toFixed(1) }}</small>
    </span>
</template>

<script>
    export default {
        props: ['element', 'count', 'timer']
    }
</script>

<style scoped>
    .fire-diamond {
        display: inline-block;
        position: relative;
        height: 12px;
        width: 16px;
        background-color: #c12a51;
        transform: rotate(45deg) skew(45deg);
        opacity: 0.2;
    }

    .ice-diamond {
        display: inline-block;
        position: relative;
        height: 12px;
        width: 16px;
        background-color: #64C7CC;
        transform: rotate(45deg) skew(45deg);
        opacity: 0.2;
    }

    .active {
        opacity: 1;
    }

    .timer {
        display: inline-block;
        width: 30px;
        font-weight: bold;
        font-size: 0.7rem;
    }
</style>