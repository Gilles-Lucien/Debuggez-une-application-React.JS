import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const response = await fetch("/events.json");
    const json = await response.json();
    return json;
  },
};

// Correction applied : added last state, and sorted the data array by date, after copying it, to get the last event
export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);
  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      setData(loadedData);
      if (loadedData && loadedData.events && loadedData.events.length > 0) {
        const sortedData = [...loadedData.events].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setLast(sortedData[0]);
      }
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);



  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
