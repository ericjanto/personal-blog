import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import config from '../utils/config'
import photos from '../data/photos'
import DynamicLoadingGallery from '../components/DynamicLoadingGallery'


const GalleryPage = () => {
  return (
    <Layout>
      <Helmet title={`Photography | ${config.siteTitle}`} />
      <SEO />
      {/* TODO: Add progressive image loading */}
      <DynamicLoadingGallery photos={photos} />
    </Layout>
  );
};

export default GalleryPage;
