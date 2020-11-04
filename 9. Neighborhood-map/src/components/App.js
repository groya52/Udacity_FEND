import React from 'react';
import {google_maps_key} from '../api/ApiKeys.js';
import * as FoursquareAPI from '../api/FoursquareAPI.js';
import mapStyles from '../data/mapStyles.json'
import '../components/App.css';
import SideBar from '../components/SideBar.js';
import Menu from '../components/Menu.js';

export default class App extends React.Component {
    state = {
        places: []
        , showPlaces: [] 
        , markers: []
        , map: ''
        , query: ''
        , showSidebar: true
    }

    componentDidMount() {
        this.checkInternet();

        window.gm_authFailure = this.gm_authFailure;
        window.onerror = this.onError ;
        window.initMap = this.initMap;

        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + google_maps_key + '&callback=initMap';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }

    //--------------------------------- Catch Error ---------------------------------//
    gm_authFailure = () => { 
        alert('Google maps failed to load. Error authenticate Google Maps. Check your_api_key.');
    }

    onError = (error, url) => {
        alert('Error: ' + error + '. ' + url);
    }

    checkInternet = () => {
        if (!navigator.onLine)
            alert('Check Internet connection.');
    }

    //------------------------------- Global Variable -------------------------------//
    setGlobalVariable = () => {
        window.animation = window.google.maps.Animation.DROP;
        window.defaultIcon = this.makeMarkerIcon('0091ff');
        window.highlightedIcon = this.makeMarkerIcon('FFFF24');
    }

    //------------------------------------- Map -------------------------------------//
    initMap = () => {
        const mapProps = {center: {lat: 59.941095, lng: 30.320679}, zoom: 15, styles: mapStyles, mapTypeControl: false}
            , map = new window.google.maps.Map(this.refs.map, mapProps);

        this.setGlobalVariable();
        this.setState({map:map});

        FoursquareAPI.getAll().then(venues => this.setPlaces(venues)); //loading places from forsquare.com
    }


    setPlaces = (venues) => {
        const places = []
            , notSights = ['5059aefde4b0b41547d46468', '5662f995498ef0856f812f83', '50a3436ae4b0438744a1e8b7', '51e91117498e7f7e6808dde3', '4d99a82561a3a1cdf36de842']
        ;
        
        if (!venues)
            return; 

        for (let i = 0; i < venues.length; i++) {
            let venue = venues[i];
            
            if (notSights.indexOf(venue.id) >= 0) {continue}; //Exclude NOT Sights

            places.push({
                id: venue.id
                , name: venue.name
                , address: venue.location.address
                , latlng: {lat: venue.location.lat, lng: venue.location.lng}
                , categoria: venue.categories = undefined ? '' : venue.categories[0].name
            });
        }
        this.setState({places:places, showPlaces:places});
        this.setMarkers();
    }

    //--------------------------------- Map's detail ---------------------------------//
    setMarkers = () => { 
        const {map, places} = this.state
            , markers = []
            , bounds = new window.google.maps.LatLngBounds()
            , infowindow = new window.google.maps.InfoWindow()
        ;

        for (let i = 0; i < places.length; i++) {
            markers.push( this.makeMarker(map, places[i], infowindow) );
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
        this.setState({markers:markers});
    }

    makeMarker = (map, place, infowindow) => {
        const marker = new window.google.maps.Marker({
            map: map
            , position: place.latlng
            , name: place.name
            , animation: window.animation
            , icon: window.defaultIcon
            , id: place.id
            , address: place.address
            , categoria: place.categoria
        });

        marker.addListener('click', (() => this.setInfoWindow(infowindow, map, marker)));
        marker.addListener('mouseover', (() => marker.setIcon(window.highlightedIcon) ));
        marker.addListener('mouseout', (() => marker.setIcon(window.defaultIcon) ));

        return marker;
    }

    makeMarkerIcon = (markerColor) => {
        const maps = window.google.maps;

        return new maps.MarkerImage('http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor + '|40|_|%E2%80%A2'
            , new maps.Size(21, 34)
            , new maps.Point(0, 0)
            , new maps.Point(10, 34)
            , new maps.Size(21,34)
        )
    }

    setInfoWindow = (infowindow, map, marker) => {
        const content = `
            <div class = 'info'>
                <h3><a href = 'https://foursquare.com/v/${marker.id}' target='_blank' tabIndex = '0'>${marker.name}</a></h3>
                <hr/>
                <div class = 'text'>${marker.categoria}</div>
                <div class = 'text'>${marker.address}</div>
                <hr/>
                <div class = 'copyright'><i class="fa fa-copyright"><a href = 'https://Foursquare.com' target='_blank'>Foursquare.com</a></i></div>
            </div>
        `;

        infowindow.setContent(content);
        infowindow.marker = marker;
        infowindow.addListener('closeclick', (() => infowindow.setMarker = null));
        infowindow.open(map, marker);
    }

    getInfo = (placeId) => {
        const marker = this.state.markers.find(el => el.id === placeId)
            , map = this.state.map    
        ;
        new window.google.maps.event.trigger(marker, 'click');
        map.setCenter(marker.position);
        this.setAnimation(marker, window.animation);
    }

    setAnimation = (marker, animation) => {
        marker.setAnimation(animation);
        setTimeout(() => marker.setAnimation(null), 2000);
    }

    //--------------------------- Set markers from filter ----------------------------//
    filter = (query) => {
        const {places, markers} = this.state
            , showPlaces = places.filter( (place) => place.name.toLowerCase().indexOf(query.trim().toLowerCase()) > -1 )
            , animation = window.animation
            ;

        this.setState({showPlaces:showPlaces}); 

        //toggle: hide - show markers
        for (let i = 0; i < markers.length; i++) {
            let marker = markers[i]
                , toggle = showPlaces.find(el => el.id === marker.id) ? true : false
                ;
            marker.setVisible(toggle);
            this.setAnimation(marker, animation);
        }
    }

    //---------------------------------- Interface ----------------------------------//
    toggleSidebar = () => {
        this.setState({showSidebar: !this.state.showSidebar});
    }

    render() {
        const {places} = this.state
            , isDataReady = places && places.length > 0
        ;

        return (
            <div className = 'app'>
                <header>
                    <Menu toggleSidebar = {this.toggleSidebar}/>
                    <h1>Sights of St. Petersburg</h1>
                </header>
                
                <main>
                    {isDataReady && <SideBar places = {this.state.showPlaces} showSidebar = {this.state.showSidebar} filter = {this.filter} getInfo = {this.getInfo}/>}
                    <div ref = 'map' className = 'map' role = 'application' aria-label = 'map with sights'>Map loading...</div>
                </main>

            </div>
          )
    }
}
//187, 212