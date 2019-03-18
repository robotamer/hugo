function resizeText(multiplier) {
  var e = document.getElementById('container');
  if (e.style.fontSize == "") e.style.fontSize = "1.0em";
  e.style.fontSize = parseFloat(e.style.fontSize) + (multiplier * 0.2) + "em";
}
