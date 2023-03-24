import { sanityClient } from 'apps/wonder-stay/sanity';
import { Properties } from 'apps/wonder-stay/types';
import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const query = `*[_type == "property"]{
        _id,
        slug {
            current
        }
    }`;

  const properties = await sanityClient.fetch(query);

  const paths = properties.map((property) => ({
    params: {
      slug: property.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "property" && slug.current == $slug][0] {
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
          image,
      },
      reviews[]{
          ...,
          traveler->{
              _id,
              name,
              slug,
              image
          }
      }
    }`;

  const property = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!property) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      property: property,
      revalidate: 60, // after 60 secs the cached version of the content gets updated
    },
  };
};

interface Props {
  property: Properties;
}

const Property = ({ property }: Props) => {
  console.log(property.title);
  return <h1>{property.title}</h1>;
};

export default Property;
