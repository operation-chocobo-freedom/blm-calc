<template>
    <div class="enochian" :class="{active: state}"></div>
</template>

<script>
    export default {
        props: ['state']
    }
</script>

<style scoped>

    .enochian {
        display: inline-block;
        position: relative;
        margin: 0 5px 0 0;
        width: 16px;
        height: 9.24px;
        background-color: #e9dbff;
    }

    .enochian:before,
    .enochian:after {
        content: "";
        position: absolute;
        width: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
    }

    .enochian:before {
        bottom: 100%;
        border-bottom: 4.62px solid #e9dbff;
    }

    .enochian:after {
        top: 100%;
        width: 0;
        border-top: 4.62px solid #e9dbff;
    }

    .active {
        background-color: #a675ef;
    }
    .active::before {
        border-bottom-color: #a675ef;
    }
    .active::after {
        border-top-color: #a675ef;
    }
</style>