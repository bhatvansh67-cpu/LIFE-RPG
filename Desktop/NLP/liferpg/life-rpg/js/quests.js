const DEFAULT_QUESTS = [

    {
        id: crypto.randomUUID(),

        title: "DRINK 2L WATER",

        description:
            "Stay hydrated throughout the day.",

        xp: 20,

        stake: 10,

        profit: 2,

        category: "Health",

        difficulty: "easy",

        attribute: "vitality",

        completed: false,

        started: false,

        failed: false,

        createdAt: Date.now()
    },


    {
        id: crypto.randomUUID(),

        title: "WORKOUT 30 MIN",

        description:
            "Train your body and build discipline.",

        xp: 40,

        stake: 20,

        profit: 5,

        category: "Fitness",

        difficulty: "medium",

        attribute: "strength",

        completed: false,

        started: false,

        failed: false,

        createdAt: Date.now()
    },


    {
        id: crypto.randomUUID(),

        title: "READ 20 PAGES",

        description:
            "Learn something useful.",

        xp: 35,

        stake: 15,

        profit: 4,

        category: "Learning",

        difficulty: "medium",

        attribute: "intelligence",

        completed: false,

        started: false,

        failed: false,

        createdAt: Date.now()
    },


    {
        id: crypto.randomUUID(),

        title: "DEEP WORK SESSION",

        description:
            "Complete 60 minutes of focused work.",

        xp: 70,

        stake: 30,

        profit: 12,

        category: "Work",

        difficulty: "hard",

        attribute: "discipline",

        completed: false,

        started: false,

        failed: false,

        createdAt: Date.now()
    }

];


function initializeQuests(gameData) {

    if (
        gameData.quests.length === 0
    ) {

        gameData.quests =
            DEFAULT_QUESTS.map(
                quest => ({
                    ...quest
                })
            );

        saveGameData(
            gameData
        );
    }
}


function createQuest(data) {

    return {

        id:
            crypto.randomUUID(),

        title:
            data.title,

        description:
            data.description || "",

        xp:
            Number(data.xp),

        stake:
            Number(data.stake),

        profit:
            Number(data.profit),

        category:
            data.category,

        difficulty:
            data.difficulty,

        attribute:
            data.attribute,

        completed:
            false,

        started:
            false,

        failed:
            false,

        createdAt:
            Date.now()

    };
}