function getRiddle(){
	riddleMe = document.getElementById("riddle").value;
	if (riddleMe === "fire" || riddleMe === "Fire"){
		document.getElementById("form1").innerHTML = "";
		document.getElementById("riddleButton").style.display = "none";
		response = `<p>Upon saying ${riddleMe} a crack opens in the wall. It apears you have chosen the corrent words. It looks dark. Only way to find out whats inside is to enter at your own peril.</p>`;
		document.getElementById("whats-happening").innerHTML = response;
		document.getElementById("riddleSuccess").innerHTML = `<a href="secret.html"><div class="button">ENTER</div></a>`;
	} else {
		response = `<p>You say the words ${riddleMe} but nothing happened. What shall you do?</p>`;
		document.getElementById("whats-happening").innerHTML = response;
	}
}

function deathReason(){
	document.getElementById(`everything`).innerHTML = `
  <div class="game-over-content">
    <img src="img/horde.jpg" class="death">
    <a href="index.html"><div class="button restart">RESTART</div></a>
    <div id="game-over"><p>You where overwhelmed by a massive hoard of goblins. 
			You died a gruesome death. Perhaps the main entrance was not the best idea. 
			However, it was a noble effort.</p>
		</div>
  </div>`;
}
