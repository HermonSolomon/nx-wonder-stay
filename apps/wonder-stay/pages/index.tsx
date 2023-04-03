import Link from 'next/link';
import DashboardMap from '../components/DashboardMap/DashboardMap';
import { sanityClient, urlFor } from '../sanity';
import { Property } from '../types';
import { isMultiple } from '../utils';

export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]';
  const properties = await sanityClient.fetch(query);

  if (!properties.length) {
    return {
      props: {
        properties,
      },
    };
  } else {
    return {
      props: {
        properties,
      },
    };
  }
};

interface Props {
  properties: Property[];
}
export function Index({ properties }: Props) {
  console.log(properties);

  return (
    <>
      {properties && (
        <div className="main w-1/2">
          <div className="feed-container">
            <h1 className="text-2xl text-center p-4">
              Places to stay near you
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.map((property) => (
                <Link
                  href={`property/${property.slug.current}`}
                  className="flex flex-col mb-8"
                >
                  <div key={property._id} className="mb-4 flex-grow">
                    <img
                      src={urlFor(property.mainImage).url()}
                      className="h-full max-h-52 l object-cover rounded-md"
                    />
                    <p>
                      {property.reviews.length} review
                      {isMultiple(property.reviews.length)}
                    </p>
                    <h3>{property.title}</h3>
                    <h3>
                      <b>£{property.pricePerNight}/per Night</b>
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="map w-1/2">
        <DashboardMap properties={properties} />
      </div>
    </>
  );
}

export default Index;
