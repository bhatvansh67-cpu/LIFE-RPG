/* =========================================
   DAILY MISSION SYSTEM
========================================= */

const DAILY_MISSIONS = [

    {
        id: "three_quests",
        title: "TRIPLE THREAT",
        description: "Complete 3 quests today.",
        target: 3,
        type: "quests",
        reward: 100
    },

    {
        id: "five_quests",
        title: "PRODUCTIVITY MACHINE",
        description: "Complete 5 quests today.",
        target: 5,
        type: "quests",
        reward: 175
    },

    {
        id: "hard_quest",
        title: "NO EASY MODE",
        description: "Complete a HARD quest.",
        target: 1,
        type: "hard",
        reward: 150
    },

    {
        id: "earn_xp",
        title: "XP HUNTER",
        description: "Earn 150 XP today.",
        target: 150,
        type: "xp",
        reward: 125
    },

    {
        id: "earn_coins",
        title: "COIN RUN",
        description: "Earn 100 coins today.",
        target: 100,
        type: "coins",
        reward: 100
    }
];


function getDailyMission() {

    const today =
        new Date()
            .toISOString()
            .slice(0, 10);

    if (
        !state.dailyMission ||
        state.dailyMission.date !== today
    ) {

        const index =
            Math.floor(
                new Date().getTime()
                /
                86400000
            )
            %
            DAILY_MISSIONS.length;

        const mission =
            DAILY_MISSIONS[index];

        state.dailyMission = {

            ...mission,

            date: today,

            progress: 0,

            completed: false,

            claimed: false

        };

        saveState();
    }

    return state.dailyMission;
}


function updateDailyMission() {

    const mission =
        getDailyMission();

    if (mission.completed) return;


    if (mission.type === "quests") {

        mission.progress =
            state.quests.filter(
                quest =>
                    quest.status === "completed" &&
                    isToday(quest.completedAt)
            ).length;
    }


    if (mission.type === "hard") {

        mission.progress =
            state.quests.filter(
                quest =>
                    quest.status === "completed" &&
                    quest.difficulty === "hard" &&
                    isToday(quest.completedAt)
            ).length;
    }


    if (mission.type === "xp") {

        mission.progress =
            getTodayXP();
    }


    if (mission.type === "coins") {

        mission.progress =
            getTodayCoins();
    }


    if (
        mission.progress >=
        mission.target
    ) {

        mission.progress =
            mission.target;

        mission.completed = true;

        if (!mission.claimed) {

            mission.claimed = true;

            Economy.reward(
                mission.reward,
                "Daily mission reward"
            );

            notify(
                `DAILY MISSION COMPLETE +${mission.reward} 🪙`,
                "success"
            );
        }
    }

    saveState();
}


function isToday(timestamp) {

    if (!timestamp) return false;

    return new Date(timestamp)
        .toISOString()
        .slice(0, 10)
        ===
        new Date()
            .toISOString()
            .slice(0, 10);
}


function getTodayXP() {

    return (
        state.transactions || []
    )
        .filter(
            tx =>
                tx.type === "xp" &&
                isToday(tx.timestamp)
        )
        .reduce(
            (sum, tx) =>
                sum + Number(tx.amount || 0),
            0
        );
}


function getTodayCoins() {

    return (
        state.transactions || []
    )
        .filter(
            tx =>
                tx.type === "reward" &&
                isToday(tx.timestamp)
        )
        .reduce(
            (sum, tx) =>
                sum + Number(tx.amount || 0),
            0
        );
}


function renderDailyMission() {

    const mission =
        getDailyMission();

    const container =
        document.querySelector(
            "#dailyMission"
        );

    if (!container) return;

    const percent =
        Math.min(
            100,
            (mission.progress /
                mission.target) * 100
        );


    container.innerHTML = `

        <div class="daily-mission-card">

            <div class="mission-top">

                <div>
                    <span class="eyebrow">
                        DAILY CONTRACT
                    </span>

                    <h3>
                        ${mission.title}
                    </h3>

                    <p>
                        ${mission.description}
                    </p>
                </div>

                <div class="mission-reward">
                    +${mission.reward} 🪙
                </div>

            </div>


            <div class="mission-progress-row">

                <div class="mission-track">

                    <div
                        style="
                            width:${percent}%
                        "
                    ></div>

                </div>

                <strong>
                    ${mission.progress}
                    /
                    ${mission.target}
                </strong>

            </div>


            <div class="mission-status">

                ${
                    mission.completed
                    ? "✓ CONTRACT COMPLETED"
                    : `${mission.target -
                        mission.progress}
                        REMAINING`
                }

            </div>

        </div>
    `;
}