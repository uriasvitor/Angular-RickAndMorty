export type characters = {
  name:string,
  gender:string,
  episode:string[],
  species:string,
  status:string,
  image:string,
  results:characters[]
}


export type CharacterResponse = {
  results: characters[];
}
