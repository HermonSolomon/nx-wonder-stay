import { sanityClient } from '../sanity';
import { Properties } from '../types';

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
  properties: Properties[];
}
export function Index({ properties }: Props) {
  let property = properties;
  console.log(property);

  return <></>;
}

export default Index;
