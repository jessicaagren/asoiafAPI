import AsoiafCharacter from "../types/asoiafAPI";

const rooturl = "https://www.anapioficeandfire.com/api/";

// https://www.anapioficeandfire.com/api/characters?name=NAMN

export const getCharacterByExactName = async (name: string): Promise<AsoiafCharacter | null> => {
  try {
    const response = await fetch(`${rooturl}characters?name=${name}`);
    const data = await response.json();

    if (data.length === 0) {
      console.log("Ingen karaktär hittades.");
      return null;
    }

    return data[0] as AsoiafCharacter;

    } catch (error) {
        console.error("Fel vid hämtning av karaktärsdetaljer:", error);
        return null;
    }
  }

  export const getCharacterByID = async (id: number): Promise<AsoiafCharacter> => {
    const response = await fetch(`${rooturl}characters/${id}`);
    const data = await response.json() as AsoiafCharacter;
    
    return data as AsoiafCharacter;
  }
  
  export const getAsoiafCharacterNameByID = async (id: number): Promise<string> => {
    const character = (await getCharacterByID(id)).name;
    
    return character;
  }

  export const searchCharactersParallel = async (query: string): Promise<AsoiafCharacter[]> => {
    const pageSize = 50;
    const totalPages = 50;
  
    try {
      const requests = Array.from({ length: totalPages }, async (_, i) => {
        const page = i + 1;
        const response = await fetch(`${rooturl}/characters/?page=${page}&pageSize=${pageSize}`);
        const data = (await response.json()) as AsoiafCharacter[];
        return data;
      });
  
      const results = await Promise.all(requests);
  
      const characters = results.flat();
  
      const filteredCharacters = characters.filter((character) => {
        const fullName = character.name || "";
        return (
          fullName.toLowerCase().includes(query.toLowerCase()) ||
          fullName.toLowerCase().endsWith(query.toLowerCase())
        );
      });
  
      return filteredCharacters;
    } catch (error) {
        console.error("Fel vid sökning:", error);
  
      return [];
    }
  };

  export const displayCharacterDetails = async (name: string) => {
    const character = await getCharacterByExactName(name);
    
    if (character) {
      console.log("Namn:", character.name);
      console.log("Hus:", Array.isArray(character.allegiances) && character.allegiances.length > 0 ? character.allegiances.join(', ') : "Ingen");
      console.log("Böcker:", Array.isArray(character.books) && character.books.length > 0 ? character.books.join(', ') : "Ingen");
      console.log("Född:", character.born);
      console.log("Kultur:", character.culture);
      console.log("Död:", character.died || "Lever");
      console.log("Titlar:", Array.isArray(character.titles) && character.titles.length > 0 ? character.titles.join(', ') : "Ingen");
      console.log("Spelad av:", Array.isArray(character.playedBy) && character.playedBy.length > 0 ? character.playedBy.join(', ') : "Ingen");
      console.log("TV-serier:", Array.isArray(character.tvSeries) && character.tvSeries.length > 0 ? character.tvSeries.join(', ') : "Ingen");
    } else {
      console.log("Ingen karaktär hittades med det namnet.");
    }
  };