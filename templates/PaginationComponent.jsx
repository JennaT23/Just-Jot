import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { ViewTemplate } from './viewTemplate';
import { paginationStyle as pagination_style } from './pagination.style';
import useThemedStyles from '../appStyles/useThemedStyles';

const PaginationComponent = ({ data, itemsPerPage, navigation, handleExitView, screen }) => {

  const paginationstyle = useThemedStyles(pagination_style);
  const [displayedAddresses, setDisplayedAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const renderItem = ({ item, index }) => (
    <ViewTemplate
      navigation={navigation}
      data={item}
      index={index}
      handleExitView={handleExitView}
      location={displayedAddresses[index]}
      screen={screen}
    />
  );

  return (
    <ScrollView>
      <View style={paginationstyle.mainContainer}>
        <FlatList
          data={getCurrentPageData()}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View style={paginationstyle.paginationContainer}>
          <TouchableOpacity onPress={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            <Text style={paginationstyle.buttonText}>Previous</Text>
          </TouchableOpacity>
          <Text style={paginationstyle.pageText}>Page {currentPage} of {totalPages}</Text>
          <TouchableOpacity onPress={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            <Text style={paginationstyle.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PaginationComponent;