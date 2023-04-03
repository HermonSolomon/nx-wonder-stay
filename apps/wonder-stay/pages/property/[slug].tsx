import Review from 'apps/wonder-stay/components/Review/Review';
import { sanityClient } from 'apps/wonder-stay/sanity';
import { Property } from 'apps/wonder-stay/types';
import { isMultiple } from 'apps/wonder-stay/utils';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Map from 'apps/wonder-stay/components/Map/Map';
import Image from 'apps/wonder-stay/components/Image/Image';

export const getServerSideProps: GetServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      name,
      slug,
      image
    },
    reviews[]{
      ...,
      traveller->{
        _id,
        name,
        slug,
        image
      }
    }
  }`;

  const property = await sanityClient.fetch(query, { pageSlug });

  if (!property) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        title: property.title,
        location: property.location,
        propertyType: property.propertyType,
        mainImage: property.mainImage,
        images: property.images,
        pricePerNight: property.pricePerNight,
        beds: property.beds,
        bedrooms: property.bedrooms,
        description: property.description,
        host: property.host,
        reviews: property.reviews,
      },
    };
  }
};

interface Props {
  property: Property;
}

const Property = ({
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePerNight,
  beds,
  bedrooms,
  description,
  host,
  reviews,
}) => {
  const reviewAmount = reviews.length;

  // console.log(property);
  return (
    <div className="container">
      <h1>
        <b>{title}</b>
      </h1>
      <p>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </p>
      <div className="images-section flex max-h-100 overflow-hidden">
        <Image
          identifier="main-image"
          image={mainImage}
          className="w-1/2 max-h-12"
        />
        <div className="sub-images-section w-1/2 flex flex-wrap overflow-hidden">
          {images.map(({ _key, asset }, image) => (
            <Image key={_key} identifier="image" image={asset} className="" />
          ))}
        </div>
      </div>
      <div className="section flex justify-between">
        <div className="information w-1/2">
          <h2>
            <b>
              {propertyType} hosted by {host?.name}
            </b>
          </h2>
          <h4>
            {bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed
            {isMultiple(beds)}
          </h4>
          <hr />
          <h4>
            <b>Enhanced Clean</b>
          </h4>
          <p>
            This host is committed to Airbnb's 5-step enhanced cleaning process.
          </p>
          <h4>
            <b>Amenities for everyday living</b>
          </h4>
          <p>
            The host has equipped this place for long stays - kitchen, shampoo,
            conditioner, hairdryer included.
          </p>
          <h4>
            <b>House rules</b>
          </h4>
          <p>
            This place isn't suitable for pets andthe host does not allow
            parties or smoking.
          </p>
        </div>
        <div className="price-box w-1/3 h-38 border-solid border-gray-400 rounded-md p-6 flex flex-col content-center bg-slate-200 justify-center">
          <h2>£{pricePerNight}</h2>
          <h4>
            {reviewAmount} review{isMultiple(reviewAmount)}
          </h4>
          <Link href="/">
            <button className="button text-white rounded-sm bg-red-400 p-4">
              Change Dates
            </button>
          </Link>
        </div>
      </div>
      <hr />
      {reviewAmount} review{isMultiple(reviewAmount)}
      <h4>{description}</h4>
      <hr />
      <h2>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </h2>
      {reviewAmount > 0 &&
        reviews.map((review) => <Review key={review._key} review={review} />)}
      <hr />
      <h2>Location</h2>
      <Map location={location}></Map>
    </div>
  );
};

export default Property;
