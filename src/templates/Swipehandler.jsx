import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigation } from "../contexts/NavigationContext";
import "swiper/css";

const SwipeHandler = ({ children }) => {
  const { location, dispatch } = useNavigation();
  return (
    <Swiper
      style={{
        height: "100%",
        width: "100%",
      }}
      defaultValue={location}
      onSlideChange={(swiper) => {
        dispatch({
          type: swiper.activeIndex,
        });
      }}
      onSwiper={(swiper) => {
        dispatch({
          type: "setSwiper",
          swiper,
        });
      }}
      // Ensure that the elemnt doest not contain .no-swipe
      noSwipingSelector=".no-swipe"
    >
      {children.map((children, i) => (
        <SwiperSlide key={`page-${i}`}>{children}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwipeHandler;
