export default function shuffle(slug) {
  let chars =
    // 'aÃ bcdeÃ¨Ã©fghiÃ¬jklmnoÃ²pqrstuÃ¹Ã¼vwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%/|\\()#?!"\'â€œâ€â€˜â€™;:Ï€*+â€¢â€”-_,. ';
    // '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'.'; // from http://mewbies.com/geek_fun_files/ascii/ascii_art_light_scale_and_gray_scale_chart.htm
    'bcdeÃÃ©fghiÃjklmn0123πœ∑åΩç√∫µ∂ƒ∆ø¥†456789oÃ$@B%8&WM#*oahk0123456789bdpqwmZO0QLCJUYXzc0123456789vunxrjft1ilI';
  const chars2 = '1234567890πœ∑åΩç√∫µ∂ƒ∆ø¥†09^8]$&~#@765{43=21';

  let txt;
  let finalText;
  const minHeight = 17;
  const factor = 1.2;
  let width;
  let maxHeight;
  let n;
  let counts;
  let out;
  let offset;
  let offsetInc;
  const offsetIncInc = 3;
  let almostText;
  let almostIndex;
  let almostChar;
  let str;
  let c;
  let el;
  let maxOffset = 0;

  function getSum(total, num) {
    return total + num;
  }

  function setShufTimeout(classToChange, content, when) {
    const el2 = document.getElementsByClassName(classToChange);
    if (el2) {
      const el3 = el2[0];
      setTimeout(() => {
        el3.innerHTML = content;
      }, when);
    }
  }

  const fullSlug = `masthead__title__main--${slug}`;

  // find all elements that need to be shuffled
  const els = document.getElementsByClassName(fullSlug);
  if (els) {
    // actually we should only get one element each time
    el = els[0];
    c = 0;
    // get the text
    txt = el.innerHTML;

    // keep it aside so it can be replaced at end of shuffle
    finalText = txt;
    // how big is this text?
    width = finalText.length;
    // compute longest shuffle
    maxHeight = factor * width + minHeight;

    // pick a letter to be the one that flips last after a delay
    almostIndex = Math.floor(Math.random() * (width / 2));
    almostChar = finalText.charAt(almostIndex);

    // choose a new one if that letter is a space
    while (almostChar === ' ') {
      almostIndex = Math.floor(Math.random() * (width / 2));
      almostChar = finalText.charAt(almostIndex);
    }

    // choose a new different char if its the same as original
    while (almostChar === finalText.charAt(almostIndex)) {
      almostChar = chars2.charAt(Math.floor(Math.random() * chars2.length));
    }

    if (txt) {
      counts = [];
      counts[0] = minHeight;
      for (let i = 1; i < width; i++) {
        if (finalText.charAt(i) !== ' ') {
          counts[i] =
            Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
        } else {
          counts[i] = 0;
        }
      }
      counts[almostIndex] = Math.max(...counts);

      out = [];
      while (counts.reduce(getSum) > 0) {
        str = '';
        for (let i = 0; i < width; i++) {
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
      almostText =
        finalText.slice(0, almostIndex) +
        almostChar +
        finalText.slice(almostIndex + 1);
      out[c] = almostText;
      for (n = c + 1; n < c + 15; n++) {
        out[n] = almostText;
      }
      out[n] = finalText;
    }

    offset = 30;
    offsetInc = 5;
    for (let i = 0, len3 = out.length; i < len3; i++) {
      setShufTimeout(fullSlug, out[i], offset);
      offset += offsetInc;
      offsetInc += offsetIncInc;
    }
    if (offset > maxOffset) {
      maxOffset = offset;
    }
  }
  maxOffset += 100;
  setTimeout(rolloverShuffle, maxOffset);

  function rolloverShuffle() {
    chars =
      // 'aÃ bcdeÃ¨Ã©fghiÃ¬jklmnoÃ²pqrstuÃ¹Ã¼vwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%/|\\()#?!"\'â€œâ€â€˜â€™;:Ï€*+â€¢â€”-_,. ';
      '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'.'; // from http://mewbies.com/geek_fun_files/ascii/ascii_art_light_scale_and_gray_scale_chart.htm
    // 'bcdeÃÃ©fghiÃjklmn0123πœ∑åΩç√∫µ∂ƒ∆ø¥†456789oÃ$@B%8&WM#*oahk0123456789bdpqwmZO0QLCJUYXzc0123456789vunxrjft1ilI';

    const ins = [];
    const outs = [];
    const shufList = [];
    const shufCtr = [];
    const origs = [];
    const ctrMax = 30;
    let id;
    let l;
    let i;
    let j;
    let len;
    let len2;

    const ells = document.getElementsByClassName(
      `masthead__title__main--${slug}`,
    );
    const ems = document.getElementsByClassName(
      `masthead__title__highlight--${slug}`,
    );

    n = 0;
    for (i = 0, len = ells.length; i < len; i++) {
      if (ells[i].innerHTML) {
        ins[n] = ells[i].innerHTML;
        n += 1;
      }
    }

    for (i = 0, len = ems.length; i < len; i++) {
      if (ems[i].innerHTML) {
        ins[n] = ems[i].innerHTML;
        n += 1;
      }
    }

    n = 0;
    for (i = 0, len = ins.length; i < len; i++) {
      for (j = 0, len2 = ins[i].length; j < len2; j++) {
        id = `shuffleChar${n}-${slug}`;
        l = ins[i].charAt(j);
        if (outs[i]) {
          if (l !== ' ') {
            outs[i] = `${
              outs[i]
            }<span class="shuffleChar" id="${id}">${l}</span>`;
          } else {
            outs[i] += l;
          }
        } else if (l !== ' ') {
          outs[i] = `<span class="shuffleChar" id="${id}">${l}</span>`;
        } else {
          outs[i] = l;
        }
        n += 1;
      }
    }

    n = 0;
    for (i = 0, len = ells.length; i < len; i++) {
      if (ells[i].innerHTML) {
        ells[i].innerHTML = outs[n];
        n += 1;
      }
    }

    for (i = 0, len = ems.length; i < len; i++) {
      if (ems[i].innerHTML) {
        ems[i].innerHTML = outs[n];
        n += 1;
      }
    }

    const letters = document.getElementsByClassName('shuffleChar');
    for (i = 0, len = letters.length; i < len; i++) {
      letters[i].addEventListener('mouseover', startShuffle);
    }

    setInterval(updateSh, 50);

    function startShuffle() {
      const lid = this.id;
      if (!this.classList.contains('running')) {
        this.classList.add('running');
        origs[lid] = this.innerHTML;
        this.innerHTML = chars.charAt(Math.floor(Math.random() * chars.length));
        l = shufList.length;
        shufList[l] = lid;
        shufCtr[l] = Math.floor(Math.random() * ctrMax + 10);
      }
    }

    function updateSh() {
      let x;
      for (i = 0, len = shufList.length; i < len; i++) {
        el = document.getElementById(shufList[i]);
        if (el) {
          shufCtr[i] -= 1;
          if (shufCtr[i] > 0) {
            el.innerHTML = chars.charAt(
              Math.floor(Math.random() * chars.length),
            );
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
}
