var myfunction = function() {
  var par=document.createElement("p");
  var t=document.createTextNode("CLICK ME");
  par.appendChild(t);
  document.body.appendChild(par);
  console.log("wow");
}
document.onload = myfunction(); 
