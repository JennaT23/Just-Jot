import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
// import { Memory } from './memory';

const PaginationComponent = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const renderItem = ({ item }) => (
    <Text>entries will be populated here</Text>
  );

  return (
    <View>
      <FlatList
        data={getCurrentPageData()}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <Text>Page {currentPage} of {totalPages}</Text>
        <TouchableOpacity onPress={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaginationComponent;