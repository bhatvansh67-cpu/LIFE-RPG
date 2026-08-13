const DIFFICULTY_CONFIG = {

    easy: {
        multiplier: 1,
        profitRate: 0.10
    },

    medium: {
        multiplier: 1.5,
        profitRate: 0.20
    },

    hard: {
        multiplier: 2,
        profitRate: 0.35
    },

    epic: {
        multiplier: 3,
        profitRate: 0.50
    }

};


function calculateQuestXP(
    baseXP,
    difficulty
) {

    const config =
        DIFFICULTY_CONFIG[difficulty];

    return Math.floor(
        baseXP * config.multiplier
    );
}


function calculateProfit(
    stake,
    difficulty
) {

    const config =
        DIFFICULTY_CONFIG[difficulty];

    return Math.max(
        1,
        Math.floor(
            stake * config.profitRate
        )
    );
}
const QUEST_DEADLINES = {

    easy: 24 * 60 * 60 * 1000,

    medium: 24 * 60 * 60 * 1000,

    hard: 12 * 60 * 60 * 1000,

    epic: 6 * 60 * 60 * 1000

};


function getQuestDeadline(
    difficulty
) {

    return (
        QUEST_DEADLINES[difficulty]
        || QUEST_DEADLINES.easy
    );

}