const newProcess = document.getElementById('new-process');
const processName = document.getElementById('process-name');
const startCaptureBtn = document.getElementById('start-capture-btn');
newProcess.style.display = 'none';

document.getElementById('capture-new-process').addEventListener('click', () => {
  newProcess.style.display = 'block';
  
})

startCaptureBtn.addEventListener('click', () => {
  console.log(processName.value);
})