var firebaseConfig = {
      apiKey: "AIzaSyDO-Lsavn0AmfeSCEtvP-tBTA4n1U1YJww",
      authDomain: "prabhnoorstagram.firebaseapp.com",
      databaseURL: "https://prabhnoorstagram.firebaseio.com",
      projectId: "prabhnoorstagram",
      storageBucket: "prabhnoorstagram.appspot.com",
      messagingSenderId: "512481391020",
      appId: "1:512481391020:web:8c7522fd6b60c3abed8a09",
      measurementId: "G-D7Z0KGS5HM"
};
firebase.initializeApp(firebaseConfig);
var user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
      if (document.getElementById("room_name").value == "") {
            document.getElementById("aud").play();
      } else {
            room_name = document.getElementById("room_name").value;
            firebase.database().ref("/").child(room_name).update({});
            localStorage.setItem("room_name", room_name);
            window.location = "Prabhnoorstagram_page.html";
      }
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_name = childKey;
                  console.log("Room name= " + Room_name);
                  row = "<div class='room_name' id=" + Room_name + " onclick='redirectToRoomName(this.id)' >#" + Room_name + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "Prabhnoorstagram_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}