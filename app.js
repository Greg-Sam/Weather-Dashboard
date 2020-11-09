
  let cities = JSON.parse(localStorage.getItem('cities'))
  console.log(cities)
    if (cities[0] === 'Empty') {
      cities.shift()
    }
    function displayCities() {
      for (let i = 0; i < cities.length; i++) {
        let cityList = document.createElement('li')
        cityList.className = 'list-group-item d-flex justify-content-between align-items-center'
        cityList.innerHTML = cities[i]
        document.getElementById('cities').append(cityList)
      }
    }
    displayCities()
    document.getElementById('searchCity').addEventListener('click', event => {
      event.preventDefault()
      let city = document.getElementById('search').value
      console.log(city)
      cities.push(city)
      console.log(cities)
      localStorage.setItem('cities', JSON.stringify(cities))


      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=6b67c8662f88a1cf40656bea20032f5e`)
        .then(res => {
          let cityWeather = res.data
          let temp = cityWeather.main.temp
          let humidity = cityWeather.main.humidity
          let wind = cityWeather.wind.speed
          let lat = cityWeather.coord.lat
          let lon = cityWeather.coord.lon
          let officialCity = cityWeather.name
          console.log(res)
          axios.get(`http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=6b67c8662f88a1cf40656bea20032f5e`)
            .then(res2 => {
              let uv = res2.data.value
              console.log(uv)

            })
            .catch(err => console.error(err))



        })
        .catch(err => console.error(err))
    })



  