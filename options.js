document.addEventListener('DOMContentLoaded', () => {
    const requestWebcamBtn = document.getElementById('request-webcam-btn');
    const webcamStatus = document.getElementById('webcam-status');

    // Check current webcam permission status
    function updateWebcamStatus() {
        navigator.permissions.query({ name: 'camera' }).then(permissionStatus => {
            switch (permissionStatus.state) {
                case 'granted':
                    webcamStatus.textContent = 'Webcam Access: Granted ✅';
                    webcamStatus.style.color = 'green';
                    requestWebcamBtn.disabled = true;
                    break;
                case 'prompt':
                    webcamStatus.textContent = 'Webcam Access: Pending ⚠️';
                    webcamStatus.style.color = 'orange';
                    requestWebcamBtn.disabled = false;
                    break;
                case 'denied':
                    webcamStatus.textContent = 'Webcam Access: Denied ❌';
                    webcamStatus.style.color = 'red';
                    requestWebcamBtn.disabled = false;
                    break;
            }
        });
    }

    // Request webcam permissions
    requestWebcamBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            });

            // Stop the stream immediately after getting permission
            stream.getTracks().forEach(track => track.stop());

            // Update status
            updateWebcamStatus();

            // Notify background script about permission change
            chrome.runtime.sendMessage({ action: 'webcamPermissionGranted' });
        } catch (error) {
            console.error('Webcam permission error:', error);
            webcamStatus.textContent = `Error: ${error.message}`;
            webcamStatus.style.color = 'red';
        }
    });

    // Initial status check
    updateWebcamStatus();
});
