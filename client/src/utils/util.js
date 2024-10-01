export default function BaseTotal(pokemonBase){
    return pokemonBase.HP + pokemonBase.Attack + pokemonBase.Defense + pokemonBase.spAttack + pokemonBase.spDefense + pokemonBase.Speed;
  }//calculates the total score of the pokemon

export function formatPokemonName(pokemonName){
  const specialCases = {"shaymin":"shaymin-land", "giratina" : "giratina-altered", "oricorio" : "oricorio-baile", "lycanroc":"lycanroc-midday", "wishiwashi":"wishiwashi-solo"}
  const mapObj = {' ': '-', '♀': '-f', '♂': '-m', 'é': 'e'}
  const formatedName = pokemonName.toLowerCase().replace(/[ ♀♂é]/g, m => mapObj[m]).replace(/[^a-zA-Z-]/g, '');
  return formatedName in specialCases ? specialCases[formatedName] : formatedName;
}//formats the name of the pokemon to access it's image using pokemondb.net

export function getSortedTableData(dataArray, sortCol) {
  const keyPath = sortCol.key.split(".");
  const isNestedKey = keyPath.length === 2;
  const isTotalKey = sortCol.key === "Total";

  const compareValues = (a, b, key1, key2) => {
    const valueA = key2 ? a[key1][key2] : key1 ? a[key1] : a;
    const valueB = key2 ? b[key1][key2] : key1 ? b[key1] : b;
    return sortCol.direction === "asc" ? (valueA > valueB ? 1 : -1) : (valueA > valueB ? -1 : 1);
  };

  if (isNestedKey) {
    return dataArray.sort((a, b) => compareValues(a, b, keyPath[0], keyPath[1]));
  }//compare based on columns with multiple elements

  if (isTotalKey) {
    return dataArray.sort((a, b) => compareValues(BaseTotal(a["base"]), BaseTotal(b["base"])));
  }//coompare based on columns related to the pokemon's score

  return dataArray.sort((a, b) => compareValues(a, b, sortCol.key));
}//sorts the table based on the columns
