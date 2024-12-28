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
                width: { max: 99999 },
                height: { max: 99999 }
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
                errorMessage.innerHTML = `
                    <div style="
                        background: #4285f4;
                        color: white;
                        padding: 20px;
                        border-radius: 4px;
                        font-family: 'Google Sans', Arial, sans-serif;
                        max-width: 400px;
                        margin: 0 auto;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
                    ">
                        <h3 style="margin: 0 0 15px 0; font-weight: 500;">Webcam Access Required</h3>
                        <ol style="margin: 0; padding-left: 20px;">
                            <li style="margin-bottom: 10px;">Pin the extension by clicking the puzzle icon and selecting "Pin"</li>
                            <li style="margin-bottom: 10px;">Right-click the extension icon and select "Settings"</li>
                            <li style="margin-bottom: 10px;">Grant webcam permissions in the settings</li>
                            <li style="margin-bottom: 10px;">Close and reopen the side panel</li>
                        </ol>
                    </div>
                `;
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
