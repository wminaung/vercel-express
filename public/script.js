const hasUrl = localStorage.getItem("win");
if (hasUrl) {
} else {
  window.location.href = "/route";
}

const showUserData = async () => {
  const res = await fetch(hasUrl + "/users");
  const data = await res.json();
  console.log(data);
};
showUserData();

const btn = document.getElementById("btn");
const fileUpload = document.getElementById("fileUpload");

btn.addEventListener("click", async () => {
  const files = [...fileUpload.files];

  const formData = new FormData();

  files.forEach((file) => {
    console.log(file);
    formData.append("files", file);
  });

  const res = await fetch(hasUrl + "/fileupload", {
    method: "POST",

    body: formData,
  });

  const data = await res.json();
  console.log(data);
});
