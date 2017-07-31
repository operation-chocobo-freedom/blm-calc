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

const astralMana = baseMana => {
    return state => {
        if (state.element === 'fire') {
            return baseMana * 2;
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


export default {
    fire1: {
        type: 'gcd',
        name: "Fire",
        cast: astralCast(2.4),
        recast: 2.4,
        mp: astralMana(1200),
        potency: astralPotency(180),
        mutate: state => {
            if (state.element === 'fire') {
                state.stacks++;
                if (state.stacks > 3) state.stacks = 3;
            } else if (state.element === 'ice') {
                state.element = 'none';
                state.stacks  = 0;
            } else {
                state.element = 'fire';
                state.stacks  = 1;
            }
            return state;
        }
    },
    fire3: {
        type: 'gcd',
        name: "Fire 3",
        cast: astralCast(3.3),
        recast: 2.4,
        mp: astralMana(2400),
        potency: astralPotency(240),
        mutate: state => {
            state.element = 'fire';
            state.stacks  = 3;
            return state;
        }
    },
    blizzard3: {
        type: 'gcd',
        name: "Blizzard 3",
        cast: umbralCast(3.3),
        recast: 2.4,
        mp: umbralMana(1440),
        potency: umbralPotency(240),
        mutate: state => {
            state.element = 'ice';
            state.stacks  = 3;
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
        }
    }
}

