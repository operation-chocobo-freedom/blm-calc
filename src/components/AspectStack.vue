<template>
    <span>
        <!--<div class="stack stack-fire" v-if="element === 'fire'" v-for="n in count"></div>-->
        <!--<div class="stack stack-ice" v-if="element === 'ice'" v-for="n in count"></div>-->
        <div class="ice-diamond" v-if="element === 'ice'" v-for="n in count"></div>
        <div class="fire-diamond" v-if="element === 'fire'" v-for="n in count"></div>
    </span>
</template>

<script>
    export default {
        props: ['element', 'count']
    }
</script>

<style scoped>

    .stack {
        display: inline-block;
        position: relative;
        margin: 0 5px 0 0;
        width: 16px;
        height: 9.24px;
    }

    .stack-ice {
        background-color: #64C7CC;
    }

    .stack-ice:before,
    .stack-ice:after {
        content: "";
        position: absolute;
        width: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
    }

    .stack-ice:before {
        bottom: 100%;
        border-bottom: 4.62px solid #64C7CC;
    }

    .stack-ice:after {
        top: 100%;
        width: 0;
        border-top: 4.62px solid #64C7CC;
    }

    .stack-fire {
        background-color: #c12a51;
    }

    .stack-fire:before,
    .stack-fire:after {
        content: "";
        position: absolute;
        width: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
    }

    .stack-fire:before {
        bottom: 100%;
        border-bottom: 4.62px solid #c12a51;
    }

    .stack-fire:after {
        top: 100%;
        width: 0;
        border-top: 4.62px solid #c12a51;
    }

    .fire-diamond {
        display: inline-block;
        position: relative;
        height: 12px;
        width: 16px;
        background-color: #c12a51;
        transform: rotate(45deg) skew(45deg);
    }

    .ice-diamond {
        display: inline-block;
        position: relative;
        height: 12px;
        width: 16px;
        background-color: #64C7CC;
        transform: rotate(45deg) skew(45deg);
    }
</style>