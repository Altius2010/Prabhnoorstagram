function addUser() {
    if (document.getElementById("user_name").value == "") {
        document.getElementById("aud").play();
    } else {
        localStorage.setItem("user_name", document.getElementById("user_name").value);
        window.location = "Prabhnoorstagram_room.html";
    }
}