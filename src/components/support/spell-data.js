const free = _ => {
    return 0;
};

const astralCast = baseCastTime => {
    return state => {
        if (state.element === 'ice' && state.stacks === 3) {
            return baseCastTime / 2;
        } else {
            return baseCastTime;
        }
    }
};

let expendNextUmbralHeart = false;
const astralMana          = baseMana => {
    return state => {
        expendNextUmbralHeart = false;
        if (state.element === 'fire') {
            if (state.umbralHearts) {
                expendNextUmbralHeart = true;
                return baseMana;
            } else {
                return baseMana * 2;
            }
        } else if (state.element === 'ice') {
            if (state.stacks === 1) {
                return baseMana / 2;
            } else {
                return baseMana / 4;
            }
        } else {
            return baseMana;
        }
    }
};

const astralPotency = basePotency => {
    return state => {
        if (state.element === 'fire') {
            switch (state.stacks) {
                case (1):
                    return 1.4 * basePotency;
                case (2):
                    return 1.6 * basePotency;
                case (3):
                    return 1.8 * basePotency;
            }
        } else if (state.element === 'ice') {
            switch (state.stacks) {
                case (1):
                    return 0.9 * basePotency;
                case (2):
                    return 0.8 * basePotency;
                case (3):
                    return 0.7 * basePotency;
            }
        } else {
            return basePotency;
        }
    }
};

const umbralCast = baseCastTime => {
    return state => {
        if (state.element === 'fire' && state.stacks === 3) {
            return baseCastTime / 2;
        } else {
            return baseCastTime;
        }
    }
};

const umbralMana = baseMana => {
    return state => {
        if (state.element === 'fire') {
            if (state.stacks === 1) {
                return baseMana / 2;
            } else {
                return baseMana / 4;
            }
        } else {
            return baseMana;
        }
    }
};

const umbralPotency = basePotency => {
    return state => {
        if (state.element === 'fire') {
            switch (state.stacks) {
                case (1):
                    return 0.9 * basePotency;
                case (2):
                    return 0.8 * basePotency;
                case (3):
                    return 0.7 * basePotency;
            }
        } else {
            return basePotency;
        }
    }
};

function checkUmbralHeartMutate(state) {
    if (expendNextUmbralHeart) {
        --state.umbralHearts;
    }
    expendNextUmbralHeart = false;
}

let aspectTimer = 13;
let recast      = 2.4;

export default {
    fire1: {
        type: 'gcd',
        name: "Fire",
        cast: astralCast(2.4),
        recast: recast,
        mp: astralMana(1200),
        potency: astralPotency(180),
        mutate: state => {
            checkUmbralHeartMutate(state);
            if (state.element === 'fire') {
                state.stacks++;
                if (state.stacks > 3) state.stacks = 3;
                state.aspectTimer = aspectTimer;
            } else if (state.element === 'ice') {
                state.element     = 'none';
                state.stacks      = 0;
                state.aspectTimer = 0;
            } else {
                state.element     = 'fire';
                state.stacks      = 1;
                state.aspectTimer = aspectTimer;
            }
            return state;
        }
    },
    fire3: {
        type: 'gcd',
        name: "Fire 3",
        cast: astralCast(3.3),
        recast: recast,
        mp: astralMana(2400),
        potency: astralPotency(240),
        mutate: state => {
            checkUmbralHeartMutate(state);
            state.element     = 'fire';
            state.stacks      = 3;
            state.aspectTimer = aspectTimer;
            return state;
        }
    },
    blizzard1: {
        type: 'gcd',
        name: "Blizzard",
        cast: umbralCast(2.4),
        recast: recast,
        mp: umbralMana(960),
        potency: umbralPotency(180),
        mutate: state => {
            if (state.element === 'ice') {
                state.stacks++;
                state.aspectTimer = aspectTimer;
                if (state.stacks > 3) state.stacks = 3;
            } else if (state.element === 'fire') {
                state.element     = 'none';
                state.stacks      = 0;
                state.aspectTimer = 0;
            } else {
                state.element     = 'ice';
                state.stacks      = 1;
                state.aspectTimer = aspectTimer;
            }
            return state;
        }
    },
    blizzard3: {
        type: 'gcd',
        name: "Blizzard 3",
        cast: umbralCast(3.3),
        recast: recast,
        mp: umbralMana(1440),
        potency: umbralPotency(240),
        mutate: state => {
            state.element     = 'ice';
            state.stacks      = 3;
            state.aspectTimer = aspectTimer;
            return state;
        }
    },
    enochian: {
        type: 'ogcd',
        name: "Enochian",
        cooldown: 30,
        mp: free,
        potency: free,
        mutate: state => {
            state.enochian = true;
            return state;
        },
        validate: state => {
            return state.element === 'none' ? 'Requires astral/umbral state' : '';
        }
    },
    transpose: {
        type: 'ogcd',
        name: "Transpose",
        cooldown: 12,
        mp: free,
        potency: free,
        mutate: state => {
            if (state.element === 'fire') {
                state.element     = 'ice';
                state.stacks      = 1;
                state.aspectTimer = aspectTimer;
            } else if (state.element === 'ice') {
                state.element = 'fire';
                state.stacks  = 1;
                state.aspectTimer = aspectTimer;
            }
            return state;
        },
        validate: state => {
            return state.element === 'none' ? 'Has no effect with no aspected state' : '';
        }
    },
    convert: {
        type: 'ogcd',
        name: "Convert",
        cooldown: 180,
        mp: free,
        potency: free,
        mutate: state => {
            state.mp += state.maxMp * 0.3;
            return state;
        }
    },
    fire4: {
        type: 'gcd',
        name: "Fire 4",
        cast: astralCast(2.8),
        recast: recast,
        mp: astralMana(1200),
        potency: astralPotency(260),
        mutate: state => {
            checkUmbralHeartMutate(state);
            return state;
        },
        validate: state => {
            return state.element !== 'fire' || state.enochian !== true ? 'Requires astral + enochian' : '';
        }
    },
    blizzard4: {
        type: 'gcd',
        name: "Blizzard 4",
        cast: umbralCast(2.8),
        recast: recast,
        mp: umbralMana(1440),
        potency: umbralPotency(260),
        mutate: state => {
            state.umbralHearts = 3;
            return state;
        },
        validate: state => {
            return state.element !== 'ice' || state.enochian !== true ? 'Requires umbral + enochian' : '';
        }
    },
}

