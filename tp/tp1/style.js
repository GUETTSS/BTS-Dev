if (localStorage.getItem("skipLoader") === "true") {
  document.getElementById("loader").style.display = "none";
  localStorage.removeItem("skipLoader");
}
