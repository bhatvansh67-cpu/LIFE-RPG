const STORAGE_KEY = "lifeRPG";


function getDefaultGameData() {

    return {

        player: {

            name: "ADVENTURER",

            title: "BEGINNER",

            avatar: "⚔️",

            theme: "violet"

        },


        progression: {

            level: 1,

            xp: 0,

            totalXP: 0

        },


        rewards: {

            coins: 100

        },


        stats: {

            completedQuests: 0,

            streak: 0,

            productivity: 0

        },


        attributes: {

            strength: 1,

            intelligence: 1,

            vitality: 1,

            discipline: 1

        },


        quests: [],

        achievements: []

    };
}


function loadGameData() {

    const saved =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!saved) {

        return getDefaultGameData();

    }


    try {

        const data =
            JSON.parse(saved);

        return mergeDefaults(
            getDefaultGameData(),
            data
        );

    } catch {

        return getDefaultGameData();

    }
}


function mergeDefaults(
    defaults,
    data
) {

    const result = {
        ...defaults,
        ...data
    };


    for (
        const key in defaults
    ) {

        if (
            typeof defaults[key] === "object" &&
            defaults[key] !== null &&
            !Array.isArray(defaults[key])
        ) {

            result[key] = {

                ...defaults[key],

                ...(data[key] || {})

            };

        }

    }


    return result;
}


function saveGameData(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


function resetGameData() {

    localStorage.removeItem(
        STORAGE_KEY
    );

    localStorage.removeItem(
        "lifeRPGLastQuestDate"
    );

    location.reload();
}