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
                <div class="column">
                    <div class="field">
                        <label class="label">Show MP as Percentage</label>
                        <div class="control">
                            <label class="radio">
                                <input type="radio" name="question" :value="true" v-model="flags.mpPercentage">
                                Yes
                            </label>
                            <label class="radio">
                                <input type="radio" name="question" :value="false" v-model="flags.mpPercentage">
                                No
                            </label>
                        </div>
                    </div>
                </div>
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
            <a class="button is-danger" @click="clear()">Clear</a>


            <table class="table is-fullwidth">
                <thead>
                <tr>
                    <th></th>
                    <th>Potency</th>
                    <th>Stacks</th>
                    <th>Cast</th>
                    <th>MP</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th></th>
                    <th>Potency</th>
                    <th>Stacks</th>
                    <th>Cast</th>
                    <th>MP</th>
                </tr>
                </tfoot>
                <draggable v-model="queue" :options="sortableOptions" :element="'tbody'" >
                    <template v-for="(spell, index) in queue">
                        <tr :class="{warning: calculated[index].warning}">
                            <td class="spell-handle">
                                <spellcast :spell="spell" :warning="calculated[index].warning"></spellcast>
                            </td>
                            <td class="">
                                <span v-if="calculated[index].potency === 0">

                                </span>
                                <span v-if="calculated[index].potency !== 0">
                                    {{ calculated[index].potency.toFixed() }}
                                </span>
                            </td>
                            <td class="">
                                <enochian :state="calculated[index].state.enochian"></enochian>
                                <template v-if="calculated[index].state.element === 'fire'">
                                    <aspect-stack element="fire" :count="calculated[index].state.stacks"></aspect-stack>
                                </template>
                                <template v-if="calculated[index].state.element === 'ice'">
                                    <aspect-stack element="ice" :count="calculated[index].state.stacks"></aspect-stack>
                                </template>
                                <umbral-heart :count="calculated[index].state.umbralHearts"></umbral-heart>

                            </td>
                            <td>
                                <small v-if="calculated[index].type === 'gcd'">{{calculated[index].cast}}s</small>
                                <small v-if="calculated[index].type === 'ogcd'"></small>
                            </td>
                            <td class="">
                                <span v-if="calculated[index].state.element === 'ice'" class="up"></span>

                                <small v-if="flags.mpPercentage">{{ ((calculated[index].mp / stats.mp) * 100).toFixed(2) }}%</small>
                                <small v-if="!flags.mpPercentage">{{ calculated[index].mp }}</small>

                                <small class="mp-delta mp-increase" v-if="calculated[index].mpChange > 0">+ {{calculated[index].mpChange}}</small>
                                <small class="mp-delta mp-decrease" v-if="calculated[index].mpChange < 0">{{calculated[index].mpChange}}</small>

                            </td>
                        </tr>
                    </template>
                    <tr v-if="queue.length === 0">
                    <td colspan="500" class="empty-queue"><em>Build your rotation here! Drag spells from the box above.</em></td>
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
    import aspectStack from './AspectStack.vue';
    import enochian from './Enochian.vue';
    import umbralHeart from './UmbralHeart.vue';
    import spells from './support/spell-data';
    import draggable from 'vuedraggable'
    export default {
        data () {
            return {
                palette: Object.keys(spells),
                spells: spells,
                queue: ['blizzard3', 'enochian', 'blizzard4', 'fire3', 'fire4', 'fire4', 'fire4', 'fire4', 'fire1'],
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
                    group: {name: 'rotation', pull: 'clone', put: false},
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
                let state   = {element: 'none', stacks: 0, enochian: false};
                let mp      = this.stats.mp;
                let results = [];
                for (let spell of this.queue) {
                    let snapshot = {};
                    let data = spells[spell];

                    if (data.type === 'gcd') {
                        let originalMp = mp;
                        mp -= data.mp(state);
                        snapshot = {
                            type: 'gcd',
                            spell: spell,
                            mp: mp,
                            mpChange: mp - originalMp,
                            cast: data.cast(state),
                            recast: data.recast,
                            potency: data.potency(state),
                            warning: data.validate ? data.validate(state) : '',
                        };
                    } else if (data.type === 'ogcd') {
                        snapshot = {
                            type: 'ogcd',
                            spell: spell,
                            mp: mp,
                            mpChange: 0,
                            cast: 'weave',
                            recast: data.recast,
                            potency: data.potency(state),
                            warning: data.validate ? data.validate(state) : '',
                        };
                    }

                    state          = data.mutate(Object.assign({}, state));
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
                return this.calculated.filter(snapshot => {
                    // limit to only GCDs
                    return snapshot.type === 'gcd';
                }).reduce((sum, spellcast) => {
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
            },
            clear () {
                this.queue = [];
            }
        },
        components: {
            spellcast, draggable, "aspect-stack": aspectStack, enochian, "umbral-heart": umbralHeart,
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .empty-queue {
        padding: 2rem 0;
        text-align: center;
    }

    .spell-handle {
    }

    .warning {
        background: #fdd;
    }
    .warning:hover {
        background: #faa;
    }

    .mp-delta {
        font-size: 0.6rem;
        position: relative;
        top: -1px;
        font-weight: bold;
    }

    .mp-increase {
        color: #070;
    }

    .mp-decrease {
        color: #700;
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
