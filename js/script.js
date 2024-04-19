window.addEventListener("load", function loadHandler() {
  const displacementUnit = 100;
  const screen = document.querySelector(".screen");
  const stepsScreen = document.querySelector(".stepsScreen");
  const elevator = document.querySelector(".elevator");
  const elevatorScreen = document.querySelector(".elevatorScreen");
  const elevatorDoorL = document.querySelector(".elevatorDoorL");
  const elevatorDoorR = document.querySelector(".elevatorDoorR");
  const buttons = document.querySelector(".choices");
  const startButton = document.querySelector(".startButton");
  const resetButton = document.querySelector(".resetButton");

  let requestedFloors = [];
  let nextFloor = 0;

  // Populate an array with the requested floors from the clicked buttons
  buttons.addEventListener("click", function eventHandler(event) {
    // Store the targeted element of the event (the clicked button)
    const clickedButton = event.target;

    // Check if the clicked button contains the class 'floorButton'
    if (clickedButton.classList.contains("floorButton")) {
      // Retrieve the id of the clicked button, convert it to a number, & add it to requested floors array
      const requestedFloor = Number(clickedButton.textContent[1]);

      if (requestedFloors.length === 0 && requestedFloor === 0) {
        return;
      } else {
        requestedFloors.push(requestedFloor);
        console.log(requestedFloors);

        // Create div elements to display the requested floors on the control screen
        const floorsOnScreen = document.createElement("div");
        floorsOnScreen.classList.add("FloorsOnScreen");
        floorsOnScreen.textContent = `F${
          requestedFloors[requestedFloors.length - 1]
        }`;

        // Append the created div elements to the screen
        screen.appendChild(floorsOnScreen);
      }
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

  // Moving the elevator to each floor in the sorted array
  function moveNextFloor(nextFloor) {
    // Calculate the target position of the next floor
    const targetPosition = requestedFloors[nextFloor] * displacementUnit;
    elevator.style.bottom = targetPosition + "px";

    console.log(`targetPosition: ${requestedFloors[nextFloor]}`);

    // Open door when elevator reaches the floor
    setTimeout(openDoor, 2000);
    // Close door after a short delay
    setTimeout(closeDoor, 3500);

    // Clear requestedFloors if the elevator has reached the last floor in the array
    if (
      targetPosition ===
      requestedFloors[requestedFloors.length - 1] * displacementUnit
    ) {
      console.log(
        `Requested floors cleared at floor ${
          requestedFloors[requestedFloors.length - 1]
        }`
      );
      requestedFloors = [];
    }

    // Move to the next floor after a delay
    nextFloor++;
    if (nextFloor < requestedFloors.length) {
      // Function to apply the setTimeout to
      function floorDelay() {
        moveNextFloor(nextFloor);
      }
      // Delay before moving to the next floor
      setTimeout(floorDelay, 4000);
    }
  }

  // Moving the elevator
  function moveElevator() {
    // Start the motion of the elevator
    moveNextFloor(nextFloor);
  }

  function calculateSteps() {
    let totalSteps = 0;
    // To copy the requestedFloors array so that the original array is not modified
    stepsFloor = requestedFloors.slice();
    // To add 0 to the beginning of the array so it is counted when steps are calculated
    stepsFloor.unshift(0);

    // Iterate through the stepsFloor array to calculate the total steps
    for (let i = 0; i < stepsFloor.length - 1; i++) {
      // Add the absolute value of the difference between two successive elements, then add them all to get the total steps
      totalSteps = totalSteps + Math.abs(stepsFloor[i + 1] - stepsFloor[i]);
    }
    return totalSteps;
  }

  // Start the elevator movement when the start button is clicked
  startButton.addEventListener("click", function startHandler() {
    if (requestedFloors.length !== 0 && requestedFloors[0] !== 0) {
      closeDoor();
      // Wait 500ms before moving the elevator
      setTimeout(moveElevator, 500);

      // Calculate the total steps
      const totalSteps = calculateSteps();
      // Display the result
      stepsScreen.innerText = `${totalSteps} Steps`;
    }
  });

  // Reset the elevator state, clear the array, and clear the screen when the reset button is clicked
  resetButton.addEventListener("click", function resetHandler() {
    openDoor();
    elevator.style.bottom = 0 + "px";
    requestedFloors = [];
    stepsScreen.innerText = `0 Steps`;

    // Remove all child elements from the screen one by one
    while (screen.firstChild) {
      screen.removeChild(screen.firstChild);
    }
  });
});
