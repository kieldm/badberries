function setText(){
  var enteredText = document.getElementById("text0").value;
  
  inputText = enteredText.match(/[^\r\n]+/g);

  if(enteredText == ""){
    print("SHORT EXECUTED! and inputText is " + inputText);
    inputText = [];
    inputText[0] = " ";
  }
}
