$(function () {
    $image_crop = $('#image_demo').croppie(
        {
            enableExif: true,
            viewport: {
                width: 200,
                height: 200,
                type: 'square'
            },
            boundary: {
                width: 300,
                height: 300
            }
        });

    $('#btnGrab').click(function () {
        $('#upload_image').click();
    });

    var selectedFile;

    $("#upload_image").change(function (evt) {

        if ((selectedFile = evt.target.files[0])) {
            validateImageSizeType(selectedFile);
        }

    });

    function validateImageSizeType(selectedImage){
        var _URL = window.URL || window.webkitURL;
        var img = new Image();

        img.onload = function() {
            if(this.width >= 200 && this.height >= 200){
                readImgShowModal(selectedImage);
            }
            else
            {
                showAlert("This image doesn't have the minimum size required: 200px / 200px");
            }
        };

        img.onerror = function() {
            showAlert("File type not valid: " + selectedImage.type);
        };
        
        img.src = _URL.createObjectURL(selectedImage);
    }

    function showAlert(msj) {
        $('#AddAlertMessage').html(msj);
        $("#AddAlert").show();
        setTimeout(function () { $("#AddAlert").hide(); }, 3500);
    }

    function readImgShowModal(selectedImg){
        var reader = new FileReader();
        reader.onload = function (event) {
            $image_crop.croppie('bind', {
                url: event.target.result
            }).then(function () {
                console.log('Bind complete!');
            });
        }
        reader.readAsDataURL(selectedImg);
        $('#uploadImageModal').modal('show');
    }

    $('.crop_image').click(function () {
        $image_crop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (response) {
            
            $('#noteInfo').html('You can select another picture!');

            withJSpure(response);

            $('#nameMyImg').html(selectedFile.name);

            $('#myImg').html('');
            $("<img>", {
                "src": response,
                "class": 'img-thumbnail img-chosen',
                "alt": 'Your image!',
                "title": selectedFile.name
            }).appendTo("#myImg");            

            $('#uploadImageModal').modal('hide');
        })
    });

    function withJSpure(resp) {
        var imgtag = document.getElementById("myImage");
        imgtag.title = selectedFile.name;

        var nameImg = document.getElementById("nameMyImage");
        nameImg.innerHTML = selectedFile.name;
        
        imgtag.src = resp;
    }

    /*     $('#upload_image').change(function (evnt) {
            $('#noteInfo').html('You can select another picture!');
        
            onChangeUploadJSpure(evnt);
        
            var selectedFile = event.target.files[0];
            var reader = new FileReader();
        
            $('#myImg').attr('title', selectedFile.name);
            $('#nameMyImg').html(selectedFile.name);
        
            reader.onload = function (event) {
                $("#myImg").attr("src", event.target.result);
            };
        
            reader.readAsDataURL(selectedFile);
        }); */

    /* function onChangeUploadJSpure(evt) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("myImage");
        imgtag.title = selectedFile.name;

        var nameImg = document.getElementById("nameMyImage");
        nameImg.innerHTML = selectedFile.name;

        reader.onload = function (event) {
            imgtag.src = event.target.result;
        };

        reader.readAsDataURL(selectedFile);
    } */
});
