import { Property, PropertyTypeEnum } from "../../types/Property";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { imageUrl, title, address, bedrooms, type, numParkings, floor } =
    property;
  return (
    <div className="property-card">
      <img src={imageUrl} alt={address} className="h-44 w-full 3xl:h-52" />
      <div className="property-card-details">
        <h3 className="font-bold">{title}</h3>
        <p>{address}</p>
        <p>
          {bedrooms} חדרים{" "}
          {type === PropertyTypeEnum.Apartment && floor && (
            <span>&bull; קומה {floor} </span>
          )}
        </p>
        {numParkings !== undefined && numParkings > 0 && (
          <div className="flex items-center justify-between w-16 text-gray-500">
            <p>{numParkings} חניות </p>
          </div>
        )}
      </div>
    </div>
  );
}
