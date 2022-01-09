const previewBox = document.querySelector(".preview-expand")
const expandPreview = document.getElementById("expand-caret");
const retractPreview = document.getElementById("retract-caret");
const previewContent = document.querySelector(".preview-content")

const title = document.querySelector(".title");
const body = document.querySelector(".body");
const tags = document.querySelector(".tags");
const previewTitle = document.getElementById("title-preview");
const previewBody = document.getElementById("body-preview");
const previewTags = document.getElementById("tags-preview");

const uploadInput = document.getElementById("img-upload");

previewBox.addEventListener("click", () => {
  if (expandPreview.style.display === "block") {
    expandPreview.style.display = "none";
    retractPreview.style.display = "block";
    previewContent.hidden = false;
  } else {
    expandPreview.style.display = "block";
    retractPreview.style.display = "none";
    previewContent.hidden = true;
  }
});

title.addEventListener("input", () => {
  previewTitle.textContent = title.value;
});

body.addEventListener("input", () => {
  previewBody.textContent = body.value;
});

tags.addEventListener("input", () => {
  previewTags.textContent = tags.value;
});

uploadInput.addEventListener("change", () => {
  uploadMedia(uploadInput.files);
})

async function uploadMedia(media) {
  if (media[0].type.includes("image")) {
    const formData = new FormData();
    formData.append("media", media[0]);

    fetch("/media", {
      method: "POST",
      body: formData
    }).catch(err => console.log(err));
  } else {
    alert("Oops! The file you uploaded was not an image. Upload an image instead.");
  }
}