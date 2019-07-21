// Global File is for constant variables, unlikely to change

global.DEV_MODE = false; // set to true if using local
global.region = { name:"NSW Australia", coords:"-32.3010715,146.746138" }
global.serverURL =  global.DEV_MODE ? 'http://127.0.0.1:8000' : "https://racepace-sbhs.herokuapp.com"
global.location_permission = false
global.default_location = {
  latitude:-33.890201568,
  longitude:151.217895507,
} // SBHS
global.google_maps_api = null
global.google_android_login_id = null
global.google_ios_login_id = null
