import confirmationSuccessTemplate from './success/index.pug';

const host = process.env.BACKEND_HOST;

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
      const response = await fetch(`${host}/checkStatus?id=${this.id}`);

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      if (data.success) {
        const link = process.env.GUIDE_LINK;

        this.contentBlock.innerHTML = confirmationSuccessTemplate({ link });
        this.infoBlock.classList.add('is-hidden');

        this.statisticDownload();
      } else {
        throw new Error();
      }
    } catch (error) {
      this.contentBlock.classList.add('is-hidden');
      this.infoBlock.classList.add('is-hidden');
      this.errorBlock.classList.add('is-visible');
    }
  }

  statisticDownload() {
    const link = document.querySelector('.js-confirmation-file-link');

    if (!link) {
      return;
    }

    link.addEventListener('click', async () => {
      await fetch(`${host}/statistic-downloads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: this.id }),
      });
    });
  }
}
