export interface Properties {
  _id: string;
  title: string;
  description: string;
  bedrooms: number;
  beds: number;
  pricePerNight: number;
  propertyType: string;
  reviews: {
    _id: string;
    rating: string;
    length: number;
  };
  host: {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
    image: {
      asset: {
        url: string;
      };
    };
  };
  location: {
    lat: number;
    long: number;
  };
  slug: {
    current;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  propertyType: {
    list: [
      {
        title: string;
        value: number;
      }
    ];
  };
}
