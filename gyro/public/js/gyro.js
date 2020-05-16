console.log('application started...');

const previousPage = document.referrer;
console.log('last page visited: ' + previousPage);

const gyro = new Gyroscope({frequency: 3});

gyro.addEventListener('reading', (e) => {
  if (gyro.z > 10) {
    window.location.href = previousPage;
  }
})
gyro.start();
