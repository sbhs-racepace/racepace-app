global.TEST = true

global.login_status = {
  success: false, 
  token: false, 
  user_id: false
};

global.current_route = null;

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

global.region = {name:"NSW Australia",
coords:"-32.3010715,146.746138"}

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

import {
  StyleSheet,
} from 'react-native';


global.colors = {
  darkBackground:'rgb(25,25,55)',
  lightBackground:"rgb(55,55,80)",
  primaryColor:"rgb(0, 153, 255)",
  offColor:"rgb(120,120,140)",
  inputColor:"rgb(55,55,80)",
  textColor: "rgb(200,200,255)",
  secondaryTextColor: "rgb(150,150,200)"
}

global.view_styles = StyleSheet.create({
  columnCenterView:{ alignItems:"center", flexDirection:"column",flex:1},
  rowView: {flexDirection: "row", justifyContent: 'space-between', width:"100%"},
})

global.component_styles = StyleSheet.create({
  roundedButton: {
      width: '80%',
      borderRadius: 10,
  }
})