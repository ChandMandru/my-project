import { useState, useEffect } from "react";

export const useRoomData = (filter, clicked) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    async function fetchMyAPI() {
      try {
        let response = await fetch(
          "https://hsrm-hotel-api.herokuapp.com/rooms?" +
            new URLSearchParams({
              adults: filter.adult,
              children: filter.child,
            })
        );
        response = await response.json();
        setData(response);
      } catch (error) {
        setError(error);
      }
    }

    fetchMyAPI();
  }, [clicked]);

  return {
    data: data,
    loading: data === null,
    error: error,
  };
};
