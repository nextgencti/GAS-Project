// 🔥 SAME API URL that you used for signup
const API_URL = "https://script.google.com/macros/s/AKfycbzjvB8qXhwQCub3aCOBJSxOBJyxsrtHvcHIiX44Wg_rZ-KXeuBRsH1y2i932ddNBhcL/exec"; // Apps Script Web App URL
// const API_URL = "https://script.google.com/macros/s/AKfycbzM0z2vExs3PQ8tcmccdjYmdQOHWXbGhmEhUk5xfctxcCgsqQrlS48NKhBXPPL48A5_/exec" // NGC

const msg = document.getElementById("msg");
document.getElementById("loginBtn").addEventListener("click", login);
  
var Londing =document.querySelector('#Loding')
Londing.style.display = "none";


function login(){

  const userid = document.getElementById("userid").value.trim();
  const password = document.getElementById("password").value.trim();

  msg.textContent = "";
  msg.className = "";

  if(!userid || !password){
    msg.textContent = "Enter User ID and Password";
    msg.classList.add("error");
    return;
  }

  Londing.style.display = "block";

  fetch(API_URL,{
    method:"POST",
    body: JSON.stringify({
      action: "login",      // 🔥 IMPORTANT
      userid: userid,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {

    if(data.status === "success"){

      // ✅ Save session
      localStorage.setItem("user", JSON.stringify(data));

      msg.textContent = "Login Successful";
      msg.classList.add("success");
      
      Londing.style.display = "none";

      // 👉 redirect to dashboard
      setTimeout(()=>{
        location.href = "dashboard.html";
      },1000);

    }else{
      msg.textContent = "Invalid User ID or Password";
      msg.classList.add("error");
    }

  })
  .catch(err => {
    msg.textContent = "Server error";
    msg.classList.add("error");
    console.error(err);
  });

}


