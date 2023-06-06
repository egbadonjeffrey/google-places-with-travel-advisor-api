import axios from "axios";
import { API_KEY } from "../secret";

export const getPlacesData = async (location, type) => {
  try {
    // console.log("my location_id", location);
    const {
      data: { data },
    } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list`, {
      params: {
        location_id: location ? location?.toString() : "25189685",
        currency: "USD",
        lunit: "km",
        limit: "5",
        open_now: "false",
        lang: "en_US",
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    });
    return data;
  } catch (error) {
    console.log("my index Error", error);
  }
};

export const getLocation = async (query) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      "https://travel-advisor.p.rapidapi.com/locations/auto-complete",
      {
        params: {
          query,
          lang: "en_US",
          units: "km",
        },
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log("my index2 error", error);
  }
};
