// Global File is for constant variables, unlikely to change

global.DEV_MODE = true // set to true if using local

global.TEST =  true
global.region = { name:"NSW Australia", coords:"-32.3010715,146.746138" }
global.serverURL =  global.DEV_MODE ? 'http://127.0.0.1:8000' : "https://racepace-sbhs.herokuapp.com"
global.location_permission = false

