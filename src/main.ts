import { displayCharacterDetails, getAsoiafCharacterNameByID, getCharacterByExactName, searchCharactersParallel } from './api/asoiafAPI';
import './styles/main.scss';

console.log(await getCharacterByExactName(`Jon Snow`));

const asoiafList = document.getElementById("app") as HTMLElement;

for (let i = 1; i < 6; i++) {
  const randomID = (Math.floor(Math.random() * 2134) + 1);
  const li = document.createElement("li");
  li.innerHTML=`Character #${randomID} is ${await getAsoiafCharacterNameByID(randomID)}.`;
  asoiafList.appendChild(li);
}

console.log("Hittade karaktärer:", await searchCharactersParallel("Stark"));

displayCharacterDetails("Grisella");
