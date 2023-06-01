import React from "react";
import { Link } from "react-router-dom";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";

function ListingItem({ listing, id, onDelete }) {
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">
            ${listing.offer ? listing.discountedPrice : listing.reguralPrice}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="" />
            <p className="categoryListingInfoText">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} bedrooms`
                : `1 bedroom`}
            </p>
            <img src={bathtubIcon} alt="" />
            <p className="categoryListingInfoText">
              {listing.bathroom > 1
                ? `${listing.bathroom} bathrooms`
                : `1 bathroom`}
            </p>
          </div>
        </div>
      </Link>

      {onDelete && (
        <DeleteIcon
          className="removeIcon"
          fill="rgb(231,76 ,69)"
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}
    </li>
  );
}

export default ListingItem;
