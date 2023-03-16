const API_KEY = "somethinsomethin"

async function getCoordForAddress(address){
    return {
      lat: Math.random() * 100,
      lng: Math.random() * 100*-1,
    };
}

console.log(getCoordForAddress())