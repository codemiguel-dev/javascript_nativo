document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cells__input");
    const formulaBar = document.querySelector(".cell-content div:nth-child(2)");
    
    let selectedCell = null;

    cells.forEach((cell, index) => {
        const column = String.fromCharCode(65 + (index % 10)); // A-J
        const row = Math.floor(index / 10) + 1;
        cell.dataset.cell = `${column}${row}`;

        cell.addEventListener("focus", () => {
            selectedCell = cell;
            formulaBar.textContent = cell.dataset.cell;
        });

        cell.addEventListener("input", () => {
            if (cell.value.startsWith("=")) {
                try {
                    const formula = cell.value.substring(1);
                    cell.dataset.formula = formula;
                    cell.value = evalFormula(formula);
                } catch (e) {
                    cell.value = "ERROR";
                }
            }
        });
    });

    function evalFormula(formula) {
        return Function("return " + formula)();
    }
});
