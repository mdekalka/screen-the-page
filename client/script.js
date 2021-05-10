;(function() {
  document.addEventListener("DOMContentLoaded", function(event) { 
    const button = document.querySelector('.button');
    const input = document.querySelector('.input');
    const error = document.querySelector('.error');
    const spinner = document.querySelector('.loading');
    const image = document.querySelector('.image');
  
    button.addEventListener('click', async () => {
      const isValidUrl = validateHttpUrl(input.value);
      
      if (!isValidUrl) {
        error.classList.add('show');
        return;
      }

      try {
        startLoading();

        const parsedImage = await loadImage(input.value);
        image.src = parsedImage;
      } catch (e) {
        error.textContent = 'Image failed to load, please try again.'
      }

      endLoading();
    });

    input.addEventListener('input', () => {
      error.classList.remove('show');
    });

    function startLoading() {
      spinner.classList.add('show');
      button.disabled = true;
      input.disabled = true;
      image.src = '';
    }
  
    function endLoading() {
      spinner.classList.remove('show');
      button.disabled = false;
      input.disabled = false;
      input.value = '';
    }
  });

  function validateHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (e) {
      console.log('validate url error message:', e.message);
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

  async function loadImage(urlParam) {
    const params = new URLSearchParams({ url: urlParam });

    try {
      const response = await fetch(`http://localhost:3002/screenshot?${params}`);
      const data = await response.blob();

      image = URL.createObjectURL(data);

      return image;
    } catch (e) {
      console.log('load image failed:', e.message)
      throw new Error(e.message);
    }
  }
})();
