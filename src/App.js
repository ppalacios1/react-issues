import { useState } from "react";

import "./App.css";
import Issues from "./components/Issues";
import LoadingSpinner from "./components/LoadingSpinner";
import SearchBar from "./components/SearchBar";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let lastQuery = null;
  const fetchData = async (query) => {
    if (lastQuery === query) {
      return;
    }
    lastQuery = query;
    let res,
      resData,
      formatedData,
      url = new URL("https://api.github.com/search/issues");
    url.searchParams.append(
      "q",
      "org:facebook repo:react " + query + " in:title"
    );
    setIsLoading(true);
    try {
      res = await fetch(url);
      resData = await res.json();
      formatedData = resData.items.map((issue) => {
        return {
          key: issue.id,
          title: issue.title,
          labels: issue.labels,
          description: issue.body,
          user: issue.user.login,
          avatar: issue.user.avatar_url,
          url: issue.user.html_url,
        };
      });
    } catch (e) {
      alert("There was an error loading data.");
    } finally {
    }
    setIsLoading(false);

    setData(formatedData || []);
  };
  return (
    <div className="App">
      <header>
        <h1>Interview App - React/Issues</h1>
      </header>
      <main>
        <SearchBar search={fetchData}></SearchBar>
        <div>
          {isLoading && <LoadingSpinner />}
          <Issues issues={data} />
        </div>
      </main>
    </div>
  );
}

export default App;
