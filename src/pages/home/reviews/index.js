import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/less';
import 'swiper/less/navigation';

export class ReviewsSlider {
  constructor() {
    this.init();
  }

  init() {
    new Swiper('.js-reviews', {
      slidesPerView: 1,
      spaceBetween: 12,
      grabCursor: true,
      modules: [Navigation],
      breakpoints: {
        640: {
          slidesPerView: 1.5,
        },
        1200: {
          slidesPerView: 2.5,
        },
      },
      navigation: {
        nextEl: '.js-reviews__button-next',
        prevEl: '.js-reviews__button-prev',
      },
    });
  }
}
