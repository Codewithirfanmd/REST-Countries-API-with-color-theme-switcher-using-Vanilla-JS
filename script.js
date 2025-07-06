const cardsContainer = document.querySelector(".card-container")
const filterRegion = document.querySelector(".filter-container")
const searchInput = document.querySelector(".searh-container input")
const themeChanger = document.querySelector(".theme-changer")


// let Darktheme = localStorage.getItem("Darktheme")


cardsContainer.addEventListener("click", (e)=> {
    if(e.target!=cardsContainer){
        searchInput.value = ""
        filterRegion.value = "Filter by Region"
    }
    // console.log(e.target!=cardsContainer)
})



if(localStorage.Darktheme) {
    document.body.classList.add("dark");
    themeChanger.innerHTML = "<i class='fa-solid fa-sun'></i>&nbsp;&nbsp;Light Mode"
}else {
    document.body.classList.remove("dark");
    themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'

}



let allCountriesData

fetch("https://restcountries.com/v3.1/all").then((res) => res.json())
.then((data)=>{
    // console.log(data[0])
    renderCountries(data)
    allCountriesData = data
})


filterRegion.addEventListener("change", ()=> {
    // console.log(filterRegion.value)
    fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`).then((res)=> res.json())
    .then((data) => {
        renderCountries(data)
    })
})

searchInput.addEventListener("input", (e)=> {
    // console.log(e.target.value)
    const filteredCountries = allCountriesData.filter((country)=> {
        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    // console.log(filteredCountries) 

    renderCountries(filteredCountries)
})




themeChanger.addEventListener("click", ()=> {
    if(!localStorage.getItem("Darktheme")){
        localStorage.setItem("Darktheme", "set")
        themeChanger.innerHTML = "<i class='fa-solid fa-sun'></i>&nbsp;&nbsp;Light Mode"

    }else {
        localStorage.clear()
        themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'

    }
    document.body.classList.toggle("dark");
})







function renderCountries(data) {
    cardsContainer.innerHTML = ""
    data.forEach((country)=> {


        
        const countryCard = document.createElement("a")

        countryCard.classList.add("country-card")

        countryCard.href = `coumtry.html?name=${country.name.common}`

        countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="">
                        <div class="card-content">
                            <h3>${country.name.common}</h3>
                            <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
                            <p><b>Region:</b> ${country.region}</p>
                            
                            <p><b>Capital:</b> ${country.capital? country.capital[0]: "No Capitals"}</p>

                        </div>
        `

        cardsContainer.append(countryCard)

    })
}

