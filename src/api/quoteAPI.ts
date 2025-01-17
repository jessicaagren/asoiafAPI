// TODO DOM-manipulation skriv ut quote med namn, kopplat till asoiafAPI

import Quote from "../types/quoteAPI";

const rooturl = "https://api.gameofthronesquotes.xyz/v1/random";

export const getRandomQuote = async (): Promise<Quote> => {
    const response = await fetch(rooturl);
    const data = await response.json() as Quote;
    
    return data as Quote;
}

export const randomQuote = async () => {
    const q = document.createElement("div");
    q.classList.add("quote");
    const quote = await getRandomQuote();
    q.innerHTML = `<p>${quote.sentence}</p> <p>-</p> <p>${quote.character.name}</p>`;
    return q;
}
