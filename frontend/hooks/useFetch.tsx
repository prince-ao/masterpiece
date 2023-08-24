import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = async (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

const options = {
  method: 'GET',
  url: 'https://any-anime.p.rapidapi.com/anime/gif',
  headers: {
    'X-RapidAPI-Key': 'fc96dc15fdmsh677af8df8e010b2p13f776jsn9d14da62edfc',
    'X-RapidAPI-Host': 'any-anime.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
	console.error(error);
}

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;