const ENCRYPTION_KEY = 'your-secure-key-123';
const API_ENDPOINT = 'https://api.example.com/attendance'; // has to replace with a working one. 
const TARGET_LOCATION = { lat: 41.103611, lng: -80.649083 };
const MAX_DISTANCE = 400; // 30 meters
const PROFESSOR_ALERT_ENDPOINT = 'https://api.example.com/unauthorized';

// Global variables
let currentPosition = null;
let qrScanner = null;
let studentInfo = null;
let lastAttendanceLog = null;
const deviceId = CryptoJS.lib.WordArray.random(16).toString();

// Main workflow functions
async function requestLocationPermission() {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        const distance = calculateDistance(
            currentPosition.lat,
            currentPosition.lng,
            TARGET_LOCATION.lat,
            TARGET_LOCATION.lng
        );

        if (distance > MAX_DISTANCE) {
            await reportUnauthorizedAccess();
            showLocationError();
            return;
        }

        showLocationVerified();
        setTimeout(showStudentForm, 2000);

    } catch (error) {
        alert('Location access is required for verification');
    }
}

async function reportUnauthorizedAccess() {
    const reportData = {
        deviceId,
        timestamp: new Date().toISOString(),
        coordinates: currentPosition,
        studentInfo
    };

    try {
        await fetch(PROFESSOR_ALERT_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reportData)
        });
    } catch (error) {
        console.error('Error reporting unauthorized access:', error);
    }
}

function showLocationVerified() {
    document.getElementById('permission-modal').classList.add('hidden');
    document.getElementById('location-verified-modal').classList.remove('hidden');
    document.getElementById('location-verified-modal').classList.add('flex');
}

function showStudentForm() {
    document.getElementById('location-verified-modal').classList.add('hidden');
    document.getElementById('student-info-modal').classList.remove('hidden');
    document.getElementById('student-info-modal').classList.add('flex');
}

function handleStudentInfo(event) {
    event.preventDefault();
    
    studentInfo = {
        firstName: document.getElementById('first-name').value.trim(),
        lastName: document.getElementById('last-name').value.trim(),
        ysuId: document.getElementById('ysu-id').value.trim()
    };

    document.getElementById('student-info-modal').classList.add('hidden');
    initializeScannerInterface();
}

function initializeScannerInterface() {
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('display-name').textContent = 
        `${studentInfo.firstName} ${studentInfo.lastName}`;
    
    initializeQRScanner();
}

async function initializeQRScanner() {
    try {
        qrScanner = new Html5Qrcode("qr-reader");
        
        await qrScanner.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                showTorchButtonIfSupported: true
            },
            onScanSuccess,
            () => {} // Suppress error logging
        );
        
    } catch (error) {
        showResult('Camera access required for scanning', 'error');
    }
}

async function onScanSuccess(decryptedData) {
    document.getElementById('loading').classList.remove('hidden');
    qrScanner.pause();

    try {
        const attendanceRecord = createAttendanceRecord(decryptedData);
        await submitAttendance(attendanceRecord);
        
        lastAttendanceLog = attendanceRecord;
        showSuccessModal();
        qrScanner.stop();

    } catch (error) {
        showResult('Error submitting attendance', 'error');
        qrScanner.resume();
    } finally {
        document.getElementById('loading').classList.add('hidden');
    }
}

function createAttendanceRecord(qrData) {
    return {
        student: studentInfo,
        timestamp: new Date().toISOString(),
        location: currentPosition,
        qrData,
        deviceId,
        distance: calculateDistance(
            currentPosition.lat,
            currentPosition.lng,
            TARGET_LOCATION.lat,
            TARGET_LOCATION.lng
        ),
        signature: CryptoJS.HmacSHA256(
            `${studentInfo.ysuId}-${qrData}`,
            ENCRYPTION_KEY
        ).toString()
    };
}

async function submitAttendance(data) {
    // const response = await fetch(API_ENDPOINT, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });

    // if (!response.ok) throw new Error('API Error');
    // return response.json();
    return "successfull";
}

function downloadAttendanceLog() {
    if (!lastAttendanceLog) {
        alert('No attendance data available');
        return;
    }

    const content = `Attendance Verification Log\n` +
        `===============================\n` +
        `Student Name: ${lastAttendanceLog.student.firstName} ${lastAttendanceLog.student.lastName}\n` +
        `YSU ID: ${lastAttendanceLog.student.ysuId}\n` +
        `Timestamp: ${lastAttendanceLog.timestamp}\n\n` +
        `Location Data\n` +
        `-------------\n` +
        `Your Coordinates: ${lastAttendanceLog.location.lat.toFixed(6)}, ${lastAttendanceLog.location.lng.toFixed(6)}\n` +
        `Classroom Coordinates: ${TARGET_LOCATION.lat.toFixed(6)}, ${TARGET_LOCATION.lng.toFixed(6)}\n` +
        `Distance: ${lastAttendanceLog.distance.toFixed(2)} meters\n` +
        `Within Range: ${lastAttendanceLog.distance <= MAX_DISTANCE ? 'Yes' : 'No'}\n\n` +
        `Security Information\n` +
        `--------------------\n` +
        `Device ID: ${lastAttendanceLog.deviceId}\n` +
        `Data Signature: ${lastAttendanceLog.signature}\n` +
        `QR Code Content: ${lastAttendanceLog.qrData}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${lastAttendanceLog.timestamp.replace(/[:.]/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Helper functions
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

function showSuccessModal() {
    document.getElementById('success-modal').classList.remove('hidden');
    document.getElementById('success-modal').classList.add('flex');
}

function closeSuccessModal() {
    document.getElementById('success-modal').classList.add('hidden');
    window.location.reload();
}

function showLocationError() {
    alert('You must be in the classroom to use this system. Professor has been notified.');
}

function showResult(message, type) {
    alert(`${type.toUpperCase()}: ${message}`);
}