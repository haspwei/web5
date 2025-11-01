function Swap(){

    const item2Img = document.querySelector('.item2 img');
    const item6Img = document.querySelector('.item6 img');

    if(item2Img && item6Img){
        const tempSrc = item2Img.src;
        const tempAlt = item2Img.alt;

        const tempSrc6 = item6Img.src;
        const tempAlt6 = item6Img.alt;
        const tempUsemap6 = item6Img.getAttribute('usemap');

        item2Img.src = tempSrc6;
        item2Img.alt = tempAlt6;

        item6Img.src = tempSrc;
        item6Img.alt = tempAlt;

        if(tempUsemap6){
            item2Img.setAttribute('usemap', tempUsemap6);
            item6Img.removeAttribute('usemap');
        }
   }
}

function RhombusArea(){
    const d1 = 10;
    const d2 = 8;
    const area = (d1 * d2) / 2;

    const item5 = document.querySelector('.item5');
    const result = document.createElement('p');
    result.textContent = `Area of Rhombus with diagonals ${d1} and ${d2}: ${area}`;
    result.style.backgroundColor = 'rgba(12, 12, 46, 1)';
    result.style.padding = '10px';
    item5.appendChild(result);
}

function MinMax(){
    const cookiesData = GetCookies('minMaxData');

    if(cookiesData){
        const answer = confirm(`Saved data found. ${cookiesData}. Do you want to delete it?`);
        if(answer){
            DeleteCookies();
            location.reload();
        }else{
            alert(`Cookies retained. Refresh the page to input new data.`);
        }
        return;
    }

    const item5 = document.querySelector('.item5');
    const form = document.createElement('form');
    form.id = 'minMaxForm';
    form.innerHTML = `
        <h3> Input 10 Numbers to find Min and Max </h3>
        ${Array.from({length: 10}, (_, i) => `<input type="number" name="num${i+1}" placeholder="Number ${i+1}" required>`
        ).join('<br>')}
        <br><button type="submit" style="margin-top:10px; padding: 10px 20px; cursor:pointer;">Calculate</button>
        `;
        
        form.onsubmit = function(e){
            e.preventDefault();
            const numbers = [];
            for(let i = 1; i <= 10; i++){
                numbers.push(parseFloat(this[`num${i}`].value));
            }  
            const min = Math.min(...numbers);
            const max = Math.max(...numbers);
            const result = `Min: ${min}, Max: ${max}`;

            SaveCookies(result);
            alert(`Results saved in cookies. ${result}`);
            this.remove();
        };

        item5.appendChild(form);
}

function SaveCookies(data){
    const d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000)); 
    let expires = "expires="+ d.toUTCString();
    document.cookie = "minMaxData=" + encodeURIComponent(data) + ";" + expires + ";path=/";
}

function DeleteCookies(){
    document.cookie = "minMaxData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function GetCookies(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }  
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

function ChangeColor() {

  const savedColor = localStorage.getItem('borderColor');
  if (savedColor) {
    ApplyBorderColor(savedColor);
  }
  
  const item5 = document.querySelector('.item5');
  const colorDiv = document.createElement('div');
  colorDiv.style.backgroundColor = 'rgba(64, 96, 119, 0.6)';
  colorDiv.style.padding = '15px';
  colorDiv.style.margin = '20px';
  colorDiv.style.borderRadius = '5px';
  colorDiv.innerHTML = `
    <h3>Change Border Color (click in the field below):</h3>
    <input type="text" id="colorInputField" placeholder="Click here to change color" 
           style="width: 80%; padding: 10px; margin: 5px; font-size: 16px; cursor: pointer;">
    <p style="font-size: 14px; margin: 5px;">Current color: <span id="currentColor">${savedColor || 'default'}</span></p>
  `;
  item5.appendChild(colorDiv);
  
  const colorInput = document.getElementById('colorInputField');
  colorInput.addEventListener('focus', function() {
    const color = prompt('Enter border color (e.g., red, #ff0000, rgb(255,0,0)):', localStorage.getItem('borderColor') || '');
    
    if (color && color.trim() !== '') {

      if (IsValidColor(color)) {
        localStorage.setItem('borderColor', color);
        ApplyBorderColor(color);
        document.getElementById('currentColor').textContent = color;
        this.value = color;
        alert(`Border color saved: ${color}`);
      } else {
        alert('Invalid color! Please enter a valid color (e.g., red, #ff0000, rgb(255,0,0))');
      }
    }

    this.blur();
  });
}

function IsValidColor(color) {
  const testElement = document.createElement('div');
  testElement.style.color = color;
  return testElement.style.color !== '';
}

function ApplyBorderColor(color) {
  const blocks = ['.navbar', '.item2', '.item3', '.item4', '.item5', '.item6'];
  blocks.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.border = `5px solid ${color}`;
    }
  });
}

function AddImg(){
    const item6Text = document.querySelector('.item6 h1');

    item6Text.addEventListener('mouseup', function(){
        const selection = window.getSelection().toString();
        if(selection.length > 0){
            CreateImageForm();
        }
    });

    item6Text.addEventListener('touchend', function(){
        setTimeout(() => {
            const selection = window.getSelection().toString();
            if(selection.length > 0){
                CreateImageForm();
            }
        }, 300);
    });

    loadImagesFromStorage();
}

function CreateImageForm() {
  if (document.getElementById('imageForm')) return;
  
  const item5 = document.querySelector('.item5');
  const form = document.createElement('div');
  form.id = 'imageForm';
  form.style.backgroundColor = 'rgba(70, 119, 86, 0.6)';
  form.style.padding = '15px';
  form.style.margin = '20px';
  form.style.borderRadius = '5px';
  form.innerHTML = `
    <h3>Add Image:</h3>
    <input type="text" id="imageUrl" placeholder="Image URL" style="width: 80%; padding: 8px; margin: 5px; font-size: 16px;">
    <br>
    <button onclick="SaveImage()" style="margin: 5px; padding: 10px 20px; font-size: 16px; cursor: pointer;">Add Image</button>
    <button onclick="ClearAllImages()" style="margin: 5px; padding: 10px 20px; font-size: 16px; cursor: pointer; background-color: #1b4453ff; color: white;">Delete All Images</button>
  `;
  
  item5.appendChild(form);
}

function SaveImage() {
  const url = document.getElementById('imageUrl').value.trim();
  
  if (!url) {
    alert('Enter image URL!');
    return;
  }
  
  if (!url.match(/^https?:\/\/.+/i)) {
    alert('URL must start with http:// or https://');
    return;
  }
  const testImg = new Image();
  
  testImg.onload = function() {
    let images = JSON.parse(localStorage.getItem('userImages') || '[]');
    images.push(url);
    localStorage.setItem('userImages', JSON.stringify(images));
    AddImageToBlock(url);
    document.getElementById('imageUrl').value = '';
    alert('Image successfully added!');
  };
  
  testImg.onerror = function() {
    alert('Failed to load image from this URL!');
  };
  
  testImg.src = url;
}

function AddImageToBlock(url) {
  const navbar = document.querySelector('.navbar');
  const img = document.createElement('img');
  img.src = url;
  img.className = 'user-added-image';
  img.style.maxWidth = '200px';
  img.style.margin = '10px';
  img.style.display = 'block';
  img.style.borderRadius = '5px';
  navbar.appendChild(img);
}

function ClearAllImages() {
  localStorage.removeItem('userImages');
  const images = document.querySelectorAll('.user-added-image');
  images.forEach(img => img.remove());
  alert('All images deleted!');
}

function loadImagesFromStorage() {
  const images = JSON.parse(localStorage.getItem('userImages') || '[]');
  images.forEach(url => AddImageToBlock(url));
}

window.onload = function() {
  Swap();
  RhombusArea();
  MinMax();
  ChangeColor();
  AddImg();
};