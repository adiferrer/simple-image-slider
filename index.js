import './styles.css';

function nextImage() {
  const activeSlide = document.querySelector('.active');
  activeSlide.classList.remove('active');
  const currentDot = document.querySelector('.dot.active');
  currentDot.classList.remove('active');
  let nextSlide = activeSlide.nextElementSibling;
  let nextDot = currentDot.nextElementSibling;

  if (!nextSlide && !nextDot) {
    nextSlide = document.querySelector('.slide:first-of-type');
    nextDot = document.querySelector('.dot:first-of-type');
  }

  nextSlide.classList.add('active');
  nextDot.classList.add('active');
}

function prevImage() {
  const activeSlide = document.querySelector('.active');
  activeSlide.classList.remove('active');
  let prevSlide = activeSlide.previousElementSibling;
  if (!prevSlide) {
    prevSlide = document.querySelector('.slide:last-of-type');
  }

  prevSlide.classList.add('active');
}

function renderImageSlider(images) {
  let interval = setInterval(nextImage, 6000);
  const imageFrame = document.createElement('div');
  imageFrame.classList.add('image-frame');
  const imageSlider = document.createElement('div');
  imageSlider.classList.add('image-slider');
  images.forEach((image) => {
    const figure = document.createElement('figure');
    figure.classList.add('slide');
    if (image === images[0]) {
      figure.classList.add('active');
    }
    const img = new Image();
    img.src = image;
    figure.appendChild(img);

    imageSlider.appendChild(figure);
  });
  imageFrame.appendChild(imageSlider);

  const prevButton = document.createElement('button');
  prevButton.classList.add('slider-button');
  prevButton.setAttribute('id', 'prev');
  prevButton.textContent = '<';
  prevButton.addEventListener('click', () => {
    clearInterval(interval);
    prevImage();
    interval = setInterval(nextImage, 6000);
  });
  const nextButton = document.createElement('button');
  nextButton.classList.add('slider-button');
  nextButton.setAttribute('id', 'next');
  nextButton.textContent = '>';
  nextButton.addEventListener('click', () => {
    clearInterval(interval);
    nextImage();
    interval = setInterval(nextImage, 6000);
  });
  imageFrame.appendChild(prevButton);
  imageFrame.appendChild(nextButton);

  const dots = document.createElement('div');
  dots.classList.add('dots');
  images.forEach((image) => {
    const dot = document.createElement('span');
    if (image === images[0]) {
      dot.classList.add('active');
    }
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      const activeSlide = document.querySelector('.active');
      activeSlide.classList.remove('active');
      const currentDot = document.querySelector('.dot.active');
      currentDot.classList.remove('active');
      dot.classList.add('active');
      const slide = document.querySelector(`img[src="${image}"]`).parentElement;
      slide.classList.add('active');
    });
    dots.appendChild(dot);
  });
  imageFrame.appendChild(dots);

  return imageFrame;
}

export default renderImageSlider;
