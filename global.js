// Global File is for constant variables, unlikely to change

global.DEV_MODE = false; // set to true if using local
global.region = { name:"NSW Australia", coords:"-32.3010715,146.746138" }
global.serverURL =  global.DEV_MODE ? 'http://127.0.0.1:8000' : "https://racepace-sbhs.herokuapp.com"
global.location_permission = false
global.zoom_factor = {
  latitudeDelta:0.0922*0.1,
  longitudeDelta: 0.0421*0.1,
}

global.default_location = {
  latitude:-33.9672563, 
  longitude:151.1002119, 
} // Campsi

global.google_maps_api = null


