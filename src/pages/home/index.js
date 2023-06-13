const host = process.env.BACKEND_HOST;

export class PreviewDownload {
  constructor(links) {
    this.links = links;

    this.bindEvents();
  }

  bindEvents() {
    this.links.forEach((link) => {
      link.addEventListener('click', () => {
        this.send();
      });
    });
  }

  async send() {
    await fetch(`${host}/statistic-preview-downloads`, {
      method: 'POST',
    });
  }
}
