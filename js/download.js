import { formatDate } from "./utils/formatDate.js";
import { downloadFile } from "./utils/downloadFile.js";

function sanitizePostHtml(html) {
    html.querySelectorAll("[contenteditable=true]").forEach(element => {
        element.contentEditable = false;
    });

    html.querySelectorAll(".remove").forEach(element => {
        element.outerHTML = ""
    });

    html.querySelector("head > script").outerHTML = "";

    const titleText = html.querySelector(".title h1").innerHTML;

    html.querySelector("head > title").innerHTML = titleText.replace("<br>", " ") + " | Safa Orhan";
}

export function downloadDocument() {
    const copy = document.cloneNode(true)
    sanitizePostHtml(copy);

    const postId = new URLSearchParams(window.location.search).get("id");
    downloadFile(postId + ".html", copy.querySelector("html").outerHTML)
}

export async function downloadIndexPage(posts) {
    const response = await fetch("./index.html");
    const responseText = await response.text();
    const indexHtml = new DOMParser().parseFromString(responseText, "text/html");
    const indexDiv = indexHtml.querySelector("div.index");

    indexDiv.innerHTML = "";

    posts.forEach((post) => {
        const date = formatDate(new Date(post.publishedAt.seconds * 1000));
        indexDiv.innerHTML += `<p><span class="title"><a href="/${post.link}">${post.titleStr}</a></span><span class="date">${date}</span></p>\n`
    });

    downloadFile("index.html", indexHtml.querySelector("html").outerHTML)
}
