import React, { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import useDimensions from "react-cool-dimensions";

import { debounce } from "../utils/debounce";

function DynamicLoadingGallery({ photos }) {
  const [images, setImages] = useState(photos.slice(0, 6));
  const [pageNum, setPageNum] = useState(1);
  const loadMorePhotos = debounce(() => {

    setImages(images.concat(photos.slice(images.length, images.length + 6)));
    setPageNum(pageNum + 1);
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    let scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 500) {
      loadMorePhotos();
    }
  };

  const { ref, width, height } = useDimensions({
    useBorderBoxSize: true,
  });

  return (
    <div ref={ref}>
      {width >= 675 && (
        <Gallery photos={images} direction={"column"} columns={2} margin={8}/>
      )}
      {width < 675 && (
        <Gallery photos={images} direction={"column"} columns={1} margin={8}/>
      )}
    </div>
  );
}

export default DynamicLoadingGallery;