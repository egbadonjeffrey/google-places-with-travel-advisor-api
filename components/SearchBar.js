import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { getLocation, getPlacesData } from "../api";
import colors from "../Colors";

const SearchBar = ({ locationGetter, setLocationGetter }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [autoComplete, setAutoComplete] = useState(false);

  useEffect(() => {
    let timeoutId;
    const debounceGetLocation = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setResults([]);
        if (query.length > 2) {
          getLocation(query)
            .then((data) => {
              //   console.log(data);
              const locations = [];
              const uniqueLocationIds = new Set(); // Use a Set to keep track of unique location_ids

              data?.forEach((d) => {
                const locationId = d?.result_object?.location_id;
                if (locationId && !uniqueLocationIds.has(locationId)) {
                  uniqueLocationIds.add(locationId);
                  const locationString = d?.result_object?.location_string;
                  locations.push({
                    locationString,
                    locationId,
                  });
                }
              });

              setResults(locations);
              // console.log(locations);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setResults([]);
        }
      }, 500);
    };

    return () => {
      debounceGetLocation();
      // handleResults();
    };
  }, [query]);

  const handleInputChange = (text) => {
    setQuery(text);
  };

  const handleSelectResult = (result) => {
    setQuery(result.locationString);
    setAutoComplete(false);
    console.log("my passer", result.locationId);
    setLocationGetter(result.locationId);
  };

  return (
    <View className="w-full">
      <View className="w-full flex-row justify-center px-2 items-center ">
        <TextInput
          className="w-full p-3 text-base border-b-[#2A4A4B] border-b-2"
          placeholder="Enter a location"
          value={query}
          onChangeText={(value) => handleInputChange(value)}
          onFocus={() => setAutoComplete(true)}
        />
        {query.length > 2 && (
          <TouchableOpacity
            className="absolute right-3"
            onPress={() => setQuery("")}
          >
            <MaterialIcons name="cancel" size={24} color={colors.greyish} />
          </TouchableOpacity>
        )}
      </View>
      {autoComplete && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.locationId}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectResult(item)}>
              <Text className="text-black font-medium text-lg">
                {item.locationString}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchBar;
