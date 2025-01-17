// TODO DOM-manipulation skriv ut quote med namn, kopplat till asoiafAPI

// Länka namnet till andra API:n (via sökfunktionen?)

import Quote from "../types/quoteAPI";

const rooturl = "https://api.gameofthronesquotes.xyz/v1/random";

export const getRandomQuote = async (): Promise<Quote> => {
    const response = await fetch(rooturl);
    const data = await response.json() as Quote;
    
    return data as Quote;
}

export let randomQuoteName = "";

export const randomQuote = async (): Promise<HTMLDivElement> => {
    const q = document.createElement("div");
    q.classList.add("quote");
    const quote = await getRandomQuote();
    q.innerHTML = `<p>${quote.sentence}</p> <p>-</p> <p>${quote.character.name}</p>`;
    randomQuoteName = await quote.character.name;
    return q;
}

// TODO Gör onclick för namnet