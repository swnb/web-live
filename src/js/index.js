(function() {
    navigator.getUserMedia(
        {
            video: true
        },
        function(stream) {
            let video = document.createElement('video');
            // video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            document.body.appendChild(video);
            video.playing = false;
            video.onloadeddata = function() {
                video.play();
                video.playing = true;
            };
            video.addEventListener('click', () => {
                if (video.playing) {
                    video.pause();
                    video.playing = false;
                } else {
                    video.play();
                    video.playing = true;
                }
            });
            video.addEventListener('dblclick', () => {
                document.body.removeChild(video);
            });
            let button = document.createElement('button');
            button.innerText = 'push';
            button.onclick = () => {
                let canvas = document.createElement('canvas');
                [canvas.width, canvas.height] = [
                    video.clientWidth,
                    video.clientHeight
                ];
                canvas.getContext('2d').drawImage(video, 0, 0);
                let img = new Image();
                img.src = canvas.toDataURL();
                document.body.appendChild(img);
                let body = new FormData();
                canvas.toBlob(blob => {
                    body.append('pic', blob);
                    fetch('/data', {
                        method: 'post',
                        body
                    }).then(res => {
                        console.log(res);
                    });
                });
            };
            document.body.appendChild(button);
        },
        function(err) {
            console.log(err);
        }
    );
})();
