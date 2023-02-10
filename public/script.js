const hasUrl = localStorage.getItem("win");
if (hasUrl) {
} else {
  window.location.href = "/userHome";
}

const showUserData = async () => {
  const res = await fetch(hasUrl + "/users");
  const data = await res.json();
  console.log(data);
};
showUserData();
