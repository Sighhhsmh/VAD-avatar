const inputs = document.querySelectorAll('.pinput');
const selects = document.querySelectorAll('select');
let imageStatus = JSON.parse(localStorage.getItem('imageStatus')) || [];
let imageUrls = JSON.parse(localStorage.getItem('imageUrls')) || [];
let selectValues = JSON.parse(localStorage.getItem('selectValues')) || [];

// Initialize the imageStatus, imageUrls, and selectValues arrays if they don't exist
if (imageStatus.length === 0) {
    for (let i = 0; i < inputs.length; i++) {
        imageStatus.push(null); // Initially, no images are uploaded
        imageUrls.push(null); // Initially, no image URLs are available
        selectValues.push(null); // Initially, no select values are available
    }
}

// Function to add image to different divs based on select value
function addImageToDiv(imgSrc, selectValue, index) {

    if (selectValue === 'foreground') {
        let fgimg = document.getElementById('faceForeground').querySelectorAll('img')[index];
        fgimg.src = imgSrc;
        fgimg.classList.add('draggableDiv');
    } else if (selectValue === 'background') {
        let bgimg = document.getElementById('faceBackground').querySelectorAll('img')[index];
        bgimg.src = imgSrc;
        bgimg.classList.add('draggableDiv');
    }
}


// Function to remove image from foreground or background div
function removeImageFromDiv(selectValue, index) {
    let imgIndex;
    if (selectValue === 'foreground') {
        imgIndex = selectValues.indexOf('foreground');
        if (imgIndex !== -1) {
            let fgimg = document.getElementById('faceForeground').querySelectorAll('img')[index];
            fgimg.src = " ";
            fgimg.classList.remove('draggableDiv');
        }
    } else if (selectValue === 'background') {
        imgIndex = selectValues.indexOf('background');
        if (imgIndex !== -1) {
            let bgimg = document.getElementById('faceBackground').querySelectorAll('img')[index];
            bgimg.src = " ";
            bgimg.classList.remove('draggableDiv');
        }
    }
}

inputs.forEach((input, index) => {  //  Initializing and adding pre-existing images
    const select = selects[index];
    if (imageStatus[index])
    {
        // If image exists in local storage, display it
        const parent = input.parentElement;
        const img = document.createElement('img');
        img.src = imageUrls[index];
        parent.appendChild(img);
        parent.querySelector('.plable').innerText = " ";
        parent.children.item(2).classList.add("hide");
        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.innerText = '-';
        removeBtn.classList.add('remove-btn');

        //  Add remove button on click function
        removeBtn.addEventListener('click', function ()
        {
            removeImageFromDiv(selectValues[index], index);
            img.classList.remove('blurred'); // Remove the blur effect
            parent.removeChild(img);
            parent.querySelector('.plable').innerText = "+";
            parent.children.item(2).classList.remove("hide");
            parent.removeChild(this);
            input.value = ''; // Clear the file input
            imageStatus[index] = false; // Update image status
            imageUrls[index] = null; // Clear image URL
            selectValues[index] = null; // Clear select value
            localStorage.setItem('imageStatus', JSON.stringify(imageStatus)); // Update image status in local storage
            localStorage.setItem('imageUrls', JSON.stringify(imageUrls)); // Update image URLs in local storage
            localStorage.setItem('selectValues', JSON.stringify(selectValues)); // Update select values in local storage
            console.log("Image status:", imageStatus);
            console.log("Image URLs:", imageUrls);
            console.log("Select values:", selectValues);    
        });

        removeBtn.addEventListener('mouseover', function() {
            img.classList.add('blurred'); // Add the blur effect
        });
        removeBtn.addEventListener('mouseout', function() {
            img.classList.remove('blurred'); // Remove the blur effect
        });
        parent.appendChild(removeBtn);
        // Set select value if available
        if (selectValues[index]) {
            select.value = selectValues[index];
        }

        // Call function to add image to div based on select value
        addImageToDiv(imageUrls[index], selectValues[index], index);  //  runs for each index present
    }

    //  add image logic  --------  [when input is triggered] [main UI relavent logic] 
    input.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                const imgSrc = reader.result;
                const img = document.createElement('img');
                img.src = imgSrc;
                img.onload = function() {
                    const parent = input.parentElement;
                    parent.appendChild(img);
                    parent.querySelector('.plable').innerText = " ";
                    parent.children.item(2).classList.add('hide');
                    //  Add remove button
                    const removeBtn = document.createElement('button');
                    removeBtn.innerText = '-';
                    removeBtn.classList.add('remove-btn');
                    
                    
                    //  remove image logic
                    removeBtn.addEventListener('click', function() {
                        // Remove image from other div based on select value
                        removeImageFromDiv(selectValues[index], index);
                        parent.removeChild(img);
                        parent.querySelector('.plable').innerText = "+";
                        parent.children.item(2).classList.remove("hide");
                        parent.removeChild(this);
                        input.value = ''; // Clear the file input
                        img.classList.remove('blurred'); // Remove the blur effect
                        imageStatus[index] = false; // Update image status
                        imageUrls[index] = null; // Clear image URL
                        selectValues[index] = null; // Clear select value
                        localStorage.setItem('imageStatus', JSON.stringify(imageStatus)); // Update image status in local storage
                        localStorage.setItem('imageUrls', JSON.stringify(imageUrls)); // Update image URLs in local storage
                        localStorage.setItem('selectValues', JSON.stringify(selectValues)); // Update select values in local storage
                        console.log("Image status:", imageStatus);
                        console.log("Image URLs:", imageUrls);
                        console.log("Select values:", selectValues);
                        
                    });
                    removeBtn.addEventListener('mouseover', function() {
                        img.classList.add('blurred'); // Add the blur effect
                    });
                    removeBtn.addEventListener('mouseout', function() {
                        img.classList.remove('blurred'); // Remove the blur effect
                    });
                    parent.appendChild(removeBtn);
                    imageStatus[index] = true; // Update image status
                    imageUrls[index] = imgSrc; // Store image URL in local storage
                    selectValues[index] = select.value; // Store select value in local storage
                    localStorage.setItem('imageStatus', JSON.stringify(imageStatus)); // Update image status in local storage
                    localStorage.setItem('imageUrls', JSON.stringify(imageUrls)); // Update image URLs in local storage
                    localStorage.setItem('selectValues', JSON.stringify(selectValues)); // Update select values in local storage
                    console.log("Image status:", imageStatus);
                    console.log("Image URLs:", imageUrls);
                    console.log("Select values:", selectValues);

                    // Call function to add image to div based on select value
                    addImageToDiv(imgSrc, select.value, index);
                };
            };
            reader.readAsDataURL(file);
        }
    });
});
