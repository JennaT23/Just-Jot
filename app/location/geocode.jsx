import * as ExpoLocation from 'expo-location';

export const geocodeAddress = async (address) => {
    try {
        let location = await ExpoLocation.geocodeAsync(address);
    } catch (error) {
        console.error('Error during geocoding:', error);
    }
};

export const reverseGeocodeCoordinates = async (latitude, longitude) => {
    try {
        let address = await ExpoLocation.reverseGeocodeAsync({ latitude, longitude });
    } catch (error) {
        console.error('Error during reverse geocoding:', error);
    }
};

export const displayAddress = async (location) => {
    try {
        const reverseGeocodeResult = await ExpoLocation.reverseGeocodeAsync({
            latitude: location.latitude,
            longitude: location.longitude,
        });

        if (reverseGeocodeResult && reverseGeocodeResult.length > 0) {
            // const address = reverseGeocodeResult[0].name; // Use the appropriate property based on the reverse geocoding result
            const result = reverseGeocodeResult[0];
            const address = result.streetNumber + " " + result.street + ", " + result.city + ", " + result.region + " " + result.postalCode;
            return address;
            //setSearchResults([]); // Clear search results after selecting a location
        } else {
            console.warn('No address found for the selected location');
        }


        // console.log("location:", location);
        // const addresses = await Promise.all(
        //     location.map(async (loc) => {
        //         console.log("loc: ", loc.Location);
        //       const reverseGeocodeResult = await ExpoLocation.reverseGeocodeAsync({
        //         latitude: loc.Location.latitude,
        //         longitude: loc.Location.longitude,
        //       });
      
        //       if (reverseGeocodeResult && reverseGeocodeResult.length > 0) {
        //         const result = reverseGeocodeResult[0];
        //         const address = result.streetNumber + " " + result.street + " " + result.city + ", " + result.region + " " + result.postalCode;
        //         console.log("add: ", address);
        //         return address;
        //       } else {
        //         console.warn('No address found for the selected location');
        //         return '';
        //       }
        //     })
        //   );
      
        //   console.log("geo addresses: ", addresses);
        //   return addresses;
    } catch (error) {
        console.error('Error during reverse geocoding:', error);
    }
};