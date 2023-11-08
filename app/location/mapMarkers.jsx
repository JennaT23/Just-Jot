import React, { useEffect, useState } from 'react';
import { Marker } from "react-native-maps";

export const mapMarkers = () => {
    let markers = [];
    const [journalEntries, setJournalEntries] = useState([]);

    useEffect(() => {
        fetchEntryLocations();
    }, [])

    const fetchEntryLocations = async () => {
        try {
            const entries = await fetchJournalEntriesFromFirebase();
            setJournalEntries(entries);
            markers = journalEntries.map((entry, index) => (
                entry.Location
            ));

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