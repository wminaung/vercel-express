const hasUrl = localStorage.getItem("win");
if (hasUrl) {
} else {
  window.location.href = "/api/route";
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
    formData.append("uploadFiles", file);
  });

  const res = await fetch(hasUrl + "/fileupload", {
    method: "POST",

    body: formData,
  });

  const data = await res.json();
  console.log(data);
});
