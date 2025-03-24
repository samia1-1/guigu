<template>
    <div>
        <svg :style="{ height : height , width : width }">
            <use :xlink:href="prefix + name" :fill="color"></use>
        </svg>
    </div>
</template>

<script setup lang="ts">
defineProps({
    prefix : {
        type : String,
        default : '#icon-'
    },
    name : String,
    color : {
        type : String,
        default : ''
    },
    width: {
        type : String,
        default : '16px'
    },
    height : {
        type : String,
        default : '16px'
    }
})
</script>