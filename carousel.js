class Carousel {
  indicatorListeners = []
  constructor() {
    this.carouselContainer = document.querySelector('.carousel-container');
    this.carouselElements = Array.from(this.carouselContainer.querySelectorAll('.carousel-slide'));
    this.activeElement = 0;
    this.goToElement(this.activeElement);
    this.setContentHeight();
    this.addIndicatorEvents();
    this.setLeftRightNavigation();
    this.addKeyboardEvents();
  }
  findMaxHeight(elements) {
    let maxHeight = 0;
    maxHeight = elements.reduce((acc, current) => {
      let height = current.getBoundingClientRect().height;
      if (acc < height) {
        acc = height
      }
      return acc;
    }, 0);
    return maxHeight;
  }
  setContentHeight() {
    let carouselContent = this.carouselContainer.querySelector('.carousel-content');
    let height = this.findMaxHeight(this.carouselElements);
    carouselContent.style.height = `${height}px`;
  }
  goToElement(position) {
    this.carouselElements.forEach((element, index) => {
      element.style.transform = `translateX(${(index - position) * 100}%)`;
    });
    this.activeElement = position;
  }
  addIndicatorEvents() {
    this.carouselIndicators = Array.from(this.carouselContainer.querySelectorAll('.carousel-indicators'));
    this.carouselIndicators.forEach((indicator, index) => {
      let cb = () => {
        this.goToElement(index);
      }
      this.indicatorListeners.push(cb);
      indicator.addEventListener('click', cb);
    });
  }
  removeCarouselIndicatorEvents() {
    this.carouselIndicators.forEach((indicator, index) => {
      indicator.removeEventListener('click', this.indicatorListeners[index]);
    })
  }
  goToPrev = () => {
    let activeElement = this.activeElement;
    let length = this.carouselElements.length;
    this.goToElement((activeElement + length - 1) % length);
  }
  goToNext = () => {
    let activeElement = this.activeElement;
    let length = this.carouselElements.length;
    this.goToElement((activeElement + 1) % length);
  }
  keydownHandler = ({ keyCode }) => {
    if (keyCode === 37) {
      // Left key
      this.goToPrev();
    } else if (keyCode === 39) {
      // Right key
      this.goToNext();
    }
  }
  addKeyboardEvents() {
    this.carouselContainer.addEventListener('keydown', this.keydownHandler);
  }
  removeKeyBoardEvents() {
    this.carouselContainer.removeEventListener('keydown', this.keydownHandler);
  }
  setLeftRightNavigation() {
    let prev = document.querySelector('.carousel-prev');
    let next = document.querySelector('.carousel-next');
    prev.addEventListener('click', this.goToPrev);
    next.addEventListener('click', this.goToNext);
  }
  removeLeftRightNavigation() {
    let prev = document.querySelector('.carousel-prev');
    let next = document.querySelector('.carousel-next');
    prev.removeEventListener('click', this.goToPrev);
    next.removeEventListener('click', this.goToNext);
  }
  removeEventListeners() {
    this.removeCarouselIndicatorEvents()
    this.removeKeyBoardEvents()
    this.removeLeftRightNavigation()
  }
}

var carousel;

window.addEventListener('DOMContentLoaded', () => {
  carousel = new Carousel();
});
