<script>
import Field from "../components/Field.vue"
import Navbar from "../components/Navbar.vue";
export default {
    name: "FieldView",
    components: {
    Field,
    Navbar
},
    data() {
        return {
            playerTurn: true,
            undoStack: [],
            redoStack: [],
            playground:[
            "", "", "", "", "", "", "",
            "", "", "", "", "", "", "",
            "", "", "", "", "", "", "",
            "", "", "", "", "", "", "",
            "", "", "", "", "", "", "",
            "", "", "", "", "", "", ""
        ]}
    },
    methods: {
        setStone(event) {
            switch(this.playground[parseInt(event)-1]) {
                case "empty":
                    if (parseInt(event) < 36 && this.playground[parseInt(event)+6] != "empty" || parseInt(event) >= 36) {
                        this.playground[parseInt(event)-1] = this.playerTurn ? "yellow" : "red";
                        this.playerTurn = !this.playerTurn;
                        this.undoStack.push(event);
                    } else {
                        alert("Stein kann hier nicht gesetzt werden!");
                    }
                    break;
                default:
                    alert("Stein wurde bereits gesetzt!");
                    break;
            }
        },
        loadGame() {
            this.playground = JSON.parse(window.localStorage.getItem('playground'))
        },
        saveGame() {
            const data = JSON.stringify(this.playground)
            window.localStorage.setItem('playground', data);
        },
        newGame() {
            this.playground = [
                "empty", "empty", "empty", "empty", "empty", "empty", "empty",
                "empty", "empty", "empty", "empty", "empty", "empty", "empty",
                "empty", "empty", "empty", "empty", "empty", "empty", "empty",
                "empty", "empty", "empty", "empty", "empty", "empty", "empty",
                "empty", "empty", "empty", "empty", "empty", "empty", "empty",
                "empty", "empty", "empty", "empty", "empty", "empty", "empty"
                ];
        },
        undoStep() {
            this.redoStack.push([this.undoStack[this.undoStack.length - 1], this.playground[this.undoStack[this.undoStack.length - 1] - 1]]);
            this.playground[this.undoStack[this.undoStack.length - 1] - 1] = "empty";
            this.undoStack.pop();
            this.playerTurn = !this.playerTurn;
        },
        redoStep() {
            this.playground[this.redoStack[this.redoStack.length - 1][0] - 1] = this.redoStack[this.redoStack.length - 1][1];
            this.redoStack.pop();
            this.playerTurn = !this.playerTurn;
        }
    },
    created() {
        this.newGame()
    },
};
</script>

<template>
    <Navbar @saveField="saveGame" @loadField="loadGame" @newField="newGame" @undoStep="undoStep" @redoStep="redoStep"></Navbar>
    <div style="margin-left: 10px;">
    <h1>4-Gewinnt</h1>
    <p>
        Ein neues Spiel wurde erzeugt!
    </p>
        <div class="grid" id="grid">
            <Field :field="this.playground" @stoneSet="setStone"></Field>
        </div>
    </div>
</template>

<style scoped>
    .grid {
        width: 355px;
        height: 305px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(6, 1fr);
        gap: 10px;
        background-color: #0000FF;
        padding: 20px;
    }
</style>