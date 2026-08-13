function getRank(level) {

    if (level >= 50)
        return "LEGEND";

    if (level >= 30)
        return "MASTER";

    if (level >= 20)
        return "VETERAN";

    if (level >= 10)
        return "ELITE";

    if (level >= 5)
        return "ADVENTURER";

    return "NOVICE";
}


function updateCharacterUI(gameData) {

    const level =
        gameData.progression.level;


    document.getElementById(
        "playerName"
    ).textContent =
        gameData.player.name;


    document.getElementById(
        "playerTitle"
    ).textContent =
        gameData.player.title;


    document.getElementById(
        "avatarDisplay"
    ).textContent =
        gameData.player.avatar;


    document.getElementById(
        "levelDisplay"
    ).textContent =
        level;


    document.getElementById(
        "rank"
    ).textContent =
        getRank(level);


    document.getElementById(
        "coins"
    ).textContent =
        gameData.rewards.coins;


    document.getElementById(
        "walletBalance"
    ).textContent =
        gameData.rewards.coins;


    document.getElementById(
        "streak"
    ).textContent =
        gameData.stats.streak;


    document.getElementById(
        "completedQuests"
    ).textContent =
        gameData.stats.completedQuests;


    document.getElementById(
        "totalXP"
    ).textContent =
        gameData.progression.totalXP;


    document.getElementById(
        "productivity"
    ).textContent =
        `${gameData.stats.productivity}%`;


    updateAttributes(gameData);

    updateProductivityCircle(
        gameData
    );

    updateStakedCoins(
        gameData
    );
}


function updateAttributes(gameData) {

    const attributes =
        gameData.attributes;


    for (
        const attribute in attributes
    ) {

        const value =
            attributes[attribute];


        const text =
            document.getElementById(
                attribute
            );


        const bar =
            document.getElementById(
                `${attribute}Bar`
            );


        if (text) {

            text.textContent =
                value;

        }


        if (bar) {

            bar.style.width =
                `${Math.min(
                    value * 5,
                    100
                )}%`;

        }

    }
}


function updateProductivityCircle(
    gameData
) {

    const circle =
        document.getElementById(
            "scoreCircle"
        );


    if (!circle) return;


    const circumference =
        314;


    const score =
        Math.min(
            gameData.stats.productivity,
            100
        );


    circle.style.strokeDashoffset =
        circumference -
        (
            score / 100
        ) *
        circumference;
}


function updateStakedCoins(
    gameData
) {

    const staked =
        gameData.quests

            .filter(
                q =>
                    q.started &&
                    !q.completed &&
                    !q.failed
            )

            .reduce(
                (
                    total,
                    q
                ) =>
                    total + q.stake,
                0
            );


    const element =
        document.getElementById(
            "stakedCoins"
        );


    const savings =
        document.getElementById(
            "savingsAmount"
        );


    if (element) {

        element.textContent =
            staked;

    }


    if (savings) {

        savings.textContent =
            `${staked} 🪙`;

    }
}