
import { Navigation, Pagination, A11y,Autoplay } from 'swiper/modules';
import { useTransition, animated } from 'react-spring';
import { useState ,useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { loginImgOption } from '../utils/options';

const LoginSwiper= () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const fadeTransition = useTransition(activeSlideIndex, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: (item, index) => ({
      duration: 500,
      delay: index === activeSlideIndex ? 0 : 500 // Adjust the delay timing as per your preference
    })
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideIndex((prevIndex) => (prevIndex + 1) % loginImgOption.length);
    }, 3000); // Adjust the interval timing as per your preference

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h-screen '>
        <Swiper
      
      modules={[Navigation, Pagination,Autoplay, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}

    >
      {fadeTransition((style, slideIndex) => (
      <SwiperSlide key={slideIndex}>
        <animated.img
          className='h-screen w-full rounded-l-[1rem]'
          src={loginImgOption[slideIndex].src}
          alt=''
          style={style}
        />
      </SwiperSlide>
    ))}
     
    </Swiper>
    </div>
  );
};

export default LoginSwiper