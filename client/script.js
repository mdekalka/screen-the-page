;(function() {
  document.addEventListener("DOMContentLoaded", function(event) { 
    const button = document.querySelector('.button');
    const input = document.querySelector('.input');
    const error = document.querySelector('.error');
    const spinner = document.querySelector('.loading');
  
    button.addEventListener('click', () => {
      const isValidUrl = validateHttpUrl(input.value);
      
      if (!isValidUrl) {
        error.classList.add('show');
        return;
      }

      const image = await httpRequest(input.value);

    });

    input.addEventListener('input', () => {
      error.classList.remove('show');
    })
  });

  function startLoading() {
    spinner.classList.add('show');
    button.disabled = true;
    input.disabled = true;
  }

  function endLoading() {
    spinner.classList.remove('show');
    button.disabled = false;
    input.disabled = false;
  }

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
      return null;
    }
  }

})();
