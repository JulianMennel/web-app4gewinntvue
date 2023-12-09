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
            kupferoStack: [],
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
                    case "silber":
                        if (parseInt(event) < 36 && this.playground[parseInt(event)+6] != "silber" || parseInt(event) >= 36) {
                            this.playground[parseInt(event)-1] = this.playerTurn ? "golden" : "kupfer";
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
                    case "silber":
                        if (parseInt(event) < 36 && this.playground[parseInt(event)+6] != "silber" || parseInt(event) >= 36) {
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
                                this.playground[i] = "golden";
                                break;
                            case 'O':
                                this.playground[i] = "kupfer";
                                break;
                            case ' ':
                                this.playground[i] = "silber";
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
                "silber", "silber", "silber", "silber", "silber", "silber", "silber",
                "silber", "silber", "silber", "silber", "silber", "silber", "silber",
                "silber", "silber", "silber", "silber", "silber", "silber", "silber",
                "silber", "silber", "silber", "silber", "silber", "silber", "silber",
                "silber", "silber", "silber", "silber", "silber", "silber", "silber",
                "silber", "silber", "silber", "silber", "silber", "silber", "silber"
                ];
            this.undoStack = [];
            this.kupferoStack = [];
            this.playerTurn = true;
            if (this.socketActive){
                axios.get('http://localhost:9000/newGame');
            }
        },
        undoStep() {
            this.kupferoStack.push([this.undoStack[this.undoStack.length - 1], this.playground[this.undoStack[this.undoStack.length - 1] - 1]]);
            this.playground[this.undoStack[this.undoStack.length - 1] - 1] = "silber";
            this.undoStack.pop();
            this.playerTurn = !this.playerTurn;
        },
        kupferoStep() {
            this.playground[this.kupferoStack[this.kupferoStack.length - 1][0] - 1] = this.kupferoStack[this.kupferoStack.length - 1][1];
            this.kupferoStack.pop();
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
                view.fetchFromAPI();
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
    <Navbar @saveField="saveGame" @loadField="loadGame" @newField="newGame" @undoStep="undoStep" @kupferoStep="kupferoStep"></Navbar>
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