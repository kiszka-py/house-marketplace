import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.config";

function Slider() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      const listings = [];

      querySnap.forEach((doc) =>
        listings.push({
          id: doc.id,
          data: doc.data(),
        })
      );
      setListings(listings);
      setLoading(false);
    }

    fetchListings();
  }, []);

  if (loading) return <Spinner />;

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>
        <swiper-container
          slides-per-view="1"
          //   navigation="true"
          pagination="true"
          loop="true"
          autoplay="true"
        >
          {listings.map(({ data, id }) => {
            return (
              <swiper-slide
                key={id}
                onClick={() => {
                  navigate(`/category/${data.type}/${id}`);
                }}
              >
                {" "}
                <div
                  style={{
                    background: `url(${data.imgUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                    padding: "150px",
                  }}
                  className="swipeSlideDiv"
                >
                  <p className="swiperSlideText">{data.name}</p>
                  <p className="swiperSlidePrice">
                    ${data.discountedPrice ?? data.regularPrice}{" "}
                    {data.type === "rent" && "/ month"}
                  </p>
                </div>
                {/* <img src={data.imgUrls[0]} className="swiperSlideDiv" /> */}
              </swiper-slide>
            );
          })}
        </swiper-container>
      </>
    )
  );
}

export default Slider;
