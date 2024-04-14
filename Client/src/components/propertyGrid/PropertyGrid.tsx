import { Property } from "../../types/Property";
import PropertyCard from "../propertyCard/PropertyCard";

interface ComponentGridProps {
  data: Property[];
}

export default function PropertyGrid(props: ComponentGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-32">
      {props.data.map((item, index) => (
        <div key={index}>
          <PropertyCard property={item} />
        </div>
      ))}
    </div>
  );
}
