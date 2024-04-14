import { useEffect, useState } from "react";
import PropertyGrid from "../components/propertyGrid/PropertyGrid";
import { Property } from "../types/Property";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import useFetchData from "../hooks/useFetchData";

interface FetchedData {
  properties: Property[];
}
const BASE_URL = "http://localhost:3001/api/admin/get-properties";

export default function Home() {
  const { data, isLoading, error } = useFetchData<FetchedData>(BASE_URL);
  const [properties, setProperties] = useState<Property[]>([]);

  // const fetchHomes = useCallback(async () => {
  //   try {
  //     const data = await sendRequest<FetchedData>(
  //       "http://localhost:3001/api/admin/get-properties"
  //     );
  //     console.log(data);
  //     if (data) setProperties(data.properties);
  //     else console.error("No data received");
  //   } catch (error) {
  //     console.error("Error fetching homes", error);
  //   }
  // }, [sendRequest]);

  useEffect(() => {
    if (data) setProperties(data.properties);
  }, [data]);

  return (
    <div>
      {isLoading ? <LoadingSpinner /> : <PropertyGrid data={properties} />}
      {error && <p>{error}</p>}
    </div>
  );
}
