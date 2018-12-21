'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMG_WIDTH = 70;
  var IMG_HEIGTH = 70;
  var BORDER_RADIUS = 5;

  var previewAvatar = document.querySelector('.ad-form-header__preview');
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewHousing = document.querySelector('.ad-form__photo');
  var fileChooserHousing = document.querySelector('.ad-form__upload input[type=file]')

  function chooseFile (fileChooser, preview) {

  fileChooser.addEventListener('change', fileChooseHandler)
    
    function fileChooseHandler() {
      for (var i = 0; i < fileChooser.files.length; ++i) {
        var file = fileChooser.files[i];
        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });
        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', photoLoadHandler);

          function photoLoadHandler(event) {
            if (fileChooser.multiple) {
              createImageContainer(createImage(event.target.result, 'Фотография жилья'));
            } else {
              createImage(event.target.result, 'Аватар пользователя');
            }
          }
          reader.readAsDataURL(file);
        }
      }

      function createImage(url, alt) {
        preview.innerHTML = '';
        var imgTag = document.createElement('img');
        imgTag.src = url;
        imgTag.alt = alt;
        imgTag.classList.add('ad-form__photo-img');
        imgTag.style.width = IMG_WIDTH + 'px';
        imgTag.style.height = IMG_HEIGTH + 'px';
        imgTag.style.borderRadius = BORDER_RADIUS + 'px';
        preview.appendChild(imgTag);
        return imgTag;
      }
    };
  }

  function createImageContainer(image) {
    var imgContainer = document.createElement('div');
    imgContainer.classList.add('ad-form__photo');
    imgContainer.appendChild(image);
    document.querySelector('.ad-form__photo-container').appendChild(imgContainer);
    return imgContainer;
  }

  chooseFile(fileChooserAvatar, previewAvatar);
  chooseFile(fileChooserHousing, previewHousing);

  /*function deactivateFileChooser() {
    fileChooser.removeEventListener('change', fileChooseHandler);
    reader.removeEventListener('load', photoLoadHandler);
  }*/

  window.photos ={
    deActivate: deactivateFileChooser(),
  }

})();

