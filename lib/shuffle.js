export default function shuffle(txt) {
  const chars =
    'aÃ bcdeÃ¨Ã©fghiÃ¬jklmnoÃ²pqrstuÃ¹Ã¼vwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%/|\\()#?!"\'â€œâ€â€˜â€™;:Ï€*+â€¢â€”-_,. ';
  // "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'."; // from http://mewbies.com/geek_fun_files/ascii/ascii_art_light_scale_and_gray_scale_chart.htm

  const finalText = txt;
  const minHeight = 7;
  const width = finalText.length;
  const factor = 5;
  const maxHeight = factor * width + minHeight;
  let i;
  const out = [];
  const counts = [];
  // let t;
  let str;
  let c = 0;

  function getSum(total, num) {
    return total + num;
  }
  if (txt) {
    counts[0] = minHeight;
    for (i = 1; i < width; i++) {
      counts[i] =
        Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
    }

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
    out[c] = finalText;
  }
  return out;
}
