<template>
    <span class="umbral-stacks">
        <div class="umbral-heart" v-for="n in count"></div>
    </span>
</template>

<script>
    export default {
        props: ['count']
    }
</script>

<style scoped>

    .umbral-stacks {
        margin-left: 5px;
    }

    .umbral-heart {
        display: inline-block;
        position: relative;
        margin: 0 5px 0 0;
        width: 12px;
        height: 15px;
        background-color: #8cb8ff;
    }

    .umbral-heart:before,
    .umbral-heart:after {
        content: "";
        position: absolute;
        width: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
    }

    .umbral-heart:before {
        bottom: 100%;
        border-bottom: 5px solid #8cb8ff;
    }

    .umbral-heart:after {
        top: 100%;
        width: 0;
        border-top: 5px solid #8cb8ff;
    }
</style>