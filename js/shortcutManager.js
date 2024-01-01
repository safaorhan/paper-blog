import * as editor from "./wysiwyg.js";
import { publishPost } from "./publish.js";

export async function handleKeyDown(event) {

    if (event.code == "KeyB" && event.ctrlKey && event.altKey) {
        editor.makeSelectionBold();
    }

    if (event.code == "KeyI" && event.ctrlKey && event.altKey) {
        editor.makeSelectionItalic();
    }

    if (event.code == "KeyU" && event.ctrlKey && event.altKey) {
        editor.makeSelectionUnderline();
    }

    if (event.code == "ArrowUp" && event.ctrlKey && event.altKey) {
        editor.makeSelectionSuperscript();
    }

    if (event.code == "Digit1" && event.ctrlKey && event.altKey) {
        editor.makeOrderedList();
        event.preventDefault();
    }

    if (event.code == "Equal" && event.ctrlKey && event.altKey) {
        editor.makeUnorderedList();
        event.preventDefault();
    }

    if (event.code == "KeyC" && event.ctrlKey && event.altKey) {
        editor.makeCodeBlock();
    }

    if (event.keyCode == "KeyD" && event.ctrlKey && event.altKey) {
        await publishPost();
    }
}