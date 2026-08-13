function filterQuests(
    quests,
    search,
    category,
    sort
) {

    let result = [...quests];

    if (search) {

        result =
            result.filter(
                quest =>
                    quest.title
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
            );
    }


    if (category !== "all") {

        result =
            result.filter(
                quest =>
                    quest.category === category
            );
    }


    if (sort === "xp-high") {

        result.sort(
            (a, b) =>
                b.xp - a.xp
        );
    }


    if (sort === "xp-low") {

        result.sort(
            (a, b) =>
                a.xp - b.xp
        );
    }


    if (sort === "newest") {

        result.sort(
            (a, b) =>
                b.createdAt -
                a.createdAt
        );
    }


    if (sort === "difficulty") {

        const weights = {
            easy: 1,
            medium: 2,
            hard: 3,
            epic: 4
        };

        result.sort(
            (a, b) =>
                weights[b.difficulty] -
                weights[a.difficulty]
        );
    }


    return result;
}