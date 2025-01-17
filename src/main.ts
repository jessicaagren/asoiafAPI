import { displayCharacterDetails, getAsoiafCharacterNameByID, getCharacterByExactName, searchCharactersParallel } from './api/asoiafAPI';
import { getRandomQuote, randomQuote } from './api/quoteAPI';
import './styles/main.scss';

const app = document.getElementById("app") as HTMLElement;

console.log(await getCharacterByExactName(`Jon Snow`));

// for (let i = 1; i < 6; i++) {
  const randomID = (Math.floor(Math.random() * 2134) + 1);
  const li = document.createElement("li");
  li.innerHTML=`Character #${randomID} is ${await getAsoiafCharacterNameByID(randomID)}.`;
  app.appendChild(li);
// }

// console.log("Hittade karaktärer:", await searchCharactersParallel("Stark"));

displayCharacterDetails(`${await getAsoiafCharacterNameByID(randomID)}`);

app.appendChild(await randomQuote());

console.log(await getRandomQuote());
