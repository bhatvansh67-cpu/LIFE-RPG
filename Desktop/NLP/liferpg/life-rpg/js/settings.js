function setupSettings(gameData) {

    const settingsButton =
        document.getElementById(
            "settingsButton"
        );

    const settingsModal =
        document.getElementById(
            "settingsModal"
        );

    const saveButton =
        document.getElementById(
            "saveSettings"
        );

    const nameInput =
        document.getElementById(
            "settingsName"
        );

    const titleInput =
        document.getElementById(
            "settingsTitle"
        );

    const themeSelector =
        document.getElementById(
            "themeSelector"
        );


    settingsButton.addEventListener(
        "click",
        () => {

            nameInput.value =
                gameData.player.name;

            titleInput.value =
                gameData.player.title;

            themeSelector.value =
                gameData.player.theme;

            settingsModal.classList.remove(
                "hidden"
            );
        }
    );


    themeSelector.addEventListener(
        "change",
        () => {

            applyTheme(
                themeSelector.value
            );
        }
    );


    saveButton.addEventListener(
        "click",
        () => {

            gameData.player.name =
                nameInput.value
                    .trim()
                    .toUpperCase()
                || "PLAYER";

            gameData.player.title =
                titleInput.value
                    .trim()
                    .toUpperCase()
                || "BEGINNER";

            gameData.player.theme =
                themeSelector.value;

            applyTheme(
                gameData.player.theme
            );

            saveGameData(gameData);

            updateCharacterUI(gameData);

            settingsModal.classList.add(
                "hidden"
            );
        }
    );


    document
        .getElementById("resetGame")
        .addEventListener(
            "click",
            () => {

                if (
                    confirm(
                        "RESET YOUR ENTIRE CHARACTER?"
                    )
                ) {

                    resetGameData();
                }
            }
        );
}


function applyTheme(theme) {

    document.documentElement.dataset.theme =
        theme;
}