import { SlideshowLightbox } from "lightbox.js-react";

const SlideImgSingleProduct = ({ images, setIsOpen, isOpen }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 rounded-lg">
        {/* Lightbox */}
        <SlideshowLightbox
          className="container mx-auto"
          showThumbnails={true}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {images.map((item, index) => (
            <img key={index} className="w-full rounded" src={item} />
          ))}
        </SlideshowLightbox>
      </div>
    </div>
  );
};

export default SlideImgSingleProduct;
