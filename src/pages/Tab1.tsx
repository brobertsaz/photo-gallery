import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react'
import './Tab1.css'

interface Character {
  name: string;
  _id: string;
  height: string;
  race: string;
  gender: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
  wikiUrl: URL;
}

interface Characters {
  name: string;
  matches: Array<Character>;
}


const Tab1: React.FC = () => {
  const [data, setData] = useState<Characters[]>([])
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://the-one-api.herokuapp.com/v1/character'
      const result = await axios.get(url, {
        params: {},
        headers: {
          Authorization: 'Bearer K5RVkjJBo9h9zlhvCrUt'
        },
      })
      setData(result.data.docs)
      setShowLoading(false)
    }

    fetchData()
  }, [])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>LOTR Characters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>LOTR Characters</IonTitle>
          </IonToolbar>
        </IonHeader>

        {data.map((m: any) => (
          <IonList key={m._id} lines='none'>
            <IonItemSliding>
              <IonItem>
                <IonLabel>
                  <h2>{m.name}</h2>
                  <p>{m.race}</p>
                  <p>{m.wikiUrl}</p>
                </IonLabel>
              </IonItem>
              <IonItemOptions side='end'>
                <IonItemOption onClick={() => {}}>View Details</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </IonList>
        ))}
      </IonContent>
    </IonPage>
  )
};

export default Tab1;

