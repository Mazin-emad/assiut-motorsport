import { useParams } from "react-router";
import image0 from "../../../assets/images/logo.jpg";
import image1 from "../../../assets/images/car1.jpg";
import image2 from "../../../assets/images/car2.jpg";
import image3 from "../../../assets/images/car3.jpg";
import image4 from "../../../assets/images/heroBackGroundCar.jpg";
import image5 from "../../../assets/images/team.jpg";

const imagesCollection = [
  { id: 1, url: image1 },
  { id: 2, url: image2 },
  { id: 13, url: image5 },
  { id: 3, url: image3 },
  { id: 4, url: image0 },
  { id: 5, url: image4 },
  { id: 6, url: image5 },
  { id: 7, url: image0 },
  { id: 8, url: image4 },
  { id: 9, url: image5 },
  { id: 10, url: image1 },
  { id: 11, url: image2 },
  { id: 12, url: image3 },
  { id: 14, url: image2 },
  { id: 15, url: image3 },
  { id: 16, url: image1 },
  { id: 17, url: image0 },
  { id: 18, url: image5 },
];

const Collection = () => {
  const { id } = useParams();
  const collectionTitle = `Collection ${id}`;

  return (
    <div className="min-h-screen bg-text py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
          {collectionTitle}
        </h1>
      </div>
      <div className="columns-[300px] gap-2">
        {imagesCollection.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={collectionTitle}
            className="w-full mb-2"
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
