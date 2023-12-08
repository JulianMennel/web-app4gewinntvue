<script>
export default {
    name: "FieldCell",
    props: {
        color: {
            type: String,
            default: "",
        },
        id: {
            type: String,
            default: "",
        }
    },
    methods: {
    },
    computed: {
    },
    created(){
    }
}
</script>

<template>
    <div :class="color" :id="id" @click="$emit('stoneSet',id)" style="cursor: pointer;"></div>
</template>

<style scoped>
    .empty {
        width: 37px;
        height: 37px;
        background-color: #fff;
        border-radius: 50%;
    }

    .yellow {
        width: 37px;
        height: 37px;
        background-color: #ff0;
        border-radius: 50%;
    }
    .red {
        width: 37px;
        height: 37px;
        background-color: #f00;
        border-radius: 50%;
    }

    .red {
        width: 37px;
        height: 37px;
        background-color: #f00;
        border-radius: 50%;
    }

    .golden {
        height: var(--coin-size);
        width: var(--coin-size);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--face);
        background-image: var(--coin-face);
        background-size: 100% 100%;
        background-position: center;
        background-blend-mode: overlay;
        border-radius: 50%;
        cursor: pointer;
    }

    .kupfer {
        height: var(--coin-size);
        width: var(--coin-size);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--face);
        background-image: var(--coin-face);
        background-size: 100% 100%;
        background-position: center;
        background-blend-mode: overlay;
        border-radius: 50%;
        filter:
            hue-rotate(-40deg)
            brightness(0.75)
            contrast(115%);
        cursor: pointer;
    }

    .silber {
        height: var(--coin-size);
        width: var(--coin-size);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--face);
        background-image: var(--coin-face);
        background-size: 100% 100%;
        background-position: center;
        background-blend-mode: overlay;
        border-radius: 50%;
        filter: saturate(0);
        cursor: pointer;
    }

    :root {
        --face: #be9d66;
        --lowlight: #111;
        --side: #896c3b;
        --side-dark: #120e08;
        --coin-size: 37px;
        --coin-face: url('../assets/coin.jpg');
    }

    .coin {
        height: var(--coin-size);
        width: var(--coin-size);
        /*margin: 0.5rem;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .coin::before {
        content: '';
        display: block;
        position: relative;
        height: var(--coin-size);
        width: var(--coin-size);
        border-radius: 50%;
        background-color: var(--face);
        animation: spin 1s linear infinite;
        background-image: var(--coin-face);
        background-size: 100% 100%;
        background-position: center;
        background-blend-mode: overlay;
    }

    .coin.flip::before {
        animation-name: flip;
    }

    .coin.copper::before {
        filter:
            hue-rotate(-40deg)
            brightness(0.75)
            contrast(115%);
        animation-delay: -0.25s;
    }

    .coin.silver::before {
        filter: saturate(0);
        animation-delay: -0.5s;
    }

    /* animation definitions */

    @keyframes spin {
    0% {
        width: var(--coin-size);
        box-shadow:
        0 0 0 var(--side-dark);
        animation-timing-function: ease-in;
    }

    49.999% {
        width: 0.1rem;
        box-shadow:
        0.05rem 0 0 var(--side),
        0.1rem 0 0 var(--side),
        0.15rem 0 0 var(--side),
        0.2rem 0 0 var(--side),
        0.25rem 0 0 var(--side),
        0.3rem 0 0 var(--side),
        0.35rem 0 0 var(--side),
        0.4rem 0 0 var(--side),
        0.45rem 0 0 var(--side),
        0.5rem 0 0 var(--side),
        0.55rem 0 0 var(--side),
        0.6rem 0 0 var(--side),
        0.65rem 0 0 var(--side),
        0.7rem 0 0 var(--side),
        0.75rem 0 0 var(--side);
        transform: translateX(-0.375rem);
        background-color: var(--lowlight);
        animation-timing-function: linear;
    }

    50.001% {
        width: 0.1rem;
        box-shadow:
        -0.05rem 0 0 var(--side),
        -0.1rem 0 0 var(--side),
        -0.15rem 0 0 var(--side),
        -0.2rem 0 0 var(--side),
        -0.25rem 0 0 var(--side),
        -0.3rem 0 0 var(--side),
        -0.35rem 0 0 var(--side),
        -0.4rem 0 0 var(--side),
        -0.45rem 0 0 var(--side),
        -0.5rem 0 0 var(--side),
        -0.55rem 0 0 var(--side),
        -0.6rem 0 0 var(--side),
        -0.65rem 0 0 var(--side),
        -0.7rem 0 0 var(--side),
        -0.75rem 0 0 var(--side);
        transform: translateX(0.375rem);
        background-color: var(--lowlight);
        animation-timing-function: ease-out;
    }

    100% {
        width: var(--coin-size);
        box-shadow:
        0 0 0 var(--side-dark);
    }
    }

    @keyframes flip {
    0% {
        height: var(--coin-size);
        box-shadow:
        0 0 0 var(--side-dark);
        animation-timing-function: ease-in;
    }

    49.999% {
        height: 0.1rem;
        box-shadow:
        0 0.05rem 0 var(--side),
        0 0.1rem 0 var(--side),
        0 0.15rem 0 var(--side),
        0 0.2rem 0 var(--side),
        0 0.25rem 0 var(--side),
        0 0.3rem 0 var(--side),
        0 0.35rem 0 var(--side),
        0 0.4rem 0 var(--side),
        0 0.45rem 0 var(--side),
        0 0.5rem 0 var(--side),
        0 0.55rem 0 var(--side),
        0 0.6rem 0 var(--side),
        0 0.65rem 0 var(--side),
        0 0.7rem 0 var(--side),
        0 0.75rem 0 var(--side);
        transform: translateY(-0.375rem);
        background-color: var(--lowlight);
        animation-timing-function: linear;
    }

    50.001% {
        height: 0.1rem;
        box-shadow:
        0 -0.05rem 0 var(--side),
        0 -0.1rem 0 var(--side),
        0 -0.15rem 0 var(--side),
        0 -0.2rem 0 var(--side),
        0 -0.25rem 0 var(--side),
        0 -0.3rem 0 var(--side),
        0 -0.35rem 0 var(--side),
        0 -0.4rem 0 var(--side),
        0 -0.45rem 0 var(--side),
        0 -0.5rem 0 var(--side),
        0 -0.55rem 0 var(--side),
        0 -0.6rem 0 var(--side),
        0 -0.65rem 0 var(--side),
        0 -0.7rem 0 var(--side),
        0 -0.75rem 0 var(--side);
        transform: translateY(0.375rem);
        background-color: var(--lowlight);
        animation-timing-function: ease-out;
    }

    100% {
        height: var(--coin-size);
        box-shadow:
        0 0 0 var(--side-dark);
    }
    }
</style>