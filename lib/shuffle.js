export default function shuffle(txt) {
  const chars =
   // 'aÃ bcdeÃ¨Ã©fghiÃ¬jklmnoÃ²pqrstuÃ¹Ã¼vwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%/|\\()#?!"\'â€œâ€â€˜â€™;:Ï€*+â€¢â€”-_,. ';
   // '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'.'; // from http://mewbies.com/geek_fun_files/ascii/ascii_art_light_scale_and_gray_scale_chart.htm
   'bcdeÃÃ©fghiÃjklmn0123πœ∑åΩç√∫µß∂ƒ∆ø¥†456789oÃ$@B%8&WM#*oahk0123456789bdpqwmZO0QLCJUYXzc0123456789vunxrjft1ilI';
   const chars2 = '1234567890πœ∑åΩç√∫µß∂ƒ∆ø¥†09^8]$&~#@765{43=21';

  const finalText = txt;
  const minHeight = 17;
  const width = finalText.length;
  const factor = 1.2;
  const maxHeight = factor * width + minHeight;
  let i;
  let n;
  const out = [];
  const counts = [];
  // let t;
  let str;
  let c = 0;
  let almostIndex = Math.floor(Math.random() * (width/2));
  let almostText;
  let almostChar = finalText.charAt(almostIndex);

  while (almostChar === ' ') {
    almostIndex = Math.floor(Math.random() * (width/2));
    almostChar = finalText.charAt(almostIndex);
  }

  while (almostChar === finalText.charAt(almostIndex)) {
    almostChar = chars2.charAt(Math.floor(Math.random() * chars2.length));
  }

  function getSum(total, num) {
    return total + num;
  }
  if (txt) {
    counts[0] = minHeight;
    for (i = 1; i < width; i++) {
    	if (finalText.charAt(i) !== ' ') {
    		counts[i] =
        Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
    	} else {
    		counts[i] = 0;
    	}

    }
    counts[almostIndex] = Math.max(...counts);

    while (counts.reduce(getSum) > 0) {
      str = '';
      for (i = 0; i < width; i++) {
        if (counts[i] > 0) {
          str += chars.charAt(Math.floor(Math.random() * chars.length));
          counts[i] -= 1;
        } else {
          str += finalText.charAt(i);
        }
      }
      out[c] = str;
      c += 1;
    }
    almostText = finalText.slice(0,almostIndex)+almostChar+finalText.slice(almostIndex+1);
    out[c] = almostText;
    for (n = c+1; n<c+15; n++ ) {
      out[n] = almostText;
    }
    out[n] = finalText;
  }
  return out;
}
