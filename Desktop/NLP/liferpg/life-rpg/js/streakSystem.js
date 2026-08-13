function updateStreak(gameData) {

    const today =
        new Date().toDateString();

    const lastDate =
        localStorage.getItem(
            "lifeRPGLastQuestDate"
        );


    if (lastDate === today) {
        return;
    }


    if (!lastDate) {

        gameData.stats.streak = 1;

    } else {

        const yesterday =
            new Date();

        yesterday.setDate(
            yesterday.getDate() - 1
        );


        if (
            lastDate ===
            yesterday.toDateString()
        ) {

            gameData.stats.streak++;

        } else {

            gameData.stats.streak = 1;

        }
    }


    localStorage.setItem(
        "lifeRPGLastQuestDate",
        today
    );
}