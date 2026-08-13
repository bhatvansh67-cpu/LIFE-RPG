const ACHIEVEMENTS = [
    {
        id: "first",
        name: "FIRST BLOOD",
        description: "Complete your first quest.",
        icon: "⚔️",

        check: (data) =>
            data.stats.completedQuests >= 1
    },

    {
        id: "five",
        name: "GETTING SERIOUS",
        description: "Complete 5 quests.",
        icon: "🔥",

        check: (data) =>
            data.stats.completedQuests >= 5
    },

    {
        id: "ten",
        name: "QUEST MACHINE",
        description: "Complete 10 quests.",
        icon: "⚙️",

        check: (data) =>
            data.stats.completedQuests >= 10
    },

    {
        id: "level5",
        name: "RISING HERO",
        description: "Reach level 5.",
        icon: "⭐",

        check: (data) =>
            data.progression.level >= 5
    },

    {
        id: "level10",
        name: "LEGEND",
        description: "Reach level 10.",
        icon: "👑",

        check: (data) =>
            data.progression.level >= 10
    },

    {
        id: "wealth",
        name: "COIN LORD",
        description: "Collect 100 coins.",
        icon: "🪙",

        check: (data) =>
            data.rewards.coins >= 100
    }
];


/* =========================================
   CHECK ACHIEVEMENTS
========================================= */

function checkAchievements(gameData) {

    const unlocked = [];

    for (const achievement of ACHIEVEMENTS) {

        if (
            gameData.achievements.includes(
                achievement.id
            )
        ) {
            continue;
        }

        if (achievement.check(gameData)) {

            gameData.achievements.push(
                achievement.id
            );

            unlocked.push(achievement);
        }
    }

    return unlocked;
}


/* =========================================
   RENDER ACHIEVEMENTS
========================================= */

function renderAchievements() {

    const container =
        document.getElementById(
            "achievementList"
        );

    if (!container) {
        return;
    }


    container.innerHTML =
        ACHIEVEMENTS
            .map((achievement) => {

                const unlocked =
                    gameData.achievements.includes(
                        achievement.id
                    );

                return `
                    <div
                        class="
                            achievement-card
                            ${unlocked ? "" : "locked"}
                        "
                    >

                        <div class="achievement-icon">
                            ${achievement.icon}
                        </div>


                        <div>

                            <div class="achievement-name">
                                ${achievement.name}
                            </div>

                            <div class="achievement-description">
                                ${achievement.description}
                            </div>

                        </div>


                        <div>
                            ${unlocked ? "✓" : "🔒"}
                        </div>

                    </div>
                `;

            })
            .join("");
}