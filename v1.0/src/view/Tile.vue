<template>
    <div v-if="value === 1" class = preenchido></div>
    <div v-else-if="i%2 === 0 && j%2 === 0" class = parPar>
        <div v-if="value === 2" class = comida></div>
    </div>
    <div v-else-if="i%2 === 1 && j%2 === 0" class = impPar>
        <div v-if="value === 2" class = comida></div>
    </div>
    <div v-else-if="i%2 === 1 && j%2 === 1" class = impImp>
        <div v-if="value === 2" class = comida></div>
    </div>
    <div v-else-if="i%2 === 0 && j%2 === 1" class = parImp>
        <div v-if="value === 2" class = comida></div>
    </div>
</template>

<script>
export default {
    props: ['value', 'i', 'j']
}
</script>

<style scoped>
    div{
        width: 30px;
        height: 30px;
    }
    .parPar{
        background: #D5DBDB;
    }
    .impImp{
        background: #D5DBDB;
    }
    .impPar{
        background: #EAEDED;
    }
    .parImp{
        background: #EAEDED;
    }
    .preenchido{
        background: green;
    }
    .comida{
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background: red;
    }
</style>