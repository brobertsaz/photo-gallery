import React, { useEffect, createRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter} from '@ionic/react';
// import './Tab4.css'
// import 'leaflet/dist/leaflet.css'
// import L from 'leaflet'
import { Map, tileLayer, marker, icon } from 'leaflet'
import axios from "axios"
import { Link } from 'react-router-dom';
// import { Map, TileLayer, Marker } from 'react-leaflet'

// import icon from 'leaflet/dist/images/marker-icon.png'
// import iconShadow from 'leaflet/dist/images/marker-shadow.png'

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow,
// })

// L.Marker.prototype.options.icon = DefaultIcon



interface Crime {
  id: string;
  location: {
    latitude: string
    longitude: string
  }
}

interface Crimes {
  name: string;
  matches: Array<Crime>;
}





const Tab4: React.FC = () => {
  const [data, setData] = useState<Crimes[]>([])



  useEffect(() => {
    const fetchData = async () => {
      const url =
        'https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10'
      const result = await axios.get(url)
      const data= result.data.slice(0, 10)
      setData(data)
    }
    fetchData()
  }, [])


  // const mapRef = createRef<Map>()

  // useEffect(() => {
  //   // console.log('use effect')
  //   setTimeout(() => {
  //     mapRef.current?.leafletElement.invalidateSize()
  //   }, 0)
  // }, [mapRef.current])

  useIonViewDidEnter(function () {
     const map = new Map('map').setView([33.6396965, -84.4304574], 23)

     tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution:
         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
     }).addTo(map)

      map.invalidateSize()


      setTimeout(function () {
        map.invalidateSize()
      }, 100)

    // setTimeout(() => {
    //   map.invalidateSize()
    // }, 500)
    // console.log('did enter')

    // setTimeout(() => {
    //   mapRef.current?.leafletElement.invalidateSize()
    // }, 0)

  })


  return (
    <IonPage>
      <IonHeader>
        <link href='https://unpkg.com/leaflet@1.4.0/dist/leaflet.css'></link>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div id='map' style={{ height: '100%', width: '100%' }}></div>
        {/* <Map ref={mapRef} center={[52.643482, -1.128065]} zoom={14}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            style={{ width: '100%', height: '900px' }}
          />

          {data.map((crime: any) => (
            <Marker
              key={crime.id}
              position={[crime.location.latitude, crime.location.longitude]}
            />
          ))}
        </Map> */}
      </IonContent>
    </IonPage>
  )
}

export default Tab4;
