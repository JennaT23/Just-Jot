import * as Location from 'expo-location';

export const geocodeAddress = async (address) => {
    try {
        let location = await Location.geocodeAsync(address);
        console.log('Geocoding result:', location);
    } catch (error) {
        console.error('Error during geocoding:', error);
    }
};

export const reverseGeocodeCoordinates = async (latitude, longitude) => {
    try {
        let address = await Location.reverseGeocodeAsync({ latitude, longitude });
        console.log('Reverse geocoding result:', address);
    } catch (error) {
        console.error('Error during reverse geocoding:', error);
    }
};

export const displayAddress = async (location) => {
    try {
        const reverseGeocodeResult = await Location.reverseGeocodeAsync({
            latitude: location.latitude,
            longitude: location.longitude,
        });

        if (reverseGeocodeResult && reverseGeocodeResult.length > 0) {
            const address = reverseGeocodeResult[0].name; // Use the appropriate property based on the reverse geocoding result
            console.log('Selected address:', address);
            return address;
            //setSearchResults([]); // Clear search results after selecting a location
        } else {
            console.warn('No address found for the selected location');
        }
    } catch (error) {
        console.error('Error during reverse geocoding:', error);
    }
};