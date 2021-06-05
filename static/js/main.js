$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-prediction').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);


        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' RESULT:  ' + data);
                if (data=="INAPPROPRIATE BEHAVIOUR"){
                    var body = document.getElementsByTagName('body')[0];
                    body.style.backgroundImage = "url('static/images/inappro.jpg')";
                    console.log("done");
                }else if(data=="APPROPRIATE BEHAVIOUR"){
                    var body = document.getElementsByTagName('body')[0];
                    body.style.backgroundImage = "url('static/images/appro.jpg')";
                    console.log("donea");
                }else{
                    var body = document.getElementsByTagName('body')[0];
                    body.style.backgroundImage = "url('static/images/abuse_final.jpg')";
                    console.log("donee");
                }
                
                console.log('Success!');
            },
        });
    });


// Predict
    $('#btn-prediction').click(function () {
        var form_data = new FormData($('#upload-file')[0]);


        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/prediction',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' RESULT:  ' + data);
                console.log(data)
                console.log('Success!');
            },
        });
    });

});
