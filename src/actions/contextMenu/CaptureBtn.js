export const exec = (msgId) => {
  const element = document.getElementById(`msg-${msgId}`);
  // ใช้ lib html2canvas 
  if (element) {
    window.html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'hengheng-capture.png';
      link.href = imgData;
      link.click();
    });
  }
};
