<template>
    <div :class = "(i%2 === 0 && j%2 === 0) || (i%2 === 1 && j%2 === 1) ? 'parPar' : 'impPar'">
        <div v-if="value === 1" class = "comida"/>
        <div v-if="value === 2 || value === 14" class = "preenchido ponta-w">
            <div v-if="value < 6" class="olho"></div>    
            <div v-if="value < 6" class="olho"></div>    
        </div>
        <div v-else-if="value === 3 || value === 15" class = "preenchido ponta-a">
            <div v-if="value < 6" class="olho"></div>
            <div v-if="value < 6" class="olho"></div>
        </div>
        <div v-else-if="value === 4 || value === 12" class = "preenchido ponta-s">
            <div v-if="value < 6" class="olho"></div>
            <div v-if="value < 6" class="olho"></div>
        </div>
        <div v-else-if="value === 5 || value === 13" class = "preenchido ponta-d">
            <div v-if="value < 6" class="olho"></div>
            <div v-if="value < 6" class="olho"></div>
        </div>
        <div v-else-if="value === 6" class = "preenchido vertical"/>
        <div v-else-if="value === 7" class = "preenchido horizontal"/>
        <div v-else-if="value === 8" class = "preenchido top-right"/>
        <div v-else-if="value === 9" class = "preenchido top-left"/>
        <div v-else-if="value === 10" class = "preenchido botton-right"/>
        <div v-else-if="value === 11" class = "preenchido botton-left"/>
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
        display: flex;
    }
    .parPar{
        background: #D5DBDB;
    }
    .impPar{
        background: #EAEDED;
    }
    .ponta-a, .ponta-d, .ponta-s, .ponta-w{
        display: flex;
        justify-content: space-between;
    }
    .ponta-w{
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
        border-top: 2px solid #304000;
        border-left: 2px solid #304000;
        border-right: 2px solid #304000;
    }
    .ponta-a{
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        border-top: 2px solid #304000;
        border-left: 2px solid #304000;
        border-bottom: 2px solid #304000;
    }
    .ponta-s{
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
        border-bottom: 2px solid #304000;
        border-left: 2px solid #304000;
        border-right: 2px solid #304000;
    }
    .ponta-d{
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top: 2px solid #304000;
        border-right: 2px solid #304000;
        border-bottom: 2px solid #304000;
    }
    .vertical{
        border-left: 2px solid #304000;
        border-right: 2px solid #304000;
    }
    .horizontal{
        border-top: 2px solid #304000;
        border-bottom: 2px solid #304000;
    }
    .top-right{
        border-top-right-radius: 15px;
        border-top: 2px solid #304000;
        border-right: 2px solid #304000;
    }
    .top-left{
        border-top-left-radius: 15px;
        border-top: 2px solid #304000;
        border-left: 2px solid #304000;
    }
    .botton-left{
        border-bottom-left-radius: 15px;
        border-bottom: 2px solid #304000;
        border-left: 2px solid #304000;
    }
    .botton-right{
        border-bottom-right-radius: 15px;
        border-bottom: 2px solid #304000;
        border-right: 2px solid #304000;
    }
    .preenchido{
        background: #BFFF00;
        width: 30px;
        height: 30px;
    }
    .olho{
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: #263300;
    }
    .comida{
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background: #FF3619;
        border: 2px solid #B31E09;
    }
</style>