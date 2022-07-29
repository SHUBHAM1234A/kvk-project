$(() => {
  $("#uid").on("keypress", (e) => {
    if (e.which == 13) $("#check").click();
    if (e.which == 32) return false;
    else if (e.which >= 65 && e.which != 144) return false;
  });
});

function check() {
  if (document.getElementById("uid").value == "") {
    alert("Please enter student UID");
    return false;
  } else if (document.getElementById("uid").value.startsWith(" ")) {
    alert("UID cannot start with a space");
    return false;
  } else if (document.getElementById("uid").value.endsWith(" ")) {
    alert("UID cannot end with a space");
    return false;
  } else if (document.getElementById("uid").value.length < 15) {
    alert("UID must be 15 characters long");
    return false;
  } else {
    var config = {
      apiKey: "AIzaSyBS0Veyt1hs8a7Co3s0d5y_xtelgzvFjtA",
      authDomain: "attendance-71d29.firebaseapp.com",
      projectId: "attendance-71d29",
      storageBucket: "attendance-71d29.appspot.com",
      messagingSenderId: "1032277755892",
      appId: "1:1032277755892:web:b7f2b9087d70379155dba1",
    };
    firebase.initializeApp(config);
    const db = firebase.database();

    const stuff = document.getElementById("stuff");
    const uid = document.getElementById("uid").value;

    stuff.innerHTML = `
    <div id="stuff">
      <p>Please wait...</p>
    </div>
    `;

    db.ref("/").on("value", (snapshot) => {
      const data = snapshot.val();
      if (data[uid] == null) {
        
        stuff.innerHTML = `
        <div id="stuff">
          <p>Invalid UID</p>
        </div>`;

        setTimeout(() => {
          location.reload();
        }, 5000);
      }
      console.log(data);
      stuff.innerHTML = `
      <div id="stuff">
        <p style="font-size: 20px;">Name: <b>${data[uid].name}</b></p>
        <p style="font-size: 20px;">Class: <b>${data[uid].class} ${data[uid].section}</b></p>
        <p style="font-size: 20px;">Roll Number: <b>${data[uid].roll}</b></p>
        <p style="font-size: 20px;">UID: <b>${uid}</b></p>
        <p style="font-size: 20px;">Last Scan of ID card: <b>${data[uid].lastScanned}</b></p>
        <button onclick="reload_()">Check More</button>
      </div>
      `;
    });
  }
}

function reload_() {
  location.reload();
}

/*
from datetime import date, datetime
time_ = datetime.now().strftime("%I:%M:%S %p")
date_ = date.today().strftime("%d-%m-%Y")
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
date_ = f"{date_.split('-')[0]} {months[int(date_.split('-')[1]) - 1]} {date_.split('-')[2]}"
print(f"{time_}, {date_}")
*/
