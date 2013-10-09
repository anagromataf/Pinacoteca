window.onload = function() {

    // Calculate the Layout

    var windowWidth = window.innerWidth;
    
    var rows = new Array();
    var currentRow = new Array();

    for (var i = 0; i < images.length; i++) {
        var image = images[i];

        image.aspectRatio = image.width / image.height;
        
        if (currentRow.length > 0) {
            var rowAspectRatio = 0;
            for (var rowIdx = 0; rowIdx < currentRow.length; rowIdx++) {
                rowAspectRatio += currentRow[rowIdx].aspectRatio;
            }
            var height = (windowWidth / (rowAspectRatio + image.aspectRatio));
            if (height < 200) {
                rows.push(currentRow);
                currentRow = new Array();
            }
        }
        
        currentRow.push(image); 
    }
    
    if (currentRow.length > 0) {
        rows.push(currentRow);
    } 
    
    // Add the elements to the DOM
    
    var gallery = document.createElement('div');
    
    for (var rowIdx = 0; rowIdx < rows.length; rowIdx++) {
        var rowElement = document.createElement('div');
        
        var rowAspectRatio = 0;
        for (var i = 0; i < rows[rowIdx].length; i++) {
            rowAspectRatio += rows[rowIdx][i].aspectRatio;
        }
        
        for (var imgIdx = 0; imgIdx < rows[rowIdx].length; imgIdx++) {
            var img = document.createElement('img');
            
            img.style.background = 'grey';
            
            var width = rows[rowIdx][imgIdx].aspectRatio * windowWidth / rowAspectRatio;
            var height = width / rows[rowIdx][imgIdx].aspectRatio;
            
            img.width = width;
            img.height = height;
            img.src = rows[rowIdx][imgIdx].url;
            
            rowElement.appendChild(img);
        }
        gallery.appendChild(rowElement);
    }
    
    document.body.appendChild(gallery);
}
