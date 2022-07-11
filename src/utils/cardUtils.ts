export function createCardName(name:string) {
const nameArray = name.toUpperCase().split(" ");
const cardName = [];

for(let i=0; i <= nameArray.length; i++) {
    if (i === nameArray.length -1 || i === 0) {
        cardName.push(nameArray[i])
    } 
    
//FIX-ME INSERIR OS NOMES DO MEIO
}

return cardName.join(" ")
}