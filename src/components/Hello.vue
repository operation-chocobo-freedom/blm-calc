<!--suppress ALL -->
<template>
    <div class="container">
        <div class="simulator">
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Max MP</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="MP" v-model="stats.mp">
                        </div>
                    </div>
                </div>
                <div class="column"></div>
                <div class="column"></div>
            </div>


            <div class="notification">
                <draggable v-model="palette" :options="paletteOptions">
                    <spellcast v-for="spell in palette" :key="spell" :spell="spell"></spellcast>
                </draggable>
            </div>
            <div class="notification">
                <draggable v-model="trash" :options="trashOptions" @add="emptyTrash()">
                    Drag here to delete.
                </draggable>
            </div>


            <table class="table is-fullwidth">
                <thead>
                <tr>
                    <th></th>
                    <th>Potency</th>
                    <th>Astral / Umbral</th>
                    <th>Cast</th>
                    <th>
                        MP <span @click="flags.mpPercentage = true">%</span> <span
                            @click="flags.mpPercentage = false">pt</span>
                    </th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th></th>
                    <th>Potency</th>
                    <th>Astral / Umbral</th>
                    <th>Cast</th>
                    <th>MP</th>
                </tr>
                </tfoot>
                <draggable v-model="queue" :options="sortableOptions" :element="'tbody'" >
                    <tr v-for="(spell, index) in queue">
                        <td class="spell-handle">
                            <spellcast :spell="spell"></spellcast>
                        </td>
                        <td class="">
                            {{ calculated[index].potency.toFixed() }}
                        </td>
                        <td class="">
                            <template v-if="calculated[index].state.element === 'fire'">
                                <div v-for="i in calculated[index].state.stacks" class="stack stack-fire"></div>
                            </template>
                            <template v-if="calculated[index].state.element === 'ice'">
                                <div v-for="i in calculated[index].state.stacks" class="stack stack-ice"></div>
                            </template>
                        </td>
                        <td>
                            <small>{{calculated[index].cast}}s</small>
                        </td>
                        <td class="">
                            <small v-if="flags.mpPercentage">{{ ((calculated[index].mp / stats.mp) * 100).toFixed(2) }}%</small>
                            <small v-if="!flags.mpPercentage">{{ calculated[index].mp }} MP</small>
                            <span v-if="calculated[index].state.element === 'ice'" class="up"></span>
                        </td>
                    </tr>
                </draggable>
            </table>

            <div class="content">
                <h1>{{ potencyPerSecond }} p/s</h1>
                <p>
                    {{ totalPotency }} Potency over {{ totalDuration }} Seconds </p>
            </div>
        </div>
    </div>
</template>

<script>
    var _ = require('lodash');
    import spellcast from './Spellcast.vue';
    import spells from './support/spell-data';
    import draggable from 'vuedraggable'
    export default {
        data () {
            return {
                palette: Object.keys(spells),
                spells: spells,
                queue: ['fire1', 'fire3', 'fire1', 'fire1', 'fire1', 'blizzard3', 'fire3', 'fire1', 'fire1'],
                trash: [],
                stats: {
                    mp: 15480,
                },
                flags: {
                    mpPercentage: false,
                },
                sortableOptions: {
                    group: {name: 'rotation'},
                    handle: '.spellcast'
                },
                paletteOptions: {
                    group: {name: 'rotation', pull: 'clone'},
                    sort: false,
                    handle: '.spellcast'
                },
                trashOptions: {
                    group: {name: 'rotation'},

                }
            }
        },
        computed: {
            calculated () {
                let state   = {element: 'none', stacks: 0};
                let mp      = this.stats.mp;
                let results = [];
                let damage, cast, snapshot;
                for (let spell of this.queue) {
                    mp -= spells[spell].mp(state);
                    snapshot       = {
                        spell: spell,
                        mp: mp,
                        cast: spells[spell].cast(state),
                        recast: spells[spell].recast,
                        potency: spells[spell].potency(state),
                    };
                    state          = spells[spell].mutate(Object.assign({}, state));
                    snapshot.state = Object.assign({}, state);
                    results.push(snapshot);
                }
                return results;
            },
            totalPotency () {
                return this.calculated.reduce((sum, spellcast) => {
                    return sum + spellcast.potency;
                }, 0).toFixed(2);
            },
            totalDuration () {
                return this.calculated.reduce((sum, spellcast) => {
                    return sum + spellcast.cast + spellcast.recast;
                }, 0).toFixed(2);
            },
            potencyPerSecond () {
                return (this.totalPotency / this.totalDuration).toFixed(4);
            },
        },
        methods: {
            emptyTrash () {
                this.trash = [];
            }
        },
        components: {
            spellcast, draggable
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .spell-handle {

    }

    .stack {
        display: inline-block;
        position: relative;
        margin: 0 5px 0 0;
        width: 16px;
        height: 9.24px;
    }

    .stack-ice {
        background-color: #64C7CC;
    }

    .stack-ice:before,
    .stack-ice:after {
        content: "";
        position: absolute;
        width: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
    }

    .stack-ice:before {
        bottom: 100%;
        border-bottom: 4.62px solid #64C7CC;
    }

    .stack-ice:after {
        top: 100%;
        width: 0;
        border-top: 4.62px solid #64C7CC;
    }

    .stack-fire {
        background-color: #c12a51;
    }

    .stack-fire:before,
    .stack-fire:after {
        content: "";
        position: absolute;
        width: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
    }

    .stack-fire:before {
        bottom: 100%;
        border-bottom: 4.62px solid #c12a51;
    }

    .stack-fire:after {
        top: 100%;
        width: 0;
        border-top: 4.62px solid #c12a51;
    }

    .up {
        display: inline-block;
        width: 0;
        height: 0;
        border-bottom: 10.4px solid #64C7CC;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
    }

</style>
