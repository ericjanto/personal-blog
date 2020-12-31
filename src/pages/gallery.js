import React from 'react'
import Helmet from 'react-helmet'
import Gallery from 'react-photo-gallery'
import useDimensions from 'react-cool-dimensions'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import config from '../utils/config'
import photos from '../data/photos'
import DynamicLoadingGallery from '../components/DynamicLoadingGallery'


const GalleryPage = () => {
  const { ref, width, height } = useDimensions({
    useBorderBoxSize: true,
  });

  return (
    <Layout>
      <Helmet title={`Photography | ${config.siteTitle}`} />
      <SEO />
      {/* <div ref={ref}>
        {width >= 675 && (
          <Gallery photos={photos} direction={"column"} columns={2} margin={8} />
          )}
        {width < 675 && (
          <Gallery photos={photos} direction={"column"} columns={1} margin={8} />
        )}
      </div> */}
      <DynamicLoadingGallery photos={photos} />
    </Layout>
  );
};

export default GalleryPage;
