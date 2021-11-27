import React from 'react';
import { Link } from 'react-router-dom';
import '../NotFoundPage/NotFoundPage.css';

const NotFoundPage = () => (
  <div className="not-found-page-container">
    <div className="sad-face"></div>
    <h1>404 - Page Not Found</h1>
    <h4>Ops, looks like this page is broken or doesn't exist anymore! We can't be sure what went wrong and whose fault it was for all this to happen.</h4>
    <Link className="not-found-link" to="/">
        <ion-icon name="arrow-undo-outline"></ion-icon> Go Home
    </Link>
  </div>
);

export default NotFoundPage;