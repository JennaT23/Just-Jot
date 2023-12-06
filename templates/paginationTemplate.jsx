import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'react-native-paper';
import { ViewTemplate } from './viewTemplate';
import { paginationStyle as pagination_style } from './pagination.style';
import useThemedStyles from '../appStyles/useThemedStyles';
import useTheme from "../appStyles/useTheme";
import { displayAddress } from '../app/location/geocode';

const PaginationTemplate = ({ data: entries, itemsPerPage, navigation, handleExitView, screen }) => {
  const theme = useTheme();
  const paginationstyle = useThemedStyles(pagination_style);
  const [displayedAddresses, setDisplayedAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(entries.length / itemsPerPage);
  
  const fetchAndDisplayAddresses = async () => {
    const addresses = await Promise.all(
        entries.map(async (entry) => {
            const address = await displayAddress(entry.Location);
            return address;
        })
    );
    setDisplayedAddresses(addresses);
};

useEffect(() => {
    fetchAndDisplayAddresses();
}, [entries]);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return entries.slice(startIndex, endIndex);
  };

  const renderEntries = ({ item: entries, index }) => (
  <ViewTemplate
    navigation={navigation}
    data={entries}
    index={index}
    handleExitView={handleExitView}
    location={displayAddress[index]}
    screen={screen}
  />
  );

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