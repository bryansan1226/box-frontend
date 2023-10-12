import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import backendUrl from "../config";
import axios from "axios";
import UserCard from "../components/UserCard";
import AppBar from "../components/AppBar";

function SearchResults() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchQuery = queryParams.get("searchQuery");
  const userInfo = queryParams.get("userInfo");
  const [results, setResults] = useState([]);

  const searchForUser = async () => {
    axios
      .get(`${backendUrl}api/search/users/${searchQuery}`)
      .then((response) => {
        const message = response.data.rows;
        setResults(message);
        console.log("Response from server:", message);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  useEffect(() => {
    searchForUser();
  }, []);

  return (
    <>
      <AppBar />
      <div>
        <h1>Results:</h1>
      </div>
      <div>
        {results.map((result, index) => (
          <UserCard key={index} result={result} userInfo={userInfo} />
        ))}
      </div>
    </>
  );
}
export default SearchResults;
