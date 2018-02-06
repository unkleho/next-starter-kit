export default function rolloverShuffle() {
  const chars =
    // 'aÃ bcdeÃ¨Ã©fghiÃ¬jklmnoÃ²pqrstuÃ¹Ã¼vwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%/|\\()#?!"\'â€œâ€â€˜â€™;:Ï€*+â€¢â€”-_,. ';
    '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'.'; // from http://mewbies.com/geek_fun_files/ascii/ascii_art_light_scale_and_gray_scale_chart.htm
  // 'bcdeÃÃ©fghiÃjklmn0123πœ∑åΩç√∫µß∂ƒ∆ø¥†456789oÃ$@B%8&WM#*oahk0123456789bdpqwmZO0QLCJUYXzc0123456789vunxrjft1ilI';
  const chars2 = '1234567890πœ∑åΩç√∫µß∂ƒ∆ø¥†09^8]$&~#@765{43=21';

  let n = 0;
  const ins = [];
  const outs = [];
  const shufList = [];
  const shufCtr = [];
  const origs = [];
  const ctrMax = 40;

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
      if (outs[i]) {
        outs[i] = `${
          outs[i]
        }<span class="shuffleChar" id="shuffleChar${n}">${ins[i].charAt(
          j,
        )}</span>`;
      } else {
        outs[i] = `<span class="shuffleChar" id="shuffleChar${n}">${ins[
          i
        ].charAt(j)}</span>`;
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
