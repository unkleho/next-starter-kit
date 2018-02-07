export default function shuffle() {
  const chars =
    // 'aÃ bcdeÃ¨Ã©fghiÃ¬jklmnoÃ²pqrstuÃ¹Ã¼vwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%/|\\()#?!"\'â€œâ€â€˜â€™;:Ï€*+â€¢â€”-_,. ';
    // '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'.'; // from http://mewbies.com/geek_fun_files/ascii/ascii_art_light_scale_and_gray_scale_chart.htm
    'bcdeÃÃ©fghiÃjklmn0123πœ∑åΩç√∫µ∂ƒ∆ø¥†456789oÃ$@B%8&WM#*oahk0123456789bdpqwmZO0QLCJUYXzc0123456789vunxrjft1ilI';
  const chars2 = '1234567890πœ∑åΩç√∫µ∂ƒ∆ø¥†09^8]$&~#@765{43=21';

  const txt = [];
  const finalText = [];
  const minHeight = 17;
  const factor = 1.2;
  const width = [];
  const maxHeight = [];
  let n;
  const counts = [];
  const out = [];
  let offset;
  let offsetInc;
  const offsetIncInc = 3;
  const almostText = [];
  const almostIndex = [];
  const almostChar = [];
  let str;
  let c = 0;

  function getSum(total, num) {
    return total + num;
  }

  // find all elements that need to be shuffled
  const els = document.getElementsByClassName('masthead__title__main');
  console.log(els.length);
  for (let e = 0, len = els.length; e < len; e++) {
    // get the text
    txt[e] = els[e].innerHTML;
    console.log(txt[e]);
    // keep it aside so it can be replaced at end of shuffle
    finalText[e] = txt[e];
    // how big is this text?
    width[e] = finalText[e].length;
    // compute longest shuffle
    maxHeight[e] = factor * width[e] + minHeight;

    // pick a letter to be the one that flips last after a delay
    almostIndex[e] = Math.floor(Math.random() * (width[e] / 2));
    almostChar[e] = finalText[e].charAt(almostIndex[e]);

    // choose a new one if that letter is a space
    while (almostChar[e] === ' ') {
      almostIndex[e] = Math.floor(Math.random() * (width[e] / 2));
      almostChar[e] = finalText[e].charAt(almostIndex[e]);
    }

    // choose a new different char if its the same as original
    while (almostChar[e] === finalText[e].charAt(almostIndex[e])) {
      almostChar[e] = chars2.charAt(Math.floor(Math.random() * chars2.length));
    }

    if (txt[e]) {
      counts[e] = [];
      counts[e][0] = minHeight;
      for (let i = 1; i < width[e]; i++) {
        if (finalText[e].charAt(i) !== ' ') {
          counts[e][i] =
            Math.floor(Math.random() * (maxHeight[e] - minHeight)) + minHeight;
        } else {
          counts[e][i] = 0;
        }
      }
      counts[e][almostIndex[e]] = Math.max(...counts[e]);

      out[e] = [];
      while (counts[e].reduce(getSum) > 0) {
        str = '';
        for (let i = 0; i < width[e]; i++) {
          if (counts[e][i] > 0) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
            counts[e][i] -= 1;
          } else {
            str += finalText[e].charAt(i);
          }
        }
        out[e][c] = str;
        c += 1;
      }
      almostText[e] =
        finalText[e].slice(0, almostIndex[e]) +
        almostChar[e] +
        finalText[e].slice(almostIndex[e] + 1);
      out[e][c] = almostText[e];
      for (n = c + 1; n < c + 15; n++) {
        out[e][n] = almostText[e];
      }
      out[e][n] = finalText[e];
    }
    console.log(out[e]);
    offset = 30;
    offsetInc = 5;
    for (let i = 0; i < out[e].length; i++) {
      // setTimeout(updateEl(els[e], out[e][i]), offset);
      setTimeout(() => {
        els[e].innerHTML = out[e][i];
      }, offset);
      offset += offsetInc;
      offsetInc += offsetIncInc;
    }
  }
}
/*
export default function rolloverShuffle() {
  const chars =
    // 'aÃ bcdeÃ¨Ã©fghiÃ¬jklmnoÃ²pqrstuÃ¹Ã¼vwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%/|\\()#?!"\'â€œâ€â€˜â€™;:Ï€*+â€¢â€”-_,. ';
    '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'.'; // from http://mewbies.com/geek_fun_files/ascii/ascii_art_light_scale_and_gray_scale_chart.htm
  // 'bcdeÃÃ©fghiÃjklmn0123πœ∑åΩç√∫µ∂ƒ∆ø¥†456789oÃ$@B%8&WM#*oahk0123456789bdpqwmZO0QLCJUYXzc0123456789vunxrjft1ilI';
  const chars2 = '1234567890πœ∑åΩç√∫µ∂ƒ∆ø¥†09^8]$&~#@765{43=21';

  let n = 0;
  const ins = [];
  const outs = [];
  const shufList = [];
  const shufCtr = [];
  const origs = [];
  const ctrMax = 40;
  let id;
  let l;

  const els = document.getElementsByClassName('masthead__title__main');
  const ems = document.getElementsByClassName('masthead__title__highlight');

  for (let i = 0, len = els.length; i < len; i++) {
    if (els[i].innerHTML) {
      ins[n] = els[i].innerHTML;
      n += 1;
    }
  }

  for (let i = 0, len = ems.length; i < len; i++) {
    if (ems[i].innerHTML) {
      ins[n] = ems[i].innerHTML;
      n += 1;
    }
  }

  n = 0;
  for (let i = 0, len = ins.length; i < len; i++) {
    for (let j = 0, len = ins[i].length; j < len; j++) {
      id = 'shuffleChar'+n;
      l = ins[i].charAt(j);
      if (outs[i]) {
        if (l !== ' ') {
          outs[i] = `${outs[i]}<span class="shuffleChar" id="${id}">${l}</span>`;
        } else {
          outs[i] = outs[i] + l;
        }
      } else {
        if (l !== ' ') {
          outs[i] = `<span class="shuffleChar" id="${id}">${l}</span>`;
        } else {
          outs[i] = l;
        }
      }
      n += 1;
    }
  }

  n = 0;
  for (let i = 0, len = els.length; i < len; i++) {
    if (els[i].innerHTML) {
      els[i].innerHTML = outs[n];
      n += 1;
    }
  }

  for (let i = 0, len = ems.length; i < len; i++) {
    if (ems[i].innerHTML) {
      ems[i].innerHTML = outs[n];
      n += 1;
    }
  }

  const letters = document.getElementsByClassName('shuffleChar');
  for (let i = 0, len = letters.length; i < len; i++) {
    letters[i].addEventListener('mouseover', startShuffle);
  }

  setInterval(updateSh, 50);

  function startShuffle() {
    let lid;
    lid = this.id;
    if (!this.classList.contains('running')) {
      this.classList.add('running');
      origs[lid] = this.innerHTML;
      this.innerHTML = chars.charAt(Math.floor(Math.random() * chars.length));
      const l = shufList.length;
      shufList[l] = lid;
      shufCtr[l] = Math.floor(Math.random() * ctrMax + 10);
    }
  }

  function updateSh() {
    let el;
    let x;
    for (let i = 0, len = shufList.length; i < len; i++) {
      el = document.getElementById(shufList[i]);
      if (el) {
        shufCtr[i] -= 1;
        if (shufCtr[i] > 0) {
          el.innerHTML = chars.charAt(Math.floor(Math.random() * chars.length));
        } else {
          el.innerHTML = origs[shufList[i]];
          el.classList.remove('running');
          x = shufList.indexOf(shufList[i]);
          if (x > -1) {
            shufList.splice(x, 1);
            shufCtr.splice(x, 1);
          }
        }
      }
    }
  }
}
*/
