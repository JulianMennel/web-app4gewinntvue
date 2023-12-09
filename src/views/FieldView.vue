<script>
import Field from "../components/Field.vue";
import Navbar from "../components/Navbar.vue";
import axios from "axios";
export default {
    name: "FieldView",
    components: {
    Field,
    Navbar
},
    data() {
        return {
            socketRef: null,
            socketActive: false,
            playerTurn: true,
            das: this,
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
            if (!this.socketActive) {
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
            } else {
                switch(this.playground[parseInt(event)-1]) {
                    case "empty":
                        if (parseInt(event) < 36 && this.playground[parseInt(event)+6] != "empty" || parseInt(event) >= 36) {
                            var col = (parseInt(event) % 7) - 1;
                            var row2 = (parseInt(event) - (col + 1)) / 7;
                            if (col == -1) {
                                col = 6;
                            }
                            if (row2 == 6) {
                                row2 = 5;
                            }
                            const payload = {
                                row: row2.toString(),
                                column: col.toString(),
                            };
                            axios.post("http://localhost:9000/putJson", payload).then((res) => {
                                this.fetchFromAPI();
                            })
                            .catch((err) => console.log(err));
                        } else {
                            alert("Stein kann hier nicht gesetzt werden!");
                        }
                        break;
                    default:
                        alert("Stein wurde bereits gesetzt!");
                        break;
                }
            }
        },
        async fetchFromAPI() {
            console.log("fetch...");
            try{
                const res = await axios.get("http://localhost:9000/fieldJson");
                if (res.status == 200) {
                    const data = res.data;
                    console.log(data.field.cells[0]);
                    for(var i = 0; i < data.field.cells.length; i++) {
                        switch (data.field.cells[i].value) {
                            case 'X':
                                this.playground[i] = "yellow";
                                break;
                            case 'O':
                                this.playground[i] = "red";
                                break;
                            case ' ':
                                this.playground[i] = "empty";
                                break;
                        }
                    }
                }
            } catch(err){
                alert(err)
            }
        },
        async loadGame() {
            if (!this.socketActive) {
                this.playground = JSON.parse(window.localStorage.getItem('playground'))
            } else {
                await axios.get("http://localhost:9000/load")
                this.fetchFromAPI()

            }
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
            this.undoStack = [];
            this.redoStack = [];
            this.playerTurn = true;
            axios.get('http://localhost:9000/newGame');
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
        },
        startWebSocket() {
            this.socketRef = new WebSocket("ws://localhost:9000/websocket");
            var playgraoundField = this.playground;
            const view = this.das;
            this.socketRef.onopen = function (e) {
                view.socketActive = true;
                console.log("WS open");
            };
            this.socketRef.onmessage = function (event) {
                const obj = JSON.parse(event.data);
                for (var i=0; i<obj.field.cells.length; i++) {
                    switch (obj.field.cells[i].value) {
                        case 'X':
                            playgraoundField[i] = "yellow";
                            break;
                        case 'O':
                            playgraoundField[i] = "red";
                            break;
                        case ' ':
                            playgraoundField[i] = "empty";
                            break;
                    }
                }
            };
            this.socketRef.onerror = function (error) {
                console.log("WS Error" + error);
            };
            this.socketRef.onclose = function (event) {
                view.socketActive = false;
                console.log("WS closed");
            };
        },
        updateField(nr, color) {
            this.playground[nr] = color;
        },
    },
    created() {
        this.newGame();
        this.startWebSocket();
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