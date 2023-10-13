const html = document.querySelector("html")

html.addEventListener("keydown", (event) => {
    // Enter || Down Arrow
    if (event.keyCode == 68 && event.ctrlKey && event.altKey) {

        const copy = document.cloneNode(true)
        copy.querySelectorAll("[contenteditable=true]").forEach(element => {
            element.contentEditable = false;
        });

        copy.querySelectorAll(".readwrite").forEach(element => {
            element.outerHTML = ""
        });

        copy.querySelector("head > script").outerHTML = ""
        
        const titleText = copy.querySelector(".title h1").innerHTML;

        copy.querySelector("head > title").innerHTML = titleText.replace("<br>", " ") + " | Safa Orhan";

        const fileContents = copy.querySelector("html").outerHTML

        console.log(fileContents)

        const id = new URLSearchParams(window.location.search).get("id");

        const file = new File([fileContents], id + ".html");

        // Create a link and set the URL using `createObjectURL`
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = URL.createObjectURL(file);
        link.download = file.name;

        // It needs to be added to the DOM so it can be clicked
        document.body.appendChild(link);
        link.click();

        // To make this work on Firefox we need to wait
        // a little while before removing it.
        setTimeout(() => {
            URL.revokeObjectURL(link.href);
            link.parentNode.removeChild(link);
        }, 0);
    }
});

