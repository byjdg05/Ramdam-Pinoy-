const FEED_COUNT = 3;
const STORAGE_KEY = 'hinga-muna-rants';

const getSavedRants = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

const saveRants = rants =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rants));

const createRantEl = text => {
  const p = document.createElement('p');
  p.className = 'rant-item';
  p.textContent = text;
  return p;
};

class RantFeed {
  constructor(feedEl, btn, index) {
    this.feedEl = feedEl;
    this.btn = btn;
    this.indexOffset = index;
    this.page = 0;
    this.attachEvents();
  }

  attachEvents() {
    if (this.btn) {
      this.btn.addEventListener('click', () => this.renderNext());
    }
  }

  rantForCurrentState() {
    const rants = [...getSavedRants()].reverse();
    const overallIdx = this.indexOffset + this.page * FEED_COUNT;
    return overallIdx < rants.length ? rants[overallIdx] : null;
  }

  renderNext() {
    const rant = this.rantForCurrentState();
    this.feedEl.innerHTML = '';
    if (rant) {
      this.feedEl.appendChild(createRantEl(rant.text));
      this.page += 1;
    }
    if (!this.rantForCurrentState()) {
      this.btn.disabled = true;
      this.btn.textContent = 'No more';
    }
  }

  reset() {
    this.page = 0;
    this.btn.disabled = false;
    this.btn.textContent = 'Load More';
    this.renderNext();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('rantTextarea');
  const submitBtn = document.getElementById('rantSubmit');

  const feeds = [
    new RantFeed(
      document.getElementById('feed-one'),
      document.getElementById('load-one'),
      0
    ),
    new RantFeed(
      document.getElementById('feed-two'),
      document.getElementById('load-two'),
      1
    ),
    new RantFeed(
      document.getElementById('feed-three'),
      document.getElementById('load-three'),
      2
    )
  ];

  feeds.forEach(f => f.renderNext());

  submitBtn.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text) {
      alert('Please type something before submitting 🙂');
      return;
    }
    const rants = getSavedRants();
    rants.push({ text, time: Date.now() });
    saveRants(rants);
    textarea.value = '';
    feeds.forEach(f => f.reset());
  });

  document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('nav button')
        .forEach(b => b.classList.remove('highlight'));
      btn.classList.add('highlight');
      const target = document.getElementById(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
