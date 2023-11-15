document.addEventListener('DOMContentLoaded', () => {
    console.log('Gallery JS is loaded');

    // Define images array
    const images = [
        { srcSmall: 'images/flowers-pink-small.jpg', srcLarge: 'images/flowers-pink-large.jpg', alt: 'Dahlias in the summer ' },
        { srcSmall: 'images/flowers-purple-small.jpg', srcLarge: 'images/flowers-purple-large.jpg', alt: 'Lavender in lavenderfield' },
        { srcSmall: 'images/flowers-red-small.jpg', srcLarge: 'images/flowers-red-large.jpg', alt: 'Poppy, In Flanders Field' },
        { srcSmall: 'images/flowers-white-small.jpg', srcLarge: 'images/flowers-white-large.jpg', alt: 'Sentmaring Park, Münster' },
        { srcSmall: 'images/flowers-yellow-small.jpg', srcLarge: 'images/flowers-yellow-large.jpg', alt: 'Sunflowers in the hamlet Dernekamp' },
    ];

    // Function to build the thumbnail list
    function buildThumbnails(imageArray) {
        const ul = document.querySelector('#gallery ul');
        ul.innerHTML = ''; // Clear existing content

        imageArray.forEach((image, index) => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = image.srcSmall;
            img.alt = image.alt;
            img.width = 240;
            img.height = 160;
            img.dataset.largeVersion = image.srcLarge; // Store the large version in a data attribute
            img.classList.add(index === 0 ? 'active' : 'inactive'); // First image is active, others are inactive
            li.appendChild(img);
            ul.appendChild(li);
        });
    }

    // Call the function to build thumbnails
    buildThumbnails(images);

    // Function to change the background color
    function changeBackgroundColor(imageElement) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imageElement.naturalWidth;
        canvas.height = imageElement.naturalHeight;

        context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let r = 0, g = 0, b = 0;

        for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
        }

        r = Math.floor(r / (data.length / 4));
        g = Math.floor(g / (data.length / 4));
        b = Math.floor(b / (data.length / 4));

        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    // Update event listeners for thumbnail clicks
    const featuredImage = document.querySelector('#gallery figure img');
    const imageCaption = document.querySelector('#gallery figure figcaption');

    document.querySelector('#gallery ul').addEventListener('click', function(event) {
        const clickedItem = event.target;
        if (clickedItem.tagName === 'IMG') {
            // Update the featured image
            featuredImage.onload = () => {
                changeBackgroundColor(featuredImage); // Change the background color
                updateActiveThumbnail(clickedItem); // Update the active thumbnail
            };
            featuredImage.src = clickedItem.dataset.largeVersion;
            imageCaption.textContent = clickedItem.alt;

            // Update thumbnails to reflect the active state
            document.querySelectorAll('#gallery ul li img').forEach(img => {
                img.classList.remove('active');
                img.classList.add('inactive');
            });
            clickedItem.classList.add('active');
            clickedItem.classList.remove('inactive');
        }
    });

    // Initialize the gallery with the first image
    const firstImage = images[0];
    featuredImage.src = firstImage.srcLarge;
    imageCaption.textContent = firstImage.alt;
    featuredImage.onload = () => changeBackgroundColor(featuredImage);
    updateActiveThumbnail(document.querySelector('#gallery ul li img'));
});
