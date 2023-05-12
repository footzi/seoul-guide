import confirmationSuccessTemplate from './success/index.pug';

export class Confirmation {
  constructor(container) {
    this.contentBlock = container.querySelector('.js-confirmation-content');
    this.infoBlock = container.querySelector('.js-confirmation-info');
    this.errorBlock = container.querySelector('.js-confirmation-error');
    this.id = new URLSearchParams(window.location.search).get('id');

    this.init();
  }

  async init() {
    if (!this.id) {
      return;
    }

    try {
      const response = await fetch('/checkStatus', {
        method: 'GET',
        params: { id: this.id },
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      if (data.status === 'OK') {
        this.contentBlock.innerHTML = confirmationSuccessTemplate();
        this.infoBlock.classList.add('is-hidden');
      } else {
        throw new Error();
      }
    } catch (error) {
      this.contentBlock.classList.add('is-hidden');
      this.infoBlock.classList.add('is-hidden');
      this.errorBlock.classList.add('is-visible');
    }
  }
}
