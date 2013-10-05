window.onload = function() {

        var gallery = document.createElement('div');
        for (var i = 0; i < images.length; i++) {
                var image = images[i];

                var img = document.createElement('img');
                gallery.appendChild(img);


                img.src = image.url;
                img.width = image.width;
                img.height = image.height;

                img.style.position = 'absolute';
                img.style.top = '10px';
                img.style.left = '20px';
                // img.style.width = '200px';
                // img.style.height =  '200px';
                
                img.style.background = 'grey';
        };
        document.body.appendChild(gallery);
};
