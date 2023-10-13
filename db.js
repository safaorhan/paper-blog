import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const id = new URLSearchParams(window.location.search).get("id") || navigateToWarningDoc();

const firebaseConfig = {
    apiKey: "AIzaSyC8eHruJQ8K5gcHlXWq6sSfIbdRGnoSU_c",
    authDomain: "paper-9a0b5.firebaseapp.com",
    projectId: "paper-9a0b5",
    storageBucket: "paper-9a0b5.appspot.com",
    messagingSenderId: "596663898807",
    appId: "1:596663898807:web:07539d69005dbab4fc3332"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const postRef = doc(db, "posts", id);

const dom = {
    date: document.querySelector("#date"),
    title: document.querySelector("#title"),
    content: document.querySelector("#content"),
    login: document.querySelector("#login")
}

dom.login.addEventListener("click", async () => {
    await showSigninPopup()
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        dom.login.outerHTML = ""
        startPaper()
    }
});

async function startPaper() {
    await loadPost()
    startAutoSave()
}

function navigateToWarningDoc() {
    window.location = "?id=warning";
}

function navigateToBlog() {
    window.location = "/"
}

async function showSigninPopup() {
    try {
        await signInWithPopup(auth, provider);
    } catch (ex) {
        console.error(ex)
        navigateToBlog()
    }
}

function startAutoSave() {
    const observer = new MutationObserver(async () => {
        await savePost()
    });

    observer.observe(dom.date, { subtree: true, childList: true, characterData: true });
    observer.observe(dom.title, { subtree: true, childList: true, characterData: true });
    observer.observe(dom.content, { subtree: true, childList: true, characterData: true });
}

async function loadPost() {
    const post = (await getDoc(postRef)).data()

    if (post) {
        dom.date.innerHTML = post.date
        dom.title.innerHTML = post.title
        dom.content.innerHTML = post.content
    }
}

async function savePost() {
    await setDoc(postRef, {
        date: dom.date.innerHTML,
        title: dom.title.innerHTML,
        content: dom.content.innerHTML
    });
}
