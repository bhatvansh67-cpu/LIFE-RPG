let gameData;


/* ===============================
   INIT
================================ */

function init() {

    gameData =
        loadGameData();

    initializeQuests(
        gameData
    );

    applyTheme(
        gameData.player.theme
    );

    setupSettings(
        gameData
    );

    setupQuestEvents();

    setupGlobalEvents();

    render();

}


/* ===============================
   RENDER
================================ */

function render() {

    updateCharacterUI(
        gameData
    );

    renderXP();

    renderQuests();

    renderAchievements();
}


/* ===============================
   XP
================================ */

function renderXP() {

    const level =
        gameData.progression.level;

    const xp =
        gameData.progression.xp;

    const required =
        getXPRequired(level);

    document.getElementById(
        "currentXP"
    ).textContent = xp;

    document.getElementById(
        "requiredXP"
    ).textContent = required;

    document.getElementById(
        "xpProgress"
    ).style.width =
        `${(xp / required) * 100}%`;
}


/* ===============================
   QUEST EVENTS
================================ */

function setupQuestEvents() {

    document
        .getElementById(
            "addQuestButton"
        )
        .addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "questModal"
                    )
                    .classList.remove(
                        "hidden"
                    );
            }
        );


    document
        .getElementById(
            "questForm"
        )
        .addEventListener(
            "submit",
            createNewQuest
        );


    document
        .getElementById(
            "questSearch"
        )
        .addEventListener(
            "input",
            renderQuests
        );


    document
        .getElementById(
            "categoryFilter"
        )
        .addEventListener(
            "change",
            renderQuests
        );


    document
        .getElementById(
            "sortFilter"
        )
        .addEventListener(
            "change",
            renderQuests
        );
}


/* ===============================
   CREATE QUEST
================================ */

function createNewQuest(event) {

    event.preventDefault();


    const quest =
        createQuest({

            title:
                document
                    .getElementById(
                        "questTitle"
                    )
                    .value
                    .trim()
                    .toUpperCase(),

            xp:
                document
                    .getElementById(
                        "questXP"
                    )
                    .value,

            coins:
                document
                    .getElementById(
                        "questCoins"
                    )
                    .value,

            category:
                document
                    .getElementById(
                        "questCategory"
                    )
                    .value,

            difficulty:
                document
                    .getElementById(
                        "questDifficulty"
                    )
                    .value,

            description:
                document
                    .getElementById(
                        "questDescription"
                    )
                    .value,

            attribute:
                document
                    .getElementById(
                        "questAttribute"
                    )
                    .value

        });


    gameData.quests.unshift(
        quest
    );

    saveGameData(
        gameData
    );

    event.target.reset();

    closeModal(
        "questModal"
    );

    render();
}


/* ===============================
   QUEST RENDERING
================================ */

function renderQuests() {

    const list =
        document.getElementById(
            "questList"
        );


    const search =
        document.getElementById(
            "questSearch"
        ).value;


    const category =
        document.getElementById(
            "categoryFilter"
        ).value;


    const sort =
        document.getElementById(
            "sortFilter"
        ).value;


    const quests =
        filterQuests(
            gameData.quests,
            search,
            category,
            sort
        );


    if (!quests.length) {

        list.innerHTML = `
            <div class="brutal-card"
                 style="padding:40px;text-align:center">

                <h2>NO QUESTS FOUND.</h2>

                <p>
                    CREATE A NEW MISSION.
                </p>

            </div>
        `;

        return;
    }


    list.innerHTML =
        quests
            .map(
                quest =>
                    questHTML(quest)
            )
            .join("");


    list
        .querySelectorAll(
            ".quest-check"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () =>
                        completeQuestUI(
                            button.dataset.id
                        )
                );
            }
        );


    list
        .querySelectorAll(
            ".delete-quest"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () =>
                        removeQuest(
                            button.dataset.id
                        ))
            }
        );
}


function questHTML(quest) {

    const difficultyColors = {

        easy: "#98f5a8",

        medium: "#90dbf4",

        hard: "#ff8fab",

        epic: "#ffe500"

    };


    return `

        <article
            class="
                quest-card
                ${quest.completed ? "completed" : ""}
            "
        >

            <button
                class="quest-check"
                data-id="${quest.id}"
            >
                ${quest.completed ? "✓" : "→"}
            </button>


            <div>

                <div class="quest-title">
                    ${escapeHTML(
                        quest.title
                    )}
                </div>


                <div class="quest-description">
                    ${escapeHTML(
                        quest.description
                    )}
                </div>


                <div class="quest-meta">

                    <span class="quest-tag">
                        ${quest.category}
                    </span>

                    <span
                        class="quest-tag"
                        style="
                            background:${difficultyColors[
                                quest.difficulty
                            ]}
                        "
                    >
                        ${quest.difficulty.toUpperCase()}
                    </span>

                    <span class="quest-tag">
                        +${quest.coins} 🪙
                    </span>

                    <span class="quest-tag">
                        ${quest.attribute.toUpperCase()}
                    </span>

                </div>

            </div>


            <div class="quest-reward">

                <strong>
                    +${quest.xp} XP
                </strong>

                <small>
                    ${quest.difficulty.toUpperCase()}
                </small>

                <button
                    class="delete-quest"
                    data-id="${quest.id}"
                >
                    🗑
                </button>

            </div>

        </article>
    `;
}


/* ===============================
   COMPLETE
================================ */

function completeQuestUI(id) {

    const result =
        completeQuest(
            gameData,
            id
        );


    if (!result) {
        return;
    }


    updateStreak(
        gameData
    );


    const unlocked =
        checkAchievements(
            gameData
        );


    saveGameData(
        gameData
    );


    render();


    if (
        result.leveledUp
    ) {

        document.getElementById(
            "newLevel"
        ).textContent =
            gameData.progression.level;

        document.getElementById(
            "levelModal"
        ).classList.remove(
            "hidden"
        );
    }


    if (unlocked.length) {

        console.log(
            "UNLOCKED:",
            unlocked
        );
    }
}


/* ===============================
   DELETE
================================ */

function removeQuest(id) {

    if (
        !confirm(
            "DELETE THIS QUEST?"
        )
    ) {
        return;
    }


    deleteQuest(
        gameData,
        id
    );

    saveGameData(
        gameData
    );

    render();
}


/* ===============================
   GLOBAL EVENTS
================================ */

function setupGlobalEvents() {

    document
        .querySelectorAll(
            "[data-close]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        closeModal(
                            button.dataset.close
                        );
                    }
                );
            }
        );


    document
        .getElementById(
            "changeAvatar"
        )
        .addEventListener(
            "click",
            changeAvatar
        );
}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.add(
            "hidden"
        );
}


function changeAvatar() {

    const avatars = [
        "⚔️",
        "🧙",
        "🥷",
        "🧛",
        "🤖",
        "👑",
        "🦹",
        "🧝",
        "🐉",
        "💀"
    ];


    const current =
        avatars.indexOf(
            gameData.player.avatar
        );


    const next =
        avatars[
            (current + 1) %
            avatars.length
        ];


    gameData.player.avatar =
        next;

    saveGameData(
        gameData
    );

    updateCharacterUI(
        gameData
    );
}


/* ===============================
   SECURITY
================================ */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        value;

    return div.innerHTML;
}


/* ===============================
   START
================================ */

init();
setupSpatialUI();
function setupSpatialUI() {

    const cards =
        document.querySelectorAll(
            "[data-tilt]"
        );


    cards.forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    (
                        x -
                        centerX
                    ) /
                    25;


                const rotateX =
                    -(
                        y -
                        centerY
                    ) /
                    25;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-3px)
                    `;
            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });
}