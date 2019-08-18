class Carousel {
  indicatorListeners = []
  constructor() {
    this.carouselContainer = document.querySelector('.carousel-container');
    this.carouselElements = Array.from(this.carouselContainer.querySelectorAll('.carousel-slide'));
    this.containerWidth = this.carouselContainer.getBoundingClientRect().width;
    this.carouselContent = this.carouselContainer.querySelector('.carousel-content');
    this.activeElement = 0;
    this.setContentWidth();
    this.goToElement(this.activeElement);
    this.addIndicatorEvents();
    this.setLeftRightNavigation();
    this.addKeyboardEvents();
    this.addResizeEventHandler();
    this.removeResizeEventHandler();
  }
  setContentWidth() {
    this.carouselElements.forEach((el) => {
      el.style.flexBasis = `${this.containerWidth}px`;
    })
  }
  goToElement(position) {
    this.carouselContent.style.transform = `translateX(${position * this.containerWidth * -1}px)`;
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
  windowResized = () => {
    this.containerWidth = this.carouselContainer.getBoundingClientRect().width;
    this.setContentWidth();
    this.goToElement(this.activeElement);    
  }
  addResizeEventHandler() {
    window.addEventListener('resize', this.windowResized);
  }
  removeResizeEventHandler() {
    window.addEventListener('resize', this.windowResized);
  }
}

var carousel;

window.addEventListener('DOMContentLoaded', () => {
  carousel = new Carousel();
});
