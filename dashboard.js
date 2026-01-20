const user = JSON.parse(localStorage.getItem("user"));

if(!user){
  location.href = "login.html"; // not logged in
}

console.log(user);

// document.getElementById("photo").src = user.photo;
document.getElementById("name").innerText = "Name: " + user.name;
document.getElementById("email").innerText = "Email: " + user.email;
document.getElementById("city").innerText = "City: " + user.city;

document.getElementById("photo").src =`https://drive.google.com/thumbnail?id=${user.photo_id}&sz=s800`;



function logout(){
  localStorage.removeItem("user");
  location.href = "login.html";
}


