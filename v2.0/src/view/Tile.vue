<template>
    <div v-if="(i%2 === 0 && j%2 === 0) || (i%2 === 1 && j%2 === 1)" class = "parPar">
        <div v-if="value === 1" class = "comida"></div>
        <div v-else-if="value === 2" class = "preenchido ini"></div>
        <div v-else-if="value === 3" class = "preenchido ver"></div>
        <div v-else-if="value === 4" class = "preenchido hor"></div>
        <div v-else-if="value === 5" class = "preenchido qds"></div>
        <div v-else-if="value === 6" class = "preenchido qes"></div>
        <div v-else-if="value === 7" class = "preenchido qdi"></div>
        <div v-else-if="value === 8" class = "preenchido qei"></div>
        <div v-else-if="value === 9" class = "preenchido fim"></div>
    </div>
    <div v-else-if="(i%2 === 1 && j%2 === 0) || (i%2 === 0 && j%2 === 1)" class = "impPar">
        <div v-if="value === 1" class = "comida"></div>
        <div v-else-if="value === 2" class = "preenchido ini"></div>
        <div v-else-if="value === 3" class = "preenchido ver"></div>
        <div v-else-if="value === 4" class = "preenchido hor"></div>
        <div v-else-if="value === 5" class = "preenchido qds"></div>
        <div v-else-if="value === 6" class = "preenchido qes"></div>
        <div v-else-if="value === 7" class = "preenchido qdi"></div>
        <div v-else-if="value === 8" class = "preenchido qei"></div>
        <div v-else-if="value === 9" class = "preenchido fim"></div>
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
    .impPar{
        background: #EAEDED;
    }
    .ini{
        border: 2px solid greenyellow;
    }
    .fim{
        border: 2px solid greenyellow;
    }
    .ver{
        border-left: 2px solid greenyellow;
        border-right: 2px solid greenyellow;
    }
    .hor{
        border-top: 2px solid greenyellow;
        border-bottom: 2px solid greenyellow;
    }
    .qds{
        border-top-right-radius: 15px;
        border-top: 2px solid greenyellow;
        border-right: 2px solid greenyellow;
    }
    .qes{
        border-top-left-radius: 15px;
        border-top: 2px solid greenyellow;
        border-left: 2px solid greenyellow;
    }
    .qei{
        border-bottom-left-radius: 15px;
        border-bottom: 2px solid greenyellow;
        border-left: 2px solid greenyellow;
    }
    .qdi{
        border-bottom-right-radius: 15px;
        border-bottom: 2px solid greenyellow;
        border-right: 2px solid greenyellow;
    }
    .preenchido{
        background: green;
        width: 30px;
        height: 30px;
    }
    .comida{
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background: red;
    }
</style>