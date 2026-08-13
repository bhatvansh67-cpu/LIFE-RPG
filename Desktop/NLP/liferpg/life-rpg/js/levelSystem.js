const BASE_XP = 100;

function getXPRequired(level) {

    return Math.floor(
        BASE_XP *
        Math.pow(1.22, level - 1)
    );
}


function calculateLevel(totalXP) {

    let level = 1;
    let remainingXP = totalXP;

    while (
        remainingXP >= getXPRequired(level)
    ) {

        remainingXP -= getXPRequired(level);

        level++;
    }

    return {
        level,
        xp: remainingXP,
        requiredXP: getXPRequired(level)
    };
}


function awardXP(gameData, amount) {

    const previousLevel =
        gameData.progression.level;

    gameData.progression.totalXP += amount;

    const result =
        calculateLevel(
            gameData.progression.totalXP
        );

    gameData.progression.level =
        result.level;

    gameData.progression.xp =
        result.xp;

    return {
        ...result,
        leveledUp:
            result.level > previousLevel
    };
}


function getXPPercentage(gameData) {

    return (
        gameData.progression.xp /
        getXPRequired(
            gameData.progression.level
        )
    ) * 100;
}