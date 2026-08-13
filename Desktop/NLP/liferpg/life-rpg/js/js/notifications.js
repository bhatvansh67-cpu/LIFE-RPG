/* =========================================
   NOTIFICATION SYSTEM
========================================= */

function notify(
    message,
    type = "info",
    duration = 3000
) {

    let container =
        document.querySelector(
            "#notificationStack"
        );

    if (!container) {

        container =
            document.createElement("div");

        container.id =
            "notificationStack";

        document.body.appendChild(
            container
        );
    }


    const notification =
        document.createElement("div");

    notification.className =
        `notification ${type}`;


    const icons = {

        success: "✓",

        error: "✕",

        warning: "⚠",

        info: "◆",

        reward: "🪙",

        level: "⬆"

    };


    notification.innerHTML = `

        <div class="notification-icon">
            ${icons[type] || "◆"}
        </div>

        <div class="notification-content">
            ${message}
        </div>

        <button
            class="notification-close"
            aria-label="Close"
        >
            ×
        </button>
    `;


    container.appendChild(
        notification
    );


    requestAnimationFrame(() => {

        notification.classList.add(
            "show"
        );

    });


    const close =
        () => {

            notification.classList.remove(
                "show"
            );

            setTimeout(
                () =>
                    notification.remove(),
                250
            );
        };


    notification
        .querySelector(
            ".notification-close"
        )
        .onclick = close;


    setTimeout(
        close,
        duration
    );
}


/* Convenience functions */

function notifySuccess(message) {
    notify(message, "success");
}

function notifyError(message) {
    notify(message, "error");
}

function notifyWarning(message) {
    notify(message, "warning");
}

function notifyReward(message) {
    notify(message, "reward");
}

function notifyLevelUp(level) {
    notify(
        `LEVEL ${level} UNLOCKED`,
        "level",
        5000
    );
}