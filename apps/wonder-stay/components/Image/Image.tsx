import { urlFor } from 'apps/wonder-stay/sanity';
const Image = ({ identifier, image, className }) => {
  return (
    <div
      className={
        identifier === 'main-image'
          ? 'main-image w-1/2 max-h-200 overflow-hidden'
          : 'image'
      }
    >
      <img src={urlFor(image).auto('format').url()} />
    </div>
  );
};

export default Image;
