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



            <table class="table is-fullwidth">
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Potency</th>
                    <th>Astral / Umbral</th>
                    <th>Cast</th>
                    <th>
                        MP
                        <span @click="flags.mpPercentage = true">%</span>
                        <span @click="flags.mpPercentage = false">pt</span>
                    </th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Potency</th>
                    <th>Astral / Umbral</th>
                    <th>Cast</th>
                    <th>MP</th>
                </tr>
                </tfoot>

                <tbody v-dragula="queue" drake="first">
                <tr v-for="(spell, index) in queue" :key="index">
                    <td>{{ index }}</td>
                    <td class="">
                        <spellcast :spell="spell"></spellcast>
                    </td>
                    <td class="">
                        {{ calculated[index].potency }}
                    </td>
                    <td class="">
                        <template v-if="calculated[index].state.element === 'fire'">
                            <div v-for="i in calculated[index].state.stacks" class="stack stack-fire"></div>
                        </template>
                        <template v-if="calculated[index].state.element === 'ice'">
                            <div v-for="i in calculated[index].state.stacks" class="stack stack-ice"></div>
                        </template>
                    </td>
                    <td><small>{{calculated[index].cast}}s</small></td>
                    <td class="">
                        <small v-if="flags.mpPercentage">{{ ((calculated[index].mp / stats.mp) * 100).toFixed(2) }}%</small>
                        <small v-if="!flags.mpPercentage">{{ calculated[index].mp }} MP</small>
                        <span v-if="calculated[index].state.element === 'ice'" class="up"></span>
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="content">
                <h1>{{ potencyPerSecond }} p/s</h1>
                <p>
                    {{ totalPotency }} Potency over {{ totalDuration }} Seconds
                </p>
            </div>

            <div class="notification">
                {{ queue }}
            </div>
            <div class="notification">
                {{ calculated }}
            </div>
        </div>
    </div>
</template>

<script>
    import spellcast from './Spellcast.vue';
    import spells from './support/spell-data';
    export default {
        data () {
            return {
                spells: spells,
                queue: ['fire1', 'fire3', 'fire1', 'fire1', 'fire1', 'blizzard3', 'fire3', 'fire1', 'fire1'],
                stats: {
                    mp: 15480,
                },
                flags: {
                    mpPercentage: false,
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
        components: {
            spellcast
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

    .gu-mirror {
        position: fixed !important;
        margin: 0 !important;
        z-index: 9999 !important;
        opacity: 0.8;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
        filter: alpha(opacity=80);
    }
    .gu-hide {
        display: none !important;
    }
    .gu-unselectable {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
    }
    .gu-transit {
        opacity: 0.2;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
        filter: alpha(opacity=20);
    }
</style>
