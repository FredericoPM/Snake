<template>
    <div :class = "value.backGround === 0 ? 'parPar' : 'impPar'">
        <div v-if="value.preenchido" class="preenchido"/>
    </div>

</template>

<script>
export default {
    props: ['value', 'i', 'j']
}
</script>

<style scoped>
    div{
        width: 3px;
        height: 3px;
        display: flex;
    }
    .parPar{
        background: #D5DBDB;
    }
    .impPar{
        background: #EAEDED;
    }
    .preenchido{
        background: black;
        width: 3px;
        height: 3px;
    }
</style>