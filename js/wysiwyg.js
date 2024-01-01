export function makeSelectionBold() {
    document.execCommand("bold");
}

export function makeSelectionItalic() {
    document.execCommand("italic");
}

export function makeSelectionUnderline() {
    document.execCommand("underline");
}

export function makeSelectionSuperscript() {
    document.execCommand("superscript");
}

export function makeOrderedList() {
    document.execCommand("insertOrderedList");
}

export function makeUnorderedList() {
    document.execCommand("insertUnorderedList");
}

export function makeCodeBlock() {

    if (window.getSelection) {
        var selection = window.getSelection();
        if (selection.rangeCount) {
            var range = selection.getRangeAt(0);
            var selectedText = range.toString();
            var preWrappedText = "<pre><code>" + selectedText + "</code></pre>";

            // Use execCommand to replace selected text
            document.execCommand('insertHTML', false, preWrappedText);
        }
    }
}

