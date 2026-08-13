/* =========================================
   LIFE RPG - ECONOMY SYSTEM
   Virtual savings / commitment system
========================================= */

const Economy = {

    get balance() {
        return Number(state?.wallet?.available || 0);
    },

    get locked() {
        return Number(state?.wallet?.locked || 0);
    },

    canAfford(amount) {
        return this.balance >= amount;
    },

    lock(amount, reason = "Quest stake") {

        amount = Number(amount);

        if (!this.canAfford(amount)) {
            return false;
        }

        state.wallet.available -= amount;
        state.wallet.locked += amount;

        this.transaction(
            -amount,
            reason,
            "locked"
        );

        saveState();

        return true;
    },

    unlock(amount, reason = "Stake returned") {

        amount = Number(amount);

        amount = Math.min(
            amount,
            state.wallet.locked
        );

        state.wallet.locked -= amount;
        state.wallet.available += amount;

        this.transaction(
            amount,
            reason,
            "returned"
        );

        saveState();
    },

    reward(amount, reason = "Quest reward") {

        amount = Number(amount);

        state.wallet.available += amount;
        state.wallet.earned += amount;

        this.transaction(
            amount,
            reason,
            "reward"
        );

        saveState();
    },

    lose(amount, reason = "Quest failed") {

        amount = Number(amount);

        amount = Math.min(
            amount,
            state.wallet.locked
        );

        state.wallet.locked -= amount;
        state.wallet.lost += amount;

        this.transaction(
            -amount,
            reason,
            "loss"
        );

        saveState();
    },

    transaction(amount, description, type) {

        if (!state.transactions) {
            state.transactions = [];
        }

        state.transactions.unshift({
            id: crypto.randomUUID
                ? crypto.randomUUID()
                : Date.now().toString(),

            amount,
            description,
            type,

            timestamp: new Date().toISOString()
        });

        state.transactions =
            state.transactions.slice(0, 50);
    },

    get netWorth() {

        return (
            Number(state.wallet.available || 0) +
            Number(state.wallet.locked || 0)
        );
    },

    get savingsRate() {

        const total =
            this.netWorth;

        if (!total) return 0;

        return Math.round(
            (this.locked / total) * 100
        );
    },

    format(amount) {

        return Number(amount).toLocaleString();
    }
};


/* =========================================
   ECONOMY UI
========================================= */

function renderEconomyPanel() {

    const container =
        document.querySelector(
            "#economyPanel"
        );

    if (!container) return;

    container.innerHTML = `

        <div class="economy-header">
            <div>
                <span class="eyebrow">
                    PERSONAL ECONOMY
                </span>

                <h2>COMMITMENT BANK</h2>
            </div>

            <div class="economy-balance">
                🪙 ${Economy.format(
                    Economy.balance
                )}
            </div>
        </div>


        <div class="economy-grid">

            <div class="economy-stat">
                <span>AVAILABLE</span>
                <strong>
                    ${Economy.format(
                        Economy.balance
                    )}
                </strong>
            </div>

            <div class="economy-stat locked">
                <span>LOCKED</span>
                <strong>
                    ${Economy.format(
                        Economy.locked
                    )}
                </strong>
            </div>

            <div class="economy-stat">
                <span>NET WORTH</span>
                <strong>
                    ${Economy.format(
                        Economy.netWorth
                    )}
                </strong>
            </div>

        </div>


        <div class="savings-meter">

            <div class="savings-label">
                <span>COMMITMENT RATE</span>

                <strong>
                    ${Economy.savingsRate}%
                </strong>
            </div>

            <div class="savings-track">
                <div
                    style="
                        width:${Economy.savingsRate}%
                    "
                ></div>
            </div>

        </div>
    `;
}