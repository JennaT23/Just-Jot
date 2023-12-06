import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'react-native-paper';
import { ViewTemplate } from './viewTemplate';
import { paginationStyle as pagination_style } from './pagination.style';
import useThemedStyles from '../appStyles/useThemedStyles';
import useTheme from "../appStyles/useTheme";
import { displayAddress } from '../app/location/geocode';

const PaginationTemplate = ({ data, itemsPerPage, navigation, handleExitView, screen }) => {
  const theme = useTheme();
  const paginationstyle = useThemedStyles(pagination_style);
  const [displayedAddresses, setDisplayedAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
//   let displayedAddresses;
// console.log("data[0]: ", data[0]);
  
  const fetchAndDisplayAddresses = async () => {
    console.log("data: ", data);
    const addresses = await Promise.all(
        data.map(async (entry) => {
            console.log("entry: ", entry.Location);
            const address = await displayAddress(entry.Location);
            console.log("address:", address)
            return address;
        })
    );
    // const addresses = await displayAddress(data);
    setDisplayedAddresses(addresses);
    // displayedAddresses = addresses;
    console.log("addresses: ", addresses);
};

// useEffect(() => {
//     // fetchAndDisplayAddresses();
//     const fetchAndDisplayAddresses = async () => {
//         try{
//             console.log("data: ", data);
//             const addresses = await Promise.all(
//                 data.map(async (entry) => {
//                     console.log("entry: ", entry.Location);
//                     const address = await displayAddress(entry.Location);
//                     console.log("address:", address)
//                     return address;
//                 })
//             );
//             // const addresses = await displayAddress(data);
//             setDisplayedAddresses(addresses);
//             // displayedAddresses = addresses;
//             console.log("addresses: ", addresses);
//         }catch(error)
//         {
//             console.error(error);
//         }

//     };

//     if (data.length > 0) {
//         fetchAndDisplayAddresses();
//       }
// }, [data]);


const useFetchAddress = (location) => {
    const [address, setAddress] = useState(null);
  
    useEffect(() => {
      const fetchAddress = async () => {
        try {
          const result = await displayAddress(location);
          setAddress(result);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchAddress();
    }, [location]);
  
    return address;
  };


  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const renderEntries = ({ item, index }) => {
    // const addressToDisplay = displayAddress(item.Location);
    // const addressToDisplay = useFetchAddress(item.Location);

    // console.log("Rendering Entry:", item, index);
    // console.log("Data:", data);
    // console.log("displayedAddresses:", addressToDisplay);
    // if (!addressToDisplay) {
    //     // Wait until displayedAddresses[index] is initialized
    //     return null; // or a loading indicator or some placeholder
    //   }
    // console.log("displayedaddresses: ", addressToDisplay);
    return(

  <ViewTemplate
    navigation={navigation}
    data={item}
    index={index}
    handleExitView={handleExitView}
    screen={screen}
  />
  )
    };

  return (
    <View style={{flex:1}}>
      <View style={paginationstyle.paginationContainer}>
        <TouchableOpacity onPress={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          <Icon
            source="chevron-left"
            size={25}
            color={theme.colors.TEXT}
          />
        </TouchableOpacity>
        <Text style={paginationstyle.pageText}>Page {currentPage} of {totalPages}</Text>
        <TouchableOpacity onPress={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          <Icon
            source="chevron-right"
            size={25}
            color={theme.colors.TEXT}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={getCurrentPageData()}
        renderItem={renderEntries}
        keyExtractor={item => item.id}
        style={paginationstyle.mainContainer}
      />

    </View>
  );
};

export default PaginationTemplate;