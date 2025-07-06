const countryContainer = document.querySelector(".country-container")
const backBtn = document.querySelector(".go-back")
const themeChanger = document.querySelector(".theme-changer")


const countryName = new URLSearchParams(window.location.search).get("name")


if(localStorage.Darktheme) {
    document.body.classList.add("dark");
    themeChanger.innerHTML = "<i class='fa-solid fa-sun'></i>&nbsp;&nbsp;Light Mode"

}else {
    document.body.classList.remove("dark");
    themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'

}



backBtn.addEventListener("click", ()=> {
    history.back()
})






fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res) => res.json())
.then((data) => {
    // console.log( data[0])
        let allLanguages = undefined
        if(data[0].languages) {
            allLanguages = Object.values(data[0].languages)
        }
        const countryInfo = document.createElement("div")

        countryInfo.classList.add("country-details")

        countryInfo.innerHTML = `
                        <img src="${data[0].flags.svg}" alt="">
                        <div class="country-content">
                            <h1>${data[0].name.common}</h1>
                            <div class="flex-details">
                                <div class="part-1">
                                    <p><b>Native Name: </b>${data[0].name.nativeName?data[0].name.nativeName[Object.keys(data[0].name.nativeName)[0]].common:data[0].name.common }</p>
                                    <p><b>Population: </b>${data[0].population.toLocaleString('en-IN')}</p>
                                    <p><b>Region: </b>${data[0].region}</p>
                                    <p><b>Sub Region: </b>${data[0].subregion}</p>
                                    <p><b>Capital: </b>${data[0].capital? data[0].capital[0]: "No Capitals"}</p>
                                </div>

                                <div class="part-2">
                                    <p><b>Top Level Domain: </b>${data[0].tld[0]}</p>
                                    <p><b>Currencies: </b>${data[0].currencies?data[0].currencies[Object.keys(data[0].currencies)[0]].name:"No Currency"}</p>
                                    <p><b>Languages: </b>${allLanguages?allLanguages:"No Languages"}</p>
                                </div>
                            </div>

                            
                        </div>
        `

        const borderLabel = document.createElement("p")
        borderLabel.classList.add("border-countries")
        borderLabel.innerHTML = "<b>Border Countries: </b>"

        // borderLabel.append("newAnchor")
        // countryInfo.append(borderLabel)
        countryInfo.lastElementChild.append(borderLabel)

        console.log(countryInfo)
        
        if(data[0].borders) {
        data[0].borders.forEach((border)=> {
            // console.log(border)
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=> res.json()).then(([borderCountry])=> {
                // console.log(borderCountry)
                const borderCountryAnchor = document.createElement("a")
                borderCountryAnchor.href=`coumtry.html?name=${borderCountry.name.common}`
                borderCountryAnchor.innerText = borderCountry.name.common
                // console.log(borderCountryAnchor)
                borderLabel.append(borderCountryAnchor)
            })
        })
    }





        countryContainer.append(countryInfo)
})


{/* <a href="">France</a><a href="">Germany</a><a href="">Netherlands</a> */}


themeChanger.addEventListener("click", ()=> {
    document.body.classList.toggle("dark");
    if(!localStorage.getItem("Darktheme")){
        localStorage.setItem("Darktheme", "set")
        themeChanger.innerHTML = "<i class='fa-solid fa-sun'></i>&nbsp;&nbsp;Light Mode"

        }else {
            localStorage.clear()
    themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'

        }
})