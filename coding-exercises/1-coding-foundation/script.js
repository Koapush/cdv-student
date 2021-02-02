function create(){
  let displayDiv = document.getElementById("display");
  //get the input number
  let num = document.getElementById("inputbox").value;

  displayDiv.innerHTML="";

  //draw suqares
  for (let i = 0; i < num; i++){
    displayDiv.appendChild(document.createElement("div"));
  }
}
