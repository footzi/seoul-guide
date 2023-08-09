import './styles';
import { MobileMenu } from './components/mobile-menu';
import { Cookies } from './components/cookies';
import { Payment } from './pages/payment';
import { Confirmation } from './pages/confirmation';
import { ReviewsSlider } from './pages/home/reviews';
// import { PreviewDownload } from './pages/home';

new MobileMenu();
new Cookies();
new ReviewsSlider();

const paymentContainer = document.querySelector('.js-payment-form');
const confirmationContainer = document.querySelector('.js-confirmation');

// const previewDownloadLinks = Array.from(document.querySelectorAll('.js-preview-download'));

if (paymentContainer) {
  new Payment(paymentContainer);
}

if (confirmationContainer) {
  new Confirmation(confirmationContainer);
}

// if (previewDownloadLinks.length) {
//   new PreviewDownload(previewDownloadLinks);
// }
