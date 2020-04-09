export default async function getMovies() {
    const response = await fetch("https://cors-anywhere.herokuapp.com/https://everythingblackentertainment.herokuapp.com", {
       method: "GET",
       headers: {
           "token": process.env.REACT_APP_API_KEY
       } 
    })
    const json = await response.json()
    return json
}