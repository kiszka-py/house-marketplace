import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import shareIcon from "../assets/svg/shareIcon.svg";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const params = useParams();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) return <Spinner />;

  return (
    <main>
      {/* SWIPER */}

      <swiper-container slides-per-view="1" navigation="true" pagination="true">
        {listing.imgUrls.map((img, index) => {
          return (
            <swiper-slide key={index}>
              {/* <div
                className="swiperSlideDiv"
                style={{
                  background: `url(${listing.imgUrls[index]})`,
                  backgroundSize: "cover",
                }}
              ></div> */}
              <img
                src={img}
                alt={`image ${index}`}
                className="swiperSlideDiv"
              />
            </swiper-slide>
          );
        })}
      </swiper-container>

      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="" />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === "rent" ? "Rent" : "Sale"}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : "1 Bathroom"}
          </li>
          <li>{listing.parking && "Parking Spot"}</li>
          <li>{listing.furnished && "Furnished"}</li>
        </ul>

        <p className="listingLocationTitle">Location</p>

        {/* MAP */}
        <div className="leafletContainer">
          <MapContainer
            center={[
              `${listing.geolocation.lat}`,
              `${listing.geolocation.lng}`,
            ]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                `${listing.geolocation.lat}`,
                `${listing.geolocation.lng}`,
              ]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className="primaryButton"
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;
