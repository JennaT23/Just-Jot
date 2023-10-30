import React, {useEffect,useState} from 'react';
import { Marker } from "react-native-maps";

export const mapMarkers = () => {
    let markers = [];
    const [journalEntries, setJournalEntries] = useState([]);

    useEffect(() => {
      fetchEntryLocations();
  }, [user])

  const fetchEntryLocations = async () => {
    try {
        const entries = await fetchJournalEntriesFromFirebase();
        setJournalEntries(entries);
        console.log("fetch", journalEntries);
        markers = journalEntries.map((entry, index) => (
          entry.Location
        )
        )
        console.log("markers: ", markers);

    } catch (error) {
        console.log('Error fetching', error);
    }
};

    return markers.map((marker) => <Marker
    //   key={report.id}
      coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
      title={marker.location}
    //   description={report.comments}
    >
    </Marker >)
  }