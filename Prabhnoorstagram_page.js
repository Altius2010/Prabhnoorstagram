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
var room_name = localStorage.getItem("room_name");

function send() {
      if (document.getElementById("message").value == "") {
            document.getElementById("aud").play();
      } else {
            message = document.getElementById("message").value;
            firebase.database().ref(room_name).push({
                  Name: user_name,
                  Message: message,
                  Like: 0
            });
            document.getElementById("message").value = "";
      }
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "Purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log("message id= " + firebase_message_id);
                        console.log("message data= " + message_data);
                        name = message_data['Name'];
                        message = message_data['Message'];
                        like = message_data['Like'];
                        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='addLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();

function addLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      added_likes = Number(likes) + 1;
      console.log(added_likes);
      firebase.database().ref(room_name).child(message_id).update({
            Like: added_likes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}