// const preloader = document.querySelector(".preloader");
const note = document.querySelector(".tasbeeh-textarea");
const noteValue = note.value;
const slideMenu = document.querySelector(".slide-menu");
const slideMenuItems = document.querySelectorAll(".slide-menu li");
const hamMenu = document.querySelector(".ham-menu");
const localStorageClear = document.querySelector(".local-storage");
const optionsButton = document.querySelector(".options-button");
const optionsContainer = document.querySelector(".options-container");
const target = document.querySelector(".target");
const targetValue = target.value;
// sounds
const huaweiClick = document.querySelector(".huawei-click");
const vibrate = document.querySelector(".vibrate");
// voice icons
const VTT = document.querySelector(".voice-to-text");
const recordingOff = "https://img.icons8.com/ios/80/000000/high-volume.png";
const recordingOn = "https://img.icons8.com/officel/80/000000/high-volume.png";

hamMenu.addEventListener("click", () => {
  slideMenu.classList.toggle("slide");
  // Animate Link
  slideMenuItems.forEach((link, index) => {
    if (link.getElementsByClassName.animation) {
      link.style.animation = ``;
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.5
      }s`;
    }
  });
  // Burger Slide
  hamMenu.classList.toggle("toggle");
});

optionsButton.addEventListener("click", function () {
  optionsContainer.classList.toggle("toggle-options");
});

localStorageClear.addEventListener("click", function () {
  if (confirm("Press'Ok'if you want to clear all data!!!")) {
    localStorage.clear();
  }
});

const vibrateDevice = (milsec) => {
  return navigator.vibrate(milsec);
};
const digitalTasbeeh = () => {
  const digitalInput = document.querySelector(".digital-tasbeeh-value");
  let digitalInputValue = digitalInput.value;
  const digitalResetButton = document.querySelector(".reset");
  const digitalAddButton = document.querySelector(".add");
  const digitalDeductButton = document.querySelector(".deduct");

  window.addEventListener("load", function () {
    // sound effect
    let effect = getFromLocalStorage("click-effect");
    if (effect == "") {
      setEffect("vibrate");
    }

    digitalValue = getFromLocalStorage("digital");
    if (digitalValue == null) {
      digitalValue = 0;
      digitalInput.value = 0;
      digitalInputValue = digitalInput.value;
    } else {
      digitalInput.value = digitalValue;
      digitalInputValue = digitalInput.value;
    }
  });

  //   Resetting input filed to 0
  digitalResetButton.addEventListener("click", function () {
    const resetDT = confirm("Are you sure you want to reset your record?");
    let targetValueBefore = digitalInput.value;
    if (resetDT == true) {
      // vibrateDevice(200);
      clickEffect(200);
      digitalInputValue = parseInt(digitalInputValue);
      digitalInputValue = digitalInputValue - digitalInputValue;
      digitalInput.value = digitalInputValue;
      targetStore("reset", targetValueBefore);
      setLocalStorage("digital", digitalInputValue);
    }
  });

  //   Adding one to input filed
  digitalAddButton.addEventListener("click", function () {
    // vibrateDevice(200);
    clickEffect(200);
    digitalInputValue = parseInt(digitalInputValue);
    digitalInputValue = digitalInputValue + 1;
    digitalInput.value = digitalInputValue;
    targetStore("add", 0);
    setLocalStorage("digital", digitalInputValue);
  });

  //   Deducting one to input filed
  digitalDeductButton.addEventListener("click", function () {
    // vibrateDevice(200);
    clickEffect(200);
    digitalInputValue = parseInt(digitalInputValue);
    if (digitalInputValue == 0) {
      digitalInputValue = 0;
    } else {
      digitalInputValue = digitalInputValue - 1;
    }
    targetStore("deduct", digitalInput.value);
    setLocalStorage("digital", digitalInputValue);
    digitalInput.value = digitalInputValue;
  });
};

//Setting localStorage
const setLocalStorage = (key, val) => {
  localStorage.setItem(key, val);
  // console.log(localStorage.getItem(key));
};
//   Getting item from localstorage
const getFromLocalStorage = (key) => {
  const storeVal = localStorage.getItem(key);
  return storeVal;
};

note.addEventListener("keyup", () => {
  setLocalStorage("note", note.value);
});

window.addEventListener("load", function () {
  const theme = getFromLocalStorage("theme");
  addTheme(theme);
  // preloader.classList.add("loading-finish");~
  const oldNote = getFromLocalStorage("note");
  const oldTarget = getFromLocalStorage("target");
  if (oldNote != null) {
    note.value = oldNote;
  }

  if (oldTarget != null) {
    target.value = oldTarget;
  } else {
    target.value = 0;
  }
});

target.addEventListener("keyup", () => {
  setLocalStorage("target", target.value);
});

const targetStore = (action, inputVal) => {
  if (target.value <= 0) {
    target.value = 0;
  } else {
    if (action == "add") {
      setLocalStorage("target", target.value - 1);
      target.value = target.value - 1;
      if (target.value == 0) {
        setLocalStorage("target", 0);
        // vibrateDevice(300);
        clickEffect(300);

        alert("Target Reached");
      }
    }

    if (action == "deduct") {
      if (inputVal != 0) {
        setLocalStorage("target", Math.abs(-target.value - 1));
        target.value = Math.abs(-target.value - 1);
      }
    }

    if (action == "reset") {
      let input = inputVal;
      let tar = target.value;
      console.log(Math.abs(-tar - input));
      setLocalStorage("target", Math.abs(-tar - input));
      target.value = Math.abs(-tar - input);
    }
  }
};

// dark theme
// function
function addTheme(theme) {
  const body = document.querySelector("body");
  if (theme == "default") {
    body.classList.remove("dark");
  } else {
    body.classList.toggle(theme);
  }
}
// Theme's
darkTheme = document.querySelector(".dark-theme");
defaultTheme = document.querySelector(".default-theme");

darkTheme.addEventListener("click", function () {
  addTheme("dark");
  setLocalStorage("theme", "dark");
});

defaultTheme.addEventListener("click", function () {
  addTheme("default");
  setLocalStorage("theme", "default");
});

// sound effect
const setEffect = (sound) => {
  if (getFromLocalStorage("click-effect")) {
    localStorage.removeItem("click-effect");
  }
  setLocalStorage("click-effect", sound);
};

huaweiClick.addEventListener("click", () => {
  setEffect("huaweiClick");
  playClickEffect("assets/beep/beep.mp3");
});
vibrate.addEventListener("click", () => {
  setEffect("vibrate");
  vibrateDevice(200);
});

const playClickEffect = (path) => {
  const clickEffect = new Audio(path);
  // clickEffect.volume(0.5);
  clickEffect.play();
};

const clickEffect = (duration = 200) => {
  // save current effect type
  let effect = getFromLocalStorage("click-effect");
  // get current effect type
  if (effect == "vibrate") {
    vibrateDevice(duration);
  }
  if (effect == "huaweiClick") {
    playClickEffect("assets/beep/beep.mp3");
  }
};
let listening = false;
// voice to text
const record = () => {
  VTT.setAttribute("src", recordingOn);
  const SpeechRecognition =
    window.speechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  recognition.addEventListener("result", (e) => {
    for (const res of e.results) {
      const transcript = res[0].transcript;
      console.log(transcript);
      note.innerHTML = transcript;
    }
  });
  recognition.addEventListener("end", (e) => {
    VTT.setAttribute("src", recordingOff);
  });
  if (recognition.interimResults) {
    VTT.setAttribute("src", recordingOn);
  } else {
    VTT.setAttribute("src", recordingOff);
  }
  recognition.start();
};
digitalTasbeeh();
