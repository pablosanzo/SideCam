document.addEventListener('DOMContentLoaded', async () => {
    const videoElement = document.getElementById('webcam-video');

    try {
        // Check if getUserMedia is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('getUserMedia is not supported in this browser');
        }

        // Request access to the webcam with ideal resolution
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 1280 },
                height: { ideal: 720 }
            } 
        });

        // Set the video source to the webcam stream
        videoElement.srcObject = stream;
    } catch (error) {
        console.error('Error accessing webcam:', error);
        
        // Create an error message element
        const errorMessage = document.createElement('div');
        
        // Provide more specific error guidance
        switch (error.name) {
            case 'NotAllowedError':
                errorMessage.textContent = 'Webcam access was denied. Please check your browser permissions and try again.';
                break;
            case 'NotFoundError':
                errorMessage.textContent = 'No webcam was found. Please connect a webcam and try again.';
                break;
            case 'NotReadableError':
                errorMessage.textContent = 'Webcam is in use by another application. Please close other apps using the webcam.';
                break;
            default:
                errorMessage.textContent = 'Unable to access webcam. Please check permissions and try again.';
        }
        
        errorMessage.style.color = 'red';
        errorMessage.style.textAlign = 'center';
        
        // Replace video with error message
        document.getElementById('webcam-container').innerHTML = '';
        document.getElementById('webcam-container').appendChild(errorMessage);
    }
});
