const host = process.env.BACKEND_HOST;

import CONSTANTS from '../../constants/index.json';

export class Payment {
  constructor(container) {
    this.form = container;
    this.submitButton = this.form.querySelector("button[type='submit']");
    this.errorContainer = this.form.querySelector('.js-payment-form-error');
    this.isValid = false;

    this.data = {
      name: '',
      email: '',
      agreement: false,
    };

    this.bindEvents();
  }

  bindEvents() {
    this.form.addEventListener('input', (event) => {
      const name = event.target.name;
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

      this.data = {
        ...this.data,
        [name]: value,
      };

      this.checkValidationForm();
    });

    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitForm();
    });
  }

  checkValidationForm() {
    this.isValid = Boolean(this.data.name) && Boolean(this.data.email) && Boolean(this.data.agreement);

    if (this.isValid) {
      this.submitButton.removeAttribute('disabled');
    } else {
      this.submitButton.setAttribute('disabled', true);
    }
  }

  async submitForm() {
    if (!this.isValid) {
      return false;
    }

    try {
      this.submitButton.classList.add('is-loading');

      const body = {
        ...this.data,
        value: CONSTANTS.price,
        returnUrl: CONSTANTS.returnUrl,
      };

      const response = await fetch(`${host}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      if (data?.paymentLink) {
        window.location.href = data.paymentLink;
      }
    } catch (err) {
      this.errorContainer.classList.add('is-visible');
      this.submitButton.classList.add('is-hidden');
    } finally {
      this.submitButton.classList.remove('is-loading');
    }
  }
}
