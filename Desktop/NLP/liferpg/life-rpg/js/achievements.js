const achievements = [

    {
        id: "firstQuest",
        name: "First Blood",
        description: "Complete your first quest.",
        icon: "⚔️",
        condition: gameData =>
            gameData.completedQuests >= 1
    },

    {
        id: "fiveQuests",
        name: "Getting Started",
        description: "Complete 5 quests.",
        icon: "🔥",
        condition: gameData =>
            gameData.completedQuests >= 5
    },

    {
        id: "tenQuests",
        name: "Quest Hunter",
        description: "Complete 10 quests.",
        icon: "🏹",
        condition: gameData =>
            gameData.completedQuests >= 10
    },

    {
        id: "levelFive",
        name: "Rising Hero",
        description: "Reach level 5.",
        icon: "⭐",
        condition: gameData =>
            gameData.level >= 5
    },

    {
        id: "levelTen",
        name: "Legend",
        description: "Reach level 10.",
        icon: "👑",
        condition: gameData =>
            gameData.level >= 10
    },

    {
        id: "hundredXP",
        name: "XP Collector",
        description: "Earn 100 total XP.",
        icon: "💎",
        condition: gameData =>
            gameData.totalXP >= 100
    }
];


function checkAchievements(gameData) {

    const newlyUnlocked = [];

    achievements.forEach(achievement => {

        const alreadyUnlocked =
            gameData.unlockedAchievements.includes(
                achievement.id
            );

        if (
            !alreadyUnlocked &&
            achievement.condition(gameData)
        ) {

            gameData.unlockedAchievements.push(
                achievement.id
            );

            newlyUnlocked.push(achievement);
        }
    });

    return newlyUnlocked;
}