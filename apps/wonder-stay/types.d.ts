export interface Properties {
  _id: string;
  _title: string;
  description: string;
  bedrooms: number;
  beds: number;
  pricePerNight: number;
  propertyType: string;
  reviews: {
    _id: string;
    rating: string;
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
