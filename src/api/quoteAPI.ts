// TODO DOM-manipulation skriv ut quote med namn, kopplat till asoiafAPI

import Quote from "../types/quoteAPI";

const rooturl = "https://api.gameofthronesquotes.xyz/v1/random";

export const getRandomQuote = async (): Promise<Quote> => {
    const response = await fetch(rooturl);
    const data = await response.json() as Quote;
    
    return data as Quote;
  }