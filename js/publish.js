import { getPublishedPosts, setPostPublished } from "./firestore.js"
import { downloadDocument, downloadIndexPage } from "./download.js"

export async function publishPost() {
    await setPostPublished()
    downloadDocument()
    await downloadIndexPage(await getPublishedPosts())
}