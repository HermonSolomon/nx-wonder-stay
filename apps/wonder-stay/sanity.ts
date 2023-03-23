import { suspend } from 'suspend-react';
import { _checkAuth } from '@sanity/preview-kit';
import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';

export const config = {
  /**
   * Find project ID and dataset in sanity.config.ts
   * These are considered 'public', but you can use env variables
   * If you want differ b/n local dev and production
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   */
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2022-02-12',
  /**
   * Set useCdn to 'false' if the application require the freshest possible
   * data always (potentially slightly slower and bit more expensive).
   * Authenticated request (like preview will always bypass the CDM)
   */

  useCdn: process.env.NODE_ENV === 'production',

  /** createCurrentUserHook is deprecated thus we've default to use the "_checkAuth" from '@sanity/preview-kit'  */
  useCheckAuth: () => {
    suspend(
      () => _checkAuth(config.projectId, null),
      ['@sanity/preview-kit', 'checkAuth', config.projectId]
    );
  },
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const useCheckAuth = config.useCheckAuth;
