window.addEventListener("load", function loadHandler() {
  const displacementUnit = 99;
  const screen = document.querySelector(".screen");
  const elevator = document.querySelector(".elevator");
  const elevatorScreen = document.querySelector(".elevatorScreen");
  const elevatorDoorL = document.querySelector(".elevatorDoorL");
  const elevatorDoorR = document.querySelector(".elevatorDoorR");
  const buttons = document.querySelector(".choices");
  const startButton = document.querySelector(".startButton");
  const resetButton = document.querySelector(".resetButton");

  let requestedFloors = [];

  // Populate an array with the requested floors from the clicked buttons
  buttons.addEventListener("click", function eventHandler(event) {
    // Store the targeted element of the event (the clicked button)
    const clickedButton = event.target;

    // Check if the clicked button contains the class 'floorButton'
    if (clickedButton.classList.contains("floorButton")) {
      // Retrieve the id of the clicked button, convert it to a number, & add it to requested floors array
      const requestedFloor = Number(clickedButton.id);
      requestedFloors.push(requestedFloor);
      console.log(requestedFloors);

      // Display the requested floors on the screen
      screen.innerHTML =
        screen.innerHTML +
        `<div id="FOS${requestedFloor}" class="FloorsOnScreen">F${
          requestedFloors[requestedFloors.length - 1]
        }</div>`;
    }
  });

  function closeDoor() {
    elevatorDoorL.style.width = "48%";
    elevatorDoorR.style.width = "48%";
  }

  function openDoor() {
    elevatorDoorL.style.width = "0%";
    elevatorDoorR.style.width = "0%";
  }

  function sortFloors() {
    let computedStyle = getComputedStyle(elevator);
    let currentPosition = parseInt(computedStyle.bottom);

    for (let i = 0; i < requestedFloors.length; i++) {
      let targetPosition = requestedFloors[i] * displacementUnit;
      const direction = targetPosition - currentPosition >= 0 ? 1 : -1;
      if (direction === 1) {
        requestedFloors.sort((a, b) => a - b);
        console.log(`Sorted Up: ${requestedFloors}`);
        console.log(`targetPosition: ${requestedFloors[i]}`);
      } else if (direction === -1) {
        requestedFloors.sort((a, b) => b - a);
        console.log(`Sorted Down: ${requestedFloors}`);
        console.log(`targetPosition: ${requestedFloors[i]}`);
      }

      function moveElevator() {
        elevator.style.bottom = requestedFloors[i] * displacementUnit + "px";

        // Open door when elevator reaches the floor
        setTimeout(openDoor, 2000);

        // Close door after a short delay
        setTimeout(closeDoor, 3500);

        // Clear requestedFloors if the elevator has reached the last floor in the array
        if (
          targetPosition ===
          requestedFloors[requestedFloors.length - 1] * displacementUnit
        ) {
          requestedFloors = [];
          console.log(`Requested floors cleared: ${requestedFloors}`);
        }
      }
      setTimeout(moveElevator, 4000 * i); // Delay for each floor
    }
  }

  startButton.addEventListener("click", function startHandler() {
    closeDoor();
    setTimeout(sortFloors, 500);
  });

  resetButton.addEventListener("click", function resetHandler() {
    openDoor();
    elevator.style.bottom = 0 + "px";
    requestedFloors = [];
    screen.innerHTML = "";
  });
});
