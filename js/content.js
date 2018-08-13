class Character {
  constructor(attr){
    this.hp = attr.hp;
    this.name = attr.name;
  }
}

class Hero extends Character {
  constructor(hAttr){
    super(hAttr);
    this.inventory = hAttr.inventory;
    this.weapons = hAttr.weapons;
    this.equiped = hAttr.equiped;
  };
  equip(weapon){
    this.equiped = weapon;
    // console.log(`You have now equiped ${this.equiped} as your current weapon`);
  };
  attack(enemy){
    switch(this.equiped){
      case "long sword":
        if (enemy.name === "Wall Climber"){
          document.getElementById("your-attack").innerHTML = `<br><p>It appears the Wall Climber is too fast for your melee attacks. It clings to the top of a wall.</p><br>`;
        } else {
          let swordHit = Math.floor((Math.random() * 6) + 10);
          enemy.hp -= swordHit;
          document.getElementById("your-attack").innerHTML = `<br><p>You attacked with ${mainHero.equiped} for ${swordHit} points of damage</p><br>`;
        }
        if (enemy.name === "Rob" && enemy.hp < 20){
          alert("Rob's eyes begin to glow bright blue");
        }
      break;
      case "bow and arrows":
        if(this.inventory[1]['arrows'] <= 0){
          document.getElementById("your-attack").innerHTML = `<br><p>It appears you ran out of arrows</p><br>`;
          break;
        }
        if(enemy.name === "Rob"){
          this.inventory[1]['arrows'] -= 1;
          document.getElementById("your-attack").innerHTML = `<br><p>It appears Rob's rock hard skin is too thick for your arrows.</p><br>`;
        } else {
          let arrowHit = Math.floor((Math.random() * 3) + 8);
          enemy.hp -= arrowHit;
          this.inventory[1]['arrows'] -= 1;
          document.getElementById("your-attack").innerHTML = `<br><p>You attacked ${enemy.name} with ${mainHero.equiped} for ${arrowHit} points of damage</p><br>`;
        }
      break;
      case "shield":
        if (enemy.name === "Wall Climber"){
          document.getElementById("your-attack").innerHTML = `<br><p>It appears the Wall Climber is too fast for your melee attacks. It clings to the top of a wall.</p><br>`;
        } else {
          let shieldHit = Math.floor((Math.random() * 3) + 1);
          enemy.hp -= shieldHit;
          document.getElementById("your-attack").innerHTML = `<br><p>You attacked with ${mainHero.equiped} for ${shieldHit} points of damage</p><br>`;
        }
        if (enemy.name === "Rob" && enemy.hp < 20){
          alert("Rob's eyes begin to glow bright blue");
        }
      break;
    }
  };
  usePotion(){
    if (this.inventory[0]['healing potion'] === 0){
      document.getElementById("healing").innerHTML = `<br><p>You are out of healing potions</p><br>`;
    } else if (this.inventory[0]['healing potion'] > 0){
      this.hp += 30;
      if (this.hp > 50){
        this.hp = 50;
      }
      document.getElementById("healing").innerHTML = `<br><p>You drink yourself a potion of healing</p><br>`;
      this.inventory[0]['healing potion'] -= 1;
    }
  }
  ending(){
    if (this.equiped === "shield"){
      document.getElementsByClassName(`everything`)[0].innerHTML = `
      <div class="game-over-content">
        <img src="img/win-game.jpg" class="victory">
        <a href="index.html"><div class="button restart">RESTART</div></a>
        <div id="game-over"><p>You raise your shield to strike. In that moment Rob see's your families crest designed on the side of the shield. A look of sudden remembrance comes across his face. The blue glow in his eyes subside and mysteriously, as if some other worldly magic is at play, he changes back to his true form. While you hold him there he mutters the words to you "I know where they took your mother. We have to save her before its too late." - Thanks for playing and stay tuned for more dungeon adventures.</p></div>
      </div>`;
    } else {
      document.getElementsByClassName(`everything`)[0].innerHTML = `
      <div class="game-over-content">
        <img src="img/blue-laser.jpg" class="death">
        <a href="index.html"><div class="button restart">RESTART</div></a>
        <div id="game-over"><p>Rob's eyes look right at you. The last thing you see is bright blue light enveloping your entire world before you are reduced to ashes. You died a quick and painless death. Better luck next time.</p></div>
      </div>`;
    }
  }
}

class Monster extends Character{
  constructor(mAttr){
    super(mAttr);
    this.spells = mAttr.spells;
  }
  damage(hero){
    switch (this.spells){
      case "Slam":
        let slamAttack = Math.floor((Math.random() * 4) + 6);
        hero.hp -= slamAttack;
        document.getElementById('monster-attack').innerHTML = `<p>${rob.name} hit you with ${rob.spells} for ${slamAttack} points of damage</p><br>`;
      break;
      case "Acid Spit":
        let splitAttack = Math.floor((Math.random() * 4) + 6);
        hero.hp -= splitAttack;
        document.getElementById('monster-attack').innerHTML = `<p>${wallClimber.name} hit you with ${wallClimber.spells} for ${splitAttack} points of damage</p><br>`;
      break;
    }
  }
}

const mainHero = new Hero ({
  'name': 'William the Brave',
  'hp': 50,
  'inventory': [{'healing potion': 5}, {'arrows': 20}],
  'weapons': ['long sword', 'shield', 'bow and arrows', ],
  'equiped': 'long sword',
});

const wallClimber = new Monster ({
  'name': 'Wall Climber',
  'hp': 40,
  'spells': 'Acid Spit',
})

const rob = new Monster ({
  'name': 'Rob',
  'hp': 70,
  'spells': `Slam`,
})

function getInventory(){
  let displayInv = "<ol>";
  for(let i = 0; i < mainHero.inventory.length; i++){
    displayInv += `<li>${Object.keys(mainHero.inventory[i]).join("")} count ${Object.values(mainHero.inventory[i]).join("")}</li>`
  }
  displayInv +="</ol>";
  document.getElementsByClassName('inventory')[0].innerHTML =`Inventory: ${displayInv}`;
}


function getWeapons(){
  let displayWep = "<ol>";
  for(let i = 0; i < mainHero.weapons.length; i++){
    displayWep += `<br><li>${mainHero.weapons[i]}<li>`;
  }
  displayWep +="</ol>";
  document.getElementsByClassName('weapons')[0].innerHTML = `Weapons: ${displayWep}`;
}

function equipNew(){
  currentwep = document.getElementById("equipHero").value ;
  if (currentwep === "long sword" || currentwep === "bow and arrows" || currentwep === "magic mirror" || currentwep === "shield"){
    document.getElementsByClassName('equiped')[0].innerHTML = `Equiped: ${currentwep}`;
    mainHero.equiped = currentwep;
  } else {
    document.getElementsByClassName('equiped')[0].innerHTML = `${currentwep} is not on your list of weapons`;
  }
}

function equipedLoad(){
  document.getElementsByClassName('equiped')[0].innerHTML = `Equiped: ${mainHero.equiped}`;
}

function showHp(){
  document.getElementsByClassName('status')[0].innerHTML = `HP: ${mainHero.hp}`;
}

function upDate(){
  showHp();
  getWeapons();
  getInventory();
  equipedLoad();
}

window.onload = upDate;

function openChest(){
  alert("Hero has recieved a magic mirror.")
  mainHero.weapons.push('magic mirror');
  document.getElementById("theChest").style.display = 'none';
  getWeapons();
}

function mirrorTest(){
  if (mainHero.equiped === 'magic mirror'){
    document.getElementById("the-mirror").style.display = 'none';
    document.getElementById("switch").style.display = "block";
    document.getElementById("whats-current").innerHTML = `
    A strange beam of bright green light decends upon you. Before you know what is happening the mirror you have in hand absorbs all the light and breaks.
    `;
    mainHero.weapons.splice(-1,1);
  } else {
    document.getElementsByClassName(`everything`)[0].innerHTML = `
    <div class="game-over-content">
      <img src="img/laser.jpg" class="death">
      <a href="index.html"><div class="button restart">RESTART</div></a>
      <div id="game-over"><p>As you open the door a giant beam of green light brakes across the room and melts you to dust. Better luck next time.</p></div>
    </div>`;
  }
}

// ---------------------------------------fights

function clearIt(){
  document.getElementById("your-attack").innerHTML = "";
  document.getElementById("healing").innerHTML = "";
  document.getElementById("monster-attack").innerHTML = "";
}

//for wallClimber ------------------------------------------
function fight1(){
  clearIt()
  mainHero.attack(wallClimber);
  wallClimber.damage(mainHero);
  upDate();
  if (mainHero.hp <= 0) {
    document.getElementsByClassName(`everything`)[0].innerHTML = `
    <div class="game-over-content">
      <img src="img/died.jpg" class="death">
      <a href="index.html"><div class="button restart">RESTART</div></a>
      <div id="game-over"><p>You are overcome from your wounds and have died during battle. You fought bravely.</p></div>
    </div>`;
  }
  if (wallClimber.hp <= 0){
    document.getElementsByClassName(`everything`)[0].innerHTML = `
    <section class="main-content">
      <div class="character-info">
        <div class="status"></div><br>
        <div class="weapons"></div><br>
        <div class="inventory"></div><br>
        <div class="equiped"></div><br>
        <div class="button" onclick="equipNew();">Change Weapon</div>
        <form>
          <input type="text" id="equipHero"></input>
        </form><br>
      </div>
      <img src="img/golem.jpg" class="current-image">
    </section>
    <section class="main-info">
      <div class="info-section">
        <p>The monster lies dead at your feet. Suddenly a large statue comes to life and charges. To your horror you realize that it's face is none other than your old party member Rob! Brace for battle!</p>
        <div id="your-attack"></div>
        <div id="healing"></div>
        <div id="monster-attack"></div>
      </div>
      <div class="info-section">
        <div class="button" onclick="fight2()">Attack</div>
        <div class="button" onclick="usePotion2()">Use Potion</div>
      </div>
    </section>
    </div>
    </html>`;
    upDate();
  }
}
function usePotion1(){
  clearIt()
  mainHero.usePotion()
  wallClimber.damage(mainHero);
  upDate();
}
//for rob ------------------------------------------

function fight2(){
  if(rob.hp < 20) {
    mainHero.ending();
    } else {
    clearIt()
    mainHero.attack(rob);
    rob.damage(mainHero);
    upDate();
    if (mainHero.hp <= 0) {
    document.getElementsByClassName(`everything`)[0].innerHTML = `
    <div class="game-over-content">
      <img src="img/died.jpg" class="death">
      <a href="index.html"><div class="button restart">RESTART</div></a>
      <div id="game-over"><p>You are overcome from your wounds and have died during battle. You fought bravely.</p></div>
    </div>`;
    }
  }
}

function usePotion2(){
  clearIt()
  mainHero.usePotion()
  rob.damage(mainHero);
  upDate();
}
//

function goBack(){
  window.location.href = "enterance.html";
}

