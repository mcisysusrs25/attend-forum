# AttendForum

## Overview
AttendForum is a web-based student attendance verification system that ensures secure and accurate attendance tracking using location-based verification, QR code scanning, and encrypted student identification.

## Features
- **Location-Based Verification**: Ensures students are within the designated classroom before allowing attendance marking.
- **QR Code Scanner**: Uses `html5-qrcode` to verify student identity.
- **Secure Student Identification**: Encrypts student information using `crypto-js`.
- **Unauthorized Access Reporting**: Sends alerts to the professor if attendance is attempted outside the designated location.
- **Downloadable Attendance Logs**: Allows students to download their verification logs.

## Technologies Used
- **HTML, CSS, JavaScript**: Frontend implementation with TailwindCSS for styling.
- **html5-qrcode**: QR code scanning for student verification.
- **crypto-js**: Secure encryption for sensitive data.
- **Geolocation API**: Verifies student presence within a specific radius.

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/attendforum.git
   ```
2. Navigate to the project directory:
   ```bash
   cd attendforum
   ```
3. Open `index.html` in a web browser to test the application.

## Configuration
- Update `API_ENDPOINT` with the correct server URL for attendance verification.
- Set the `TARGET_LOCATION` to match the classroom's latitude and longitude.
- Adjust `MAX_DISTANCE` as required (default: 400 meters).

## Usage
1. Open the application in a web browser.
2. Grant location permissions when prompted.
3. Enter your student details (First Name, Last Name, YSU ID).
4. Scan the QR code to confirm attendance.
5. Download the verification log after successful attendance marking.

## Security Measures
- Uses encryption for student data.
- Reports unauthorized access attempts to the professor.
- Ensures attendance is only marked within the defined location radius.

## Future Enhancements
- Integration with university attendance systems.
- Mobile-friendly UI improvements.
- Multi-factor authentication for added security.

## License
This project is licensed under the MIT License.

## Contact
For questions or contributions, please contact `ssharma@student.ysu.edu`.

