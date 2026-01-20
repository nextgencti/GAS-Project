const API_URL = "https://script.google.com/macros/s/AKfycbzjvB8qXhwQCub3aCOBJSxOBJyxsrtHvcHIiX44Wg_rZ-KXeuBRsH1y2i932ddNBhcL/exec" // My Account
// const API_URL = "https://script.google.com/macros/s/AKfycbzM0z2vExs3PQ8tcmccdjYmdQOHWXbGhmEhUk5xfctxcCgsqQrlS48NKhBXPPL48A5_/exec" // NGC


var Londing =document.querySelector('#Loding')
Londing.style.display = "none"

const msg = document.getElementById("msg");
const photoInput = document.getElementById("photo");
const preview = document.getElementById("preview");
const signupBtn = document.getElementById("signupBtn");


// ================= PHOTO PREVIEW =================
photoInput.addEventListener("change", function () {

  const file = this.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  
  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  
  
  if (file.size > 1024 * 1024) {
    msg.textContent = "Max 1MB photo allowed";
    msg.classList.add("error");
    return;
  }
  reader.readAsDataURL(file);
});



  

// ================= SIGNUP CLICK =================
signupBtn.addEventListener("click", signup);

  function signup() {
    const userid = document.getElementById("userid").value.trim();
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const city = document.getElementById("city").value.trim();
    const password = document.getElementById("password").value.trim();
    const file = photoInput.files[0];
    const email = document.getElementById("email").value.trim();
    const otp = document.getElementById("OTP").value.trim();


    msg.textContent = "";
    msg.className = "";

    if (!userid || !name || !email || !mobile || !city || !password) {
      msg.textContent = "All fields are required";
      msg.classList.add("error");
      return;
    }

    if (!file) {
      msg.textContent = "Please upload photo";
      msg.classList.add("error");
      return;
    }

    const reader = new FileReader();

    // console.log(userid, name, email, mobile, city, password, base64Image, file.type);
    

    reader.onload = function () {
      const base64Image = reader.result.split(",")[1];

      // 👇 file.type yahin se pass karo
      sendData("signup",userid, name, email,otp, mobile, city, password, base64Image, file.type);
      Londing.style.display = "block"

    };

    reader.readAsDataURL(file);
  }


// ================= SEND TO BACKEND =================
async function sendData( action_type,userid, name, email,otp, mobile, city, password, base64Image, photoType) {
  console.log(otp)
  const payload = {
      action: action_type,
      origin: "yourusername.github.io", // window.location.origin
      userid: userid,
      name: name,
      email: email,
      otp:otp,
      mobile: mobile,
      city: city,
      password: password,
      photo: base64Image,
      photoType: photoType   // ✅ now defined
    }

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {

      if (data.status === "success") {
        Londing.style.display = "none"  
        msg.textContent = "Signup successful!";
        msg.classList.add("success");

        document.getElementById("userid").value = "";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("city").value = "";
        document.getElementById("password").value = "";
        preview.style.display = "none";
        photoInput.value = "";

        setTimeout(function(){
          location.href = "login.html"
        },2000)

      } else if (data.status === "exists") {
        msg.textContent = "User ID already exists";
        msg.classList.add("error");
      } else {
        msg.textContent = "Server error!";
        msg.classList.add("error");
        console.log(data.message);
        Londing.style.display = "none"  
      }

    })
    .catch(err => {
      msg.textContent = "Network / Server problem";
      msg.classList.add("error");
      console.error(err);
    });
}


// ================= GO TO LOGIN =================
function goToLogin(){
  window.location.href = "login.html";
}


// OTP bhejne ka function
function requestOTP() {
  var emailAddr = document.getElementById("email").value;

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "sendOTP",
      email: emailAddr, // <--- Ye 'email' key backend ke 'params.email' se match hoti hai
    })
  })
  .then(res => res.json())
  .then(data => alert(data.message));
}

