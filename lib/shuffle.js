export default function shuffle(slug) {
  // so this function is triggered on page load and switches out the contents of at title element for
  // some random charachters, and then it shuffles through random characters until one by one the
  // letters all got back to what they are supposed to be. The last wrong letter lingers for a while
  // just to mess with people... and then phase two kicks in (see below) -Luke Dearnley, Feb 2018
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
    // helper function used with Reduce to determine if
    // all elements in an array are zero yet
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

  // construct the full class need for th element we are seeking
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
    // how big is this text? (longer titles shuffle for longer)
    width = finalText.length;
    // compute longest shuffle
    maxHeight = factor * width + minHeight;

    // pick a letter to be the one that flips last after a delay
    almostIndex = Math.floor(Math.random() * (width / 1.3));
    almostChar = finalText.charAt(almostIndex);

    // choose a new one if that letter is a space
    while (almostChar === ' ') {
      almostIndex = Math.floor(Math.random() * (width / 1.3));
      almostChar = finalText.charAt(almostIndex);
    }

    // pick a random letter to linger the last flipper but keep
    // choosing a new random letter until it is not the same as original
    while (almostChar === finalText.charAt(almostIndex)) {
      almostChar = chars2.charAt(Math.floor(Math.random() * chars2.length));
    }

    if (txt) {
      counts = [];
      // for each letter in the text choose a random number of times it
      // should flip before returning to normal.
      counts[0] = minHeight; // make the first letter settle first
      for (let i = 1; i < width; i++) {
        if (finalText.charAt(i) !== ' ') {
          counts[i] =
            Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
        } else {
          counts[i] = 0; // don't mess with spaces
        }
      }
      // make sure the last one to flip has the maximum count (so it flips last)
      counts[almostIndex] = Math.max(...counts);

      out = [];
      // now build an array of the all the stages the text goes through for the shuffle
      // from completely mixed to completely back to normal
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
      // now insert the 'last to flip' letter
      almostText =
        finalText.slice(0, almostIndex) +
        almostChar +
        finalText.slice(almostIndex + 1);
      out[c] = almostText;
      // and leave it there for a whle (John's idea!)
      for (n = c + 1; n < c + 15; n++) {
        out[n] = almostText;
      }
      // before finally going back to the original text
      out[n] = finalText;
    }

    offset = 30;
    offsetInc = 5;
    // now set a bunch of interval timeouts at which each version
    // of the text gets inserted back into the element
    for (let i = 0, len3 = out.length; i < len3; i++) {
      setShufTimeout(fullSlug, out[i], offset);
      offset += offsetInc;
      offsetInc += offsetIncInc;
    }
    if (offset > maxOffset) {
      maxOffset = offset;
    }
  }
  // and that is finished move on to phase two...
  maxOffset += 100;
  setTimeout(rolloverShuffle, maxOffset);

  function rolloverShuffle() {
    // OK this is phase two. Once the 'on load' shuffling has
    // completed (above) we want to set up the title text
    // so that individual letters shuffle on roll over
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

    // find the elements we are setting up
    const ells = document.getElementsByClassName(
      `masthead__title__main--${slug}`,
    );
    const ems = document.getElementsByClassName(
      `masthead__title__highlight--${slug}`,
    );

    n = 0;
    for (i = 0, len = ells.length; i < len; i++) {
      if (
        // if they have content
        ells[i].innerHTML &&
        ells[i].innerHTML.substring(0, 8) !== '&lt;span' &&
        ells[i].innerHTML.substring(0, 5) !== '<span' // avoid double setups
      ) {
        // build an array of them
        ins[n] = ells[i].innerHTML;
        n += 1;
      }
    }

    for (i = 0, len = ems.length; i < len; i++) {
      if (
        // and now for the highlight ones
        ems[i].innerHTML &&
        ems[i].innerHTML.substring(0, 8) !== '&lt;span' &&
        ems[i].innerHTML.substring(0, 5) !== '<span'
      ) {
        ins[n] = ems[i].innerHTML;
        n += 1;
      }
    }

    n = 0;
    // now for each title
    for (i = 0, len = ins.length; i < len; i++) {
      // step through the letters and wrap them in a span
      for (j = 0, len2 = ins[i].length; j < len2; j++) {
        id = `shuffleChar${n}-${slug}`; // build a unique ID for each one.
        l = ins[i].charAt(j);
        if (outs[i]) {
          if (l !== ' ') {
            // case where outs[i] already has something and we are appending
            outs[i] = `${
              outs[i]
            }<span class="shuffleChar" id="${id}">${l}</span>`;
          } else {
            outs[i] += l; // don't do spaces
          }
        } else if (l !== ' ') {
          // case where outs[i] is empty
          outs[i] = `<span class="shuffleChar" id="${id}">${l}</span>`;
        } else {
          outs[i] = l; // don't do spaces
        }
        n += 1;
      }
    }

    n = 0;
    for (i = 0, len = ells.length; i < len; i++) {
      if (
        ells[i].innerHTML &&
        ells[i].innerHTML.substring(0, 8) !== '&lt;span' &&
        ells[i].innerHTML.substring(0, 5) !== '<span'
      ) {
        // now re-insert the span-wrapped title text back into the element
        ells[i].innerHTML = outs[n];
        n += 1;
      }
    }

    for (i = 0, len = ems.length; i < len; i++) {
      if (
        ems[i].innerHTML &&
        ems[i].innerHTML.substring(0, 8) !== '&lt;span' &&
        ems[i].innerHTML.substring(0, 5) !== '<span'
      ) {
        // now re-insert the span-wrapped title text back into the element
        ems[i].innerHTML = outs[n];
        n += 1;
      }
    }

    // next find all the spans and add roll over listeners
    const letters = document.getElementsByClassName('shuffleChar');
    for (i = 0, len = letters.length; i < len; i++) {
      letters[i].addEventListener('mouseover', startShuffle);
    }

    // and start running the function that will update any elements that have been rolled over
    setInterval(updateSh, 50);

    function startShuffle() {
      // this function is triggered when a letter is rolled over
      const lid = this.id; // find the ID
      if (!this.classList.contains('running')) {
        // if a letter is already shuffling abort.
        this.classList.add('running'); // otherwise mark it as shuffling.
        origs[lid] = this.innerHTML; // save it's original letter.
        // replace it with a random letter.
        this.innerHTML = chars.charAt(Math.floor(Math.random() * chars.length));
        l = shufList.length;
        shufList[l] = lid; // add its ID to the list of shuffling elements.
        // and pick a random number of times to shuffle for.
        shufCtr[l] = Math.floor(Math.random() * ctrMax + 10);
      }
    }

    function updateSh() {
      // this function runs reguarly and continues shuffling any letters that should be.
      let x;
      // go through the list of shuffling elements
      for (i = 0, len = shufList.length; i < len; i++) {
        el = document.getElementById(shufList[i]);
        if (el) {
          shufCtr[i] -= 1; // decrease the count of times to shuffle.
          if (shufCtr[i] > 0) {
            // if not at end of shuffle count insert a new random letter.
            el.innerHTML = chars.charAt(
              Math.floor(Math.random() * chars.length),
            );
          } else {
            // otherwise put the original letter back.
            el.innerHTML = origs[shufList[i]];
            // and unmark the element as shuffling.
            el.classList.remove('running');
            // and remove the ID from the list of shuffling elements.
            // and the count from the list of counters.
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
