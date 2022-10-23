import { Review } from "types";

interface Props {
  review: Review;
}

const ReviewCard = ({ review }: Props) => {
  const { user, images, title, body, grade, create_time } = review;

  return (
    <div>
      <div></div>
    </div>
  );
};

export default ReviewCard;
