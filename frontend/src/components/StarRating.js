import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  //   const onSubmit = (data) => console.log(data);
  const [rating, setRating] = useState(null); 
  const [hover, setHover] = useState(null);
  console.log(rating)
  return (
    <div className="d-flex justify-content-center starDiv m-3 ">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i+1 ;
        return (
          <form>
            <label>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />

              <FaStar
                className="star"
                color={
                  ratingValue <= (hover || rating) ? " #ffc107" : "#e4e5e9"
                }
                size={40}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          </form> 
        );
      })}
    </div>
  );
};

export default StarRating;
