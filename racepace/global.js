global.TEST = true

global.login_status = {
  success: false, 
  token: false, 
  user_id: false
};

global.socket = null;

global.user = {
  full_name:"guest",
  username:"guest",
  stats: {
    num_runs: 0,
    total_distance: 0,
    longest_distance_ran: null,
    fastest_km : null,
    fastest_5km: null,
    fastest_10km : null,
    fastest_marathon: null,
    estimated_v02_max: null,
    average_heart_rate: null,
    cadence: null,
    points: 0,
  },
  following: [],
  followers: [],
}

global.serverURL = "http://racepace-sbhs.herokuapp.com"

global.googleLoginID = {
  android: "Insert key here", 
  ios: "Insert key here"
};


global.user_routes = [
  {
    start: "Circular Quay",
    end: "Hyde Park",
    dist: 1.0,
    nodes: [(34,121),(34,122)]
  },
  {
    start: "Circular Quay",
    end: "Hyde Park",
    dist: 1.0,
    nodes: [(34,121),(34,122)]
  },
  {
    start: "Circular Quay",
    end: "Hyde Park",
    dist: 1.0,
    nodes: [(34,121),(34,122)]
  }
]
global.region = {name:"NSW Australia",
coords:"-32.3010715,146.746138"}