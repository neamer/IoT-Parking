const firebaseConfig = HIDDEN;

firebase.initializeApp(firebaseConfig);

class Position {
  static TOP = "TOP";
  static LEFT = "LEFT";
  static RIGHT = "RIGHT";
  static BOTTOM = "BOTTOM";
  static MIDDLETOP = "MIDDLETOP";
  static MIDDLEBOTTOM = "MIDDLEBOTTOM";

  static calc(number) {
    if (number >= 1 && number <= 12) {
      return this.TOP;
    } else if (number >= 13 && number <= 17) {
      return this.RIGHT;
    } else if (number >= 18 && number <= 29) {
      return this.BOTTOM;
    } else if (number >= 30 && number <= 34) {
      return this.LEFT;
    } else if (number >= 35 && number <= 44) {
      return this.MIDDLETOP;
    } else if (number >= 45 && number <= 54) {
      return this.MIDDLEBOTTOM;
    }
  }
}

class ParkingSpace {
  constructor(number) {
    this.number = number;
    this.position = Position.calc(number);
    this.dbRef = firebase.database().ref().child(number);

    this.dbRef.on("value", (taken) => {
      this.taken = taken.val();
      this.refresh();
    });
  }

  deploy() {
    this.html = document.createElement("div");
    this.html.classList.add("space", "space" + this.position);
    this.html.innerHTML = `<img src="assets/car.png" alt="car-icon" />`;

    if (this.taken) {
      this.html.classList.add("taken-space");
    }
    this.html.addEventListener("click", this.handleClick);
    document.getElementById(`parent${this.position}`).appendChild(this.html);
  }

  refresh() {
    if (this.taken) {
      this.html.classList.add("taken-space");
    } else {
      this.html.classList.remove("taken-space");
    }
  }

  handleClick = () => {
    this.taken = !this.taken;

    this.dbRef.set(this.taken);

    this.refresh();
  };
}

let InitializeApp = () => {
  for (let index = 1; index < 55; index++) {
    let space = new ParkingSpace(index);
    space.deploy();
  }
};

InitializeApp();
