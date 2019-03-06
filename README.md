# Texas Cuisine Website

This is a website for a local restaurant. It is built with Vuejs on the frontend and Nodejs on the backend. It is a progressive webapp with a score
of 100 for progressive web app when analyzed with Google light house. 
The other scores are:
- Performance - 100;
- Progressive Web App - 100
- Accessibily - 83
- Best Practices - 100
- S E O - 80.
![Texas Cuisine](https://res.cloudinary.com/toshoajibade/image/upload/v1543415658/Screenshot_43.png)

## Functionalities
- The app works offline because all images are stored in the cache and the information for individual products are stored on IndexedDb so information
that have been previously previewed can be assessed offline.
- The admin can add and delete users
- Webpack code splitting is used so only sites that are needed are loaded
- Users can log into the site with their credentials
- The admin can add, delete and edit products.
- The admin can pause and activate products, only active products are visible on to customers on the site.
- The admin can update product images and price (images are stored on cloudinary and their url is stored in the data base)
- Users and admin can view orders and update orders as shipped, deliverd, failed or cancelled. The default state for all orders is pending
- The admin can print invoice of orders, the invoice is generated on the backend and sent back to the frontend, the decision to offload invoice
generation to backend was due to the heavy size of the invoice generation package (pdfmake) which significantly adds to the bundle size thereby
affecting performance.
- The site is built with plain html and css (scss)

## Other information
- This frontend is hosted on Netlify.
- The back end is hosted on Heroku.

## Login(This is a demo project and you can login with the following details)
-toshoajibade@gmail.com
-password: 1234567
 
