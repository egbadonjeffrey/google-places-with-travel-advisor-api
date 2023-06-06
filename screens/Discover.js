import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MenuContainer from "../components/MenuContainer";
import colors from "../Colors";
import { FontAwesome } from "@expo/vector-icons";
import ItemCardContainer from "../components/ItemCardContainer";
import { getPlacesData } from "../api";
import SearchBar from "../components/SearchBar";

const Discover = () => {
  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [locationGetter, setLocationGetter] = useState(null);

  useEffect(() => {
    // if (locationGetter) {
    setIsLoading(true);

    console.log("my locationGetter", locationGetter);
    getPlacesData(locationGetter, type)
      .then((data) => {
        // console.log("my restaurant data", data);
        setMainData(data);
        // console.log(mainData);
        setInterval(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    return () => {
      getPlacesData();
    };
    // }
  }, [locationGetter, type]);

  return (
    <SafeAreaView
      className="flex-1 bg-white relative"
      onPress={Keyboard.dismiss()}
    >
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className={`text-[40px] text-[#0B646B] font-[500]`}>
            Discover
          </Text>
          <Text className={`text-[36px] text-[#527283] `}>
            the beauty today
          </Text>
        </View>

        <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>

      <View className="flex-row items-center bg-white mx-4 mt-2 rounded-xl py-1 px-4 shadow-lg">
        <SearchBar
          locationGetter={locationGetter}
          setLocationGetter={setLocationGetter}
        />
      </View>

      {/* MENU CONTAINER */}

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView>
          <View className="flex-row items-center  justify-between px-8 mt-8">
            <MenuContainer
              key="hotel"
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key="attractions"
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key="restaurants"
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#2C7369] text-[28px] font-semibold">
                Top Tips
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#2C7369] text-[20px] font-semibold">
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color={"#A0C4C7"}
                />
              </TouchableOpacity>
            </View>

            <View className="px-4 mt-8 mb-5 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCardContainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://e7.pngegg.com/pngimages/787/449/png-clipart-restaurants-menu-illustration-pasta-cafe-restaurant-menu-chef-sketch-restaurant-menu-food-text-thumbnail.png"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center justify-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className="w-32 h-32 object-cover"
                    />
                    <View className="flex-col items-center justify-center text-center">
                      <Text className=" text-3xl text-[#428288] font-semibold">
                        Awww... Don't Cry
                      </Text>
                      <Text className="text-center text-xl text-[#428288] font-[400]">
                        What you're looking for may have been misplaced in long
                        term Memory.
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
