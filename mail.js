

const firebaseConfig = {

    apiKey: "AIzaSyClMG5syq-JH_kpFwsQdlvfWUaQmCFICBg",
    authDomain: "roboconldce.firebaseapp.com",
    databaseURL: "https://roboconldce-default-rtdb.firebaseio.com",
    projectId: "roboconldce",
    storageBucket: "roboconldce.appspot.com",
    messagingSenderId: "807558400123",
    appId: "1:807558400123:web:23854cf62b3ec368603ade",
    measurementId: "G-R89DYSR2B1"

};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("SponsershipData");

document.getElementById("SponsershipData").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var Website= getElementVal("Website");
  var Name = getElementVal("Name");
  var email = getElementVal("email");
  var msgContent = getElementVal("msgContent");

  saveMessages(Name, email, msgContent, Website);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("SponsershipData").reset();
}

const saveMessages = (Name, email, msgContent, Website) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    Name: Name,
    email: email,
    msgContent: msgContent,
    Website: Website,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
