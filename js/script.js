$(function(){
    $('#btnGrab').click(function () {
        $('#upload_image').click();
    });
    
    $('#upload_image').change(function (evnt) {
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
    });
    
    function onChangeUploadJSpure(evt) {
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
    }
});
