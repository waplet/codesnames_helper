<template>
    <div id="app" class="container-fluid">
        <div class="row wcn">
            <div class="wcn__words">
                <template v-for="wordData, index in gameWords">
                    <div class="wcn__block" v-on:click.prevent="pickWord(wordData)">
                        <div class="wcn__subblock"
                             :class="{
                                'wcn__subblock--opened': !!wordData.belongsTo,
                                'bg--red': wordData.belongsTo == 'red',
                                'bg--blue': wordData.belongsTo == 'blue',
                                'bg--pedestrian': wordData.belongsTo == 'pedestrian'
                            }">
                            <div class="centered" v-if="!wordData.isPicking">
                                {{ wordData.word }}
                                <div class="wcn__second-word" v-if="showBothWords">
                                    {{ wordData.word }}
                                </div>
                            </div>
                            <div class="wcn__block-buttons" v-if="wordData.isPicking">
                                <div class="wcn__button bg--red" v-on:click.prevent="assignTo(wordData, 'red')"></div>
                                <div class="wcn__button bg--blue" v-on:click.prevent="assignTo(wordData, 'blue')"></div>
                                <div class="wcn__button bg--pedestrian" v-on:click.prevent="assignTo(wordData, 'pedestrian')"></div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="wcn__additional">
                <button v-on:click="showBothWords = !showBothWords">
                    Vārdu atrādīšana
                </button>
                <button v-on:click.prevent="generateNewWords()" style="margin-left: 50px;">
                    Ģenerēt jaunus vārdus
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                allWords: [],
                gameWords: [],
                showBothWords: false
            }
        },
        created() {
            this.loadWords();
        },
        methods: {
            loadWords() {
                let xhr = new XMLHttpRequest();
                xhr.addEventListener('load', this.onWordsLoaded.bind(this, xhr));
                xhr.open('GET', 'words.json');
                xhr.send();
            },

            onWordsLoaded(xhr) {
                this.allWords = JSON.parse(xhr.responseText);
                this.generateNewWords();
            },

            generateNewWords(word) {
                if (typeof word === 'undefined') {
                    let words = this.allWords.slice();
                    this.gameWords = this.shuffle(words).slice(0, 25).map((word) => {
                        return {
                            word: word,
                            belongsTo: null,
                            isPicking: false
                        };
                    });
                } else {
                    this.gameWords = Array(25).fill(1).map(() => {
                        return {
                            word: word,
                            belongsTo: null,
                            isPicking: false
                        };
                    });
                }
            },

            shuffle(a) {
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                }
                return a;
            },

            pickWord(wordData) {
                if (!!wordData.belongsTo) {
                    return;
                }

                // Mutating
                this.gameWords.filter((wordD) => {
                    return wordD.word != wordData.word;
                }).map((wordData) => {
                    wordData.isPicking = false;
                });
                wordData.isPicking = !wordData.isPicking;
            },

            assignTo(wordData, to) {
                wordData.belongsTo = to;
                wordData.isPicking = false;
            },

            alert(t) {
                alert(t);
            }
        }
    }
</script>

<style lang="scss">
    body, html {
        height: 100%;
        font-size: 1vw;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .wcn {
        height: 100%;
        $p: &#{&};
        &__words {
            display: flex;
            flex-flow: row wrap;
            height: 90%;
        }
        &__block {
            width: 20%; // 1/5
            height: 20%; // 1/5
            padding: 1%;
        }
        &__subblock {
            /*padding: 10%;*/
            display:block;
            height: 100%;
            padding: 5%;
            border: 1px solid black;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 1.2rem;
            background-color: #e8dab4;
            cursor: pointer;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            word-wrap: break-word;

            & .centered {
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                /*background-color: rgba(0,0,0, 0.1)*/
                /*background-color: #FFFFFF*/
                /*text-shadow: 0px 0px 1px #000;*/
            }
            &--opened {
                font-size: 0.8rem;
                color: #555555;
            }
            &:hover, &:active {
                transform: translateY(-2%);
            }
        }
        .bg--red {
            background-color: #ff2d3a;
        }
        .bg--blue {
            background-color: #1C8CC8;
        }
        .bg--pedestrian {
            background-color: #dcd09e;
        }
        &__second-word {
            font-size: 0.8em;
            transform: rotate(180deg);
            margin-top: 10px;
            color: #888888;
            #{$p}__subblock--opened & {
                display:none;
            }
        }
        &__block-buttons {
            height: 100%;
            display: flex;
            justify-content: space-evenly;
        }
        &__button {
            display: block;
            width: 25%;
            height: 70%;
            align-self: center;
        }
    }
</style>
