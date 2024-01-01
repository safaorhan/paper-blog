import { formatDate } from "./utils/formatDate.js";
import { handleKeyDown } from "./shortcutManager.js";

document.addEventListener("DOMContentLoaded", function (event) {
    showTodaysDate()

    document.querySelectorAll(".editable").forEach((element) => {
        element.setAttribute("contenteditable", true)
    })

    const title = document.querySelector(".title")

    const content = document.querySelector(".content")

    title.focus()

    title.addEventListener("keydown", (event) => {
        if (event.isComposing || event.keyCode === 229) {
            return;
        }

        // Enter || Down Arrow
        if ((event.keyCode === 13 || event.keyCode === 40) && !event.shiftKey) {
            content.focus()
            event.preventDefault()
        }

        // Backspace
        if (event.keyCode === 8 && title.children[0].innerHTML == "<br>") {
            event.preventDefault()
        }
    });

    content.addEventListener("keydown", (event) => {
        if (event.isComposing || event.keyCode === 229) {
            return;
        }

        // Up Arrow
        if (event.keyCode === 38) {
            const firstP = document.querySelector(".content > p:first-child")
            const focusNode = document.getSelection().focusNode
            const focusedP = focusNode.nodeName == "#text" ? focusNode.parentElement : focusNode

            if (firstP.isEqualNode(focusedP)) {
                title.focus()
                event.preventDefault()
            }
        }

        // Backspace
        if (event.keyCode === 8) {
            if (content.children.length == 1 && content.children[0].innerHTML == "<br>") {
                event.preventDefault()
            }
        }
    });
});

function showTodaysDate() {
    const today = new Date();
    document.querySelector("#date").innerHTML = formatDate(today);
}

document.addEventListener("keydown", async (event) => {
    await handleKeyDown(event);
});