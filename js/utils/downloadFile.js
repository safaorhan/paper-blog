export function downloadFile(fileName, fileContents) {
    const file = new File([fileContents], fileName);

    const link = document.createElement("a");
    link.style.display = "none";
    link.href = URL.createObjectURL(file);
    link.download = file.name;

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.parentNode.removeChild(link);
    }, 0);
}