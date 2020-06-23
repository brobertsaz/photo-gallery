import React, { useState } from 'react';
import axios from 'axios'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, useIonViewWillEnter, IonInfiniteScroll, IonInfiniteScrollContent} from '@ionic/react';
import './Tab3.css';

interface Cat {
  url: URL;
  id: string;
}

interface Cats {
  name: string;
  matches: Array<Cat>;
}

const Tab3: React.FC = () => {

  const [items, setItems] = useState<Cats[]>([]);

  const [disableInfiniteScroll, setDisableInfiniteScroll] =
    useState<boolean>(false);

  async function fetchData() {
    const url: string = 'https://api.thecatapi.com/v1/images/search?limit=10';
    const res: Response = await fetch(url);
    res
      .json()
      .then(async (res) => {
        if (res && res.length > 0) {
          setItems(res)
          setDisableInfiniteScroll(res.length < 10);
        } else {
          setDisableInfiniteScroll(true);
        }
      })
      .catch(err => console.error(err));
  }

  useIonViewWillEnter(async () => {
    await fetchData();
  });

  async function searchNext($event: CustomEvent<void>) {
    await fetchData();

    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kitties</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {items.map((item: any) => {
          return <IonCard key={`${item.id}`}><img src={item.url} />
          </IonCard>
        })}
        <IonInfiniteScroll threshold="100px"
          disabled={disableInfiniteScroll}
          onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
          <IonInfiniteScrollContent
            loadingText="Loading more kitties...">
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
