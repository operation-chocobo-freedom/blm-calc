<template>
    <div class="stack stack-ice"></div>
</template>

<script>
    export default {
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
        background-color: #a675ef;
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
        border-bottom: 4.62px solid #a675ef;
    }

    .stack-ice:after {
        top: 100%;
        width: 0;
        border-top: 4.62px solid #a675ef;
    }
</style>