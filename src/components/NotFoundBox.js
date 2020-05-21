import React from 'react';
import {Link} from 'gatsby';
import '../styles/components/not-found-box.scss';

// eslint-disable-next-line import/prefer-default-export
export const NotFoundBox = () => (
  <div className="not-found">
    <h1
      className="not-found__title"
    >
      404<span className="blink">|</span>
    </h1>
    <h2
      className="not-found__subtitle"
    >
      The page you&apos;re looking for doesn&apos;t exist.
    </h2>
    <Link
      to="/"
      className="not-found__link"
    >
      Take me back &rarr;
    </Link>
  </div>
);