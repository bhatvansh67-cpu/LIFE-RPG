function startQuest(
    gameData,
    questId
) {

    const quest =
        gameData.quests.find(
            q =>
                q.id === questId
        );


    if (!quest) {

        return {
            success: false,
            message: "QUEST NOT FOUND"
        };

    }


    if (quest.started) {

        return {
            success: false,
            message: "QUEST ALREADY STARTED"
        };

    }


    if (
        gameData.rewards.coins <
        quest.stake
    ) {

        return {
            success: false,
            message:
                "NOT ENOUGH COINS"
        };

    }


    /*
        LOCK THE MONEY
    */

    gameData.rewards.coins -=
        quest.stake;


    quest.started =
        true;


    quest.startedAt =
        Date.now();


    saveGameData(
        gameData
    );


    return {

        success: true,

        quest

    };
}


function completeQuest(
    gameData,
    questId
) {

    const quest =
        gameData.quests.find(
            q =>
                q.id === questId
        );


    if (
        !quest ||
        !quest.started ||
        quest.completed
    ) {

        return null;

    }


    quest.completed =
        true;


    /*
        RETURN STAKE
    */

    gameData.rewards.coins +=
        quest.stake;


    /*
        ADD PROFIT
    */

    gameData.rewards.coins +=
        quest.profit;


    /*
        XP
    */

    const xpResult =
        awardXP(
            gameData,
            quest.xp
        );


    gameData.stats.completedQuests++;


    increaseAttribute(
        gameData,
        quest.attribute
    );


    updateProductivity(
        gameData
    );


    return {

        quest,

        returned:
            quest.stake,

        profit:
            quest.profit,

        ...xpResult

    };
}


function failQuest(
    gameData,
    questId
) {

    const quest =
        gameData.quests.find(
            q =>
                q.id === questId
        );


    if (
        !quest ||
        !quest.started ||
        quest.completed
    ) {

        return null;

    }


    quest.failed =
        true;


    /*
        STAKE IS LOST.
    */

    return {

        quest,

        lost:
            quest.stake

    };
}


function deleteQuest(
    gameData,
    questId
) {

    gameData.quests =
        gameData.quests.filter(
            q =>
                q.id !== questId
        );
}


function increaseAttribute(
    gameData,
    attribute
) {

    if (
        gameData.attributes[
            attribute
        ] === undefined
    ) {

        return;

    }


    gameData.attributes[
        attribute
    ]++;
}


function updateProductivity(
    gameData
) {

    const completed =
        gameData.stats.completedQuests;


    gameData.stats.productivity =
        Math.min(
            completed * 5,
            100
        );
}