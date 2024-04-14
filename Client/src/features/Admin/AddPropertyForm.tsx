import { useState } from "react";
import { Property, PropertyTypeEnum } from "../../types/Property";
import { SubmitHandler, useForm } from "react-hook-form";
import { uploadFiles } from "../../utils/aws/aws";
import { useHttpClient } from "../../hooks/useHttp";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

type FormFields = {
  title: string;
  address: string;
  city: string;
  description: string;
  price: number;
  imageUrl: string;
  bedrooms: number;
  type: PropertyTypeEnum;
  floor?: number;
  gallery?: { images: string[] };
  numParkings: number;
};

export default function AddPropertyForm() {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>();
  const propertyType = watch("type")
    ? watch("type")
    : PropertyTypeEnum.Apartment;
  const { sendRequest, isLoading } = useHttpClient();
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      try {
        const fileList = Array.from(files);
        setImageFiles(fileList);
      } catch (error) {
        setImageFiles([]);
        console.error("Error uploading images:", error);
      }
    } else {
      console.error("No files provided");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imageUrls = await uploadFiles(imageFiles);
      setValue("gallery", { images: imageUrls });
    } catch (error) {
      console.error("Error uploading images", error);
      return;
    }
    try {
      handleSubmit(onSubmitForm)();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const addProperty = async (data: FormFields) => {
    const property = new Property(data);
    property.imageUrl = data.gallery?.images[0] || "";
    try {
      await sendRequest(
        "http://localhost:3001/api/admin/add-property",
        "POST",
        { property },
        {
          "Content-Type": "application/json",
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error adding property", error);
    }
  };

  const onSubmitForm: SubmitHandler<FormFields> = (data) => {
    try {
      addProperty(data);
    } catch (error) {
      console.error("Error adding property", error);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="bg-gray-200 dark:bg-gray-700 p-3 relative top-12 rounded-lg border-black shadow-sm dark:shadow-gray-900">
        <form className="flex flex-col">
          <label htmlFor="title">כותרת</label>
          <input
            {...register("title", {
              required: true,
              minLength: 5,
            })}
            className="input-field"
            type="text"
          />
          {errors.title && <div className="text-red-500">שדה חובה</div>}
          <label htmlFor="address">כתובת</label>
          <input
            {...register("address", {
              required: true,
              minLength: 5,
            })}
            className="input-field"
            type="text"
          />
          {errors.address && <div className="text-red-500">שדה חובה</div>}
          <label htmlFor="city">עיר</label>
          <input
            {...register("city", {
              required: true,
              minLength: 2,
            })}
            className="input-field"
            type="text"
          />
          {errors.city && <div className="text-red-500">שדה חובה</div>}
          <label htmlFor="description">תיאור</label>
          <input
            {...register("description")}
            className="input-field"
            type="text"
          />
          <label htmlFor="price">מחיר</label>
          <input {...register("price")} className="input-field" type="text" />
          <div className="flex">
            <div className="flex flex-col ml-3">
              <label htmlFor="bedrooms">חדרים</label>
              <input
                {...register("bedrooms", { required: true, min: 1 })}
                className="input-field number-input"
                step={0.5}
                min={1}
                type="number"
              />
            </div>
            {errors.bedrooms && <div className="text-red-500">שדה חובה</div>}
            <div className="flex flex-col">
              <label htmlFor="bedrooms">חניות</label>
              <input
                {...register("numParkings", {
                  min: 0,
                  validate: (value) => value % 1 === 0 || "חייב להיות מספר שלם",
                })}
                className="input-field number-input"
                type="number"
                step={1}
                min={0}
              />
              {errors.numParkings && (
                <div className="text-red-500">חייב להיות מספר שלם</div>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col ml-3">
              <label htmlFor="type">סוג נכס</label>
              <select {...register("type")} className="input-field w-40">
                {Object.values(PropertyTypeEnum).map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {propertyType === PropertyTypeEnum.Apartment && (
              <div className="flex flex-col">
                <label htmlFor="floor">קומה</label>
                <input
                  {...register("floor")}
                  className="input-field number-input"
                  type="number"
                />
              </div>
            )}
          </div>
          <label htmlFor="image">תמונה</label>
          <input
            className="input-field"
            type="file"
            accept="image/*"
            multiple
            id="image"
            name="image"
            onChange={handleImageChange}
          />
          <button
            onClick={onSubmit}
            className="bg-gray-300 hover:scale-105 text-black dark:bg-gray-500 dark:text-white-300 font-bold w-20 self-center my-2 p-1 hover:rounded-lg rounded-sm dark:hover:bg-gray-700 transition-all duration-200 ease-linear"
            type="submit"
          >
            הוסף נכס
          </button>
        </form>
      </div>
    </>
  );
}
