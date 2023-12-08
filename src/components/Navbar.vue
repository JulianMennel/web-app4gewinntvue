<template>
    <div class="topnav">
        <router-link to="/" class="active">About</router-link>
        <a @click="$emit('saveField')" style="cursor: pointer;">Save</a>
        <a @click="$emit('loadField')" style="cursor: pointer;">Load</a>
        <a @click="$emit('newField')" style="cursor: pointer;">New Game</a>
        <div class="dropdown" style="position: static;">
            <button class="dropbtn">Options
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <a @click="$emit('undoStep')" style="cursor: pointer;">Undo</a>
                <a @click="$emit('redoStep')" style="cursor: pointer;">Redo</a>
            </div>
        </div>
    </div>
</template>
  
  
<style scoped>
    .topnav {
        background-color: #0000FF;
        overflow: hidden;
    }

    .topnav a {
        float: left;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
    }

    .topnav a:hover, .dropdown:hover .dropbtn {
        background-color: #68BBE3;
        color: black;
    }

    .topnav a.active {
        background-color: #000C66;
        color: white;
    }

    .dropdown {
        float: left;
        overflow: hidden;
    }

    .dropdown .dropbtn {
        font-size: 16px;
        border: none;
        outline: none;
        color: white;
        padding: 15px 15px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown-content a {
        float: none;
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
    }

    .dropdown-content a:hover {
        background-color: #ddd;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }
  
</style>