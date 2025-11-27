/* PLEASE DO NOT CHANGE THIS FRAMEWORK ....
the get requests are all implemented and working ... 
so there is no need to alter ANY of the existing code: 
rather you just ADD your own ... */

window.onload = function () {
  document.querySelector("#queryChoice").selectedIndex = 0;
  //create once :)
  let description = document.querySelector("#Ex4_title");
  //array to hold the dataPoints
  let dataPoints = [];

  // /**** GeT THE DATA initially :: default view *******/
  // /*** no need to change this one  **/
  runQueryDefault("onload");

  /***** Get the data from drop down selection ****/
  let querySelectDropDown = document.querySelector("#queryChoice");

  querySelectDropDown.onchange = function () {
    console.log(this.value);
    let copyVal = this.value;
    console.log(copyVal);
    runQuery(copyVal);
  };

  /******************* RUN QUERY***************************  */
  async function runQuery(queryPath) {
    // // //build the url -end point
    const url = `/${queryPath}`;
    try {
      let res = await fetch(url);
      let resJSON = await res.json();
      console.log(resJSON);

      //reset the
      document.querySelector("#childOne").innerHTML = "";
      description.textContent = "";
      document.querySelector("#parent-wrapper").style.background =
        "rgba(51,102,255,.2)";

      switch (queryPath) {
        case "default": {
          displayAsDefault(resJSON);
          break;
        }
        case "one": {
          //sabine done
          displayInCirclularPattern(resJSON);
          break;
        }
        case "two": {
          //sabine done
          displayByGroups(resJSON, "weather", "eventName");
          break;
        }
        /***** TO DO FOR EXERCISE 4 *************************
         ** 1: Once you have implemented the mongodb query in server.py,
         ** you will receive it from the get request (THE FETCH HAS ALREADY BEEN IMPLEMENTED:: SEE ABOVE) 
         ** and will automatically will enter into the correct select case
         **  - based on the value that the user chose from the drop down list...)
         ** You need to design and call a custom display function FOR EACH query that you construct ...
         ** 4 queries - I want 4 UNIQUE display functions - you can use the ones I created
         ** as inspiration ONLY - DO NOT just copy and change colors ... experiment, explore, change ...
         ** you can create your own custom objects - but NO images, video or sound... (will get 0).
         ** bonus: if your visualizations(s) are interactive or animate.
         ****/
        case "three": {
          displayAsSolarSystem(resJSON);
          break;
        }
        case "four": {
          displayAsPlanetaryAlignment(resJSON)
          // TODO
          break;
        }

        case "five": {
          displayAsBinaryStarSystem(resJSON)
          // TODO
          break;
        }
        case "six": {
          displayAsDarkNebula(resJSON)
          // TODO
          break;
        }
        default: {
          console.log("default case");
          break;
        }
      } //switch
    } catch (err) {
      console.log(err);
    }
  }
  //will make a get request for the data ...

  /******************* RUN DEFAULT QUERY***************************  */
  async function runQueryDefault(queryPath) {
    // // //build the url -end point
    const url = `/${queryPath}`;
    try {
      let res = await fetch(url);
      let resJSON = await res.json();
      console.log(resJSON);
      displayAsDefault(resJSON);
    } catch (err) {
      console.log(err);
    }
  }
  /*******************DISPLAY AS GROUP****************************/

  function displayByGroups(resultObj, propOne, propTwo) {
    dataPoints = [];
    let finalHeight = 0;
    //order by WEATHER and Have the event names as the color  ....

    //set background of parent ... for fun ..
    document.querySelector("#parent-wrapper").style.background =
      "rgba(51, 153, 102,1)";
    description.textContent = "BY WEATHER AND ALSO HAVE EVENT NAMES {COLOR}";
    description.style.color = "rgb(179, 230, 204)";

    let coloredEvents = {};
    let resultSet = resultObj.results;

    //reget
    let possibleEvents = resultObj.events;
    let possibleColors = [
      "rgb(198, 236, 217)",
      "rgb(179, 230, 204)",
      "rgb(159, 223, 190)",
      "rgb(140, 217, 177)",
      "rgb(121, 210, 164)",
      "rgb(102, 204, 151)",
      "rgb(83, 198, 138)",
      "rgb(64, 191, 125)",
      "rgb(255, 204, 179)",
      "rgb(255, 170, 128)",
      "rgb(255, 153, 102)",
      "rgb(255, 136, 77)",
      "rgb(255, 119, 51)",
      "rgb(255, 102, 26)",
      "rgb(255, 85, 0)",
      "rgb(230, 77, 0)",
      "rgb(204, 68, 0)",
    ];

    for (let i = 0; i < possibleColors.length; i++) {
      coloredEvents[possibleEvents[i]] = possibleColors[i];
    }

    let offsetX = 20;
    let offsetY = 150;
    // find the weather of the first one ...
    let currentGroup = resultSet[0][propOne];
    console.log(currentGroup);
    let xPos = offsetX;
    let yPos = offsetY;

    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(
        new myDataPoint(
          resultSet[i].dataId,
          resultSet[i].day,
          resultSet[i].weather,
          resultSet[i].start_mood,
          resultSet[i].after_mood,
          resultSet[i].after_mood_strength,
          resultSet[i].event_affect_strength,
          resultSet[i].event_name,
          //map to the EVENT ...
          coloredEvents[resultSet[i].event_name],
          //last parameter is where should this go...
          document.querySelector("#childOne"),
          //which css style///
          "point_two"
        )
      );

      /** check if we have changed group ***/
      if (resultSet[i][propOne] !== currentGroup) {
        //update
        currentGroup = resultSet[i][propOne];
        offsetX += 150;
        offsetY = 150;
        xPos = offsetX;
        yPos = offsetY;
      }
      // if not just keep on....
      else {
        if (i % 10 === 0 && i !== 0) {
          xPos = offsetX;
          yPos = yPos + 15;
        } else {
          xPos = xPos + 15;
        }
      } //end outer else

      dataPoints[i].update(xPos, yPos);
      finalHeight = yPos;
    } //for

    document.querySelector("#childOne").style.height = `${finalHeight + 20}px`;
  } //function

  /*****************DISPLAY IN CIRCUlAR PATTERN:: <ONE>******************************/
  function displayInCirclularPattern(resultOBj) {
    //reset
    dataPoints = [];
    let xPos = 0;
    let yPos = 0;
    //for circle drawing
    let angle = 0;
    let centerX = window.innerWidth / 2;
    let centerY = 350;

    let scalar = 300;
    let yHeight = Math.cos(angle) * scalar + centerY;

    let resultSet = resultOBj.results;
    let coloredMoods = {};

    let possibleMoods = resultOBj.moods;
    let possibleColors = [
      "rgba(0, 64, 255,.5)",
      "rgba(26, 83, 255,.5)",
      "rgba(51, 102, 255,.7)",
      "rgba(51, 102, 255,.4)",
      "rgba(77, 121,255,.6)",
      "rgba(102, 140, 255,.6)",
      "rgba(128, 159, 255,.4)",
      "rgba(153, 179, 255,.3)",
      "rgba(179, 198, 255,.6)",
      "rgba(204, 217, 255,.4)",
    ];

    for (let i = 0; i < possibleMoods.length; i++) {
      coloredMoods[possibleMoods[i]] = possibleColors[i];
    }

    //set background of parent ... for fun ..
    document.querySelector("#parent-wrapper").style.background =
      "rgba(0, 26, 102,1)";
    description.textContent = "BY AFTER MOOD";
    description.style.color = "rgba(0, 64, 255,.5)";

    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(
        new myDataPoint(
          resultSet[i].dataId,
          resultSet[i].day,
          resultSet[i].weather,
          resultSet[i].start_mood,
          resultSet[i].after_mood,
          resultSet[i].after_mood_strength,
          resultSet[i].event_affect_strength,
          resultSet[i].event_name,
          //map to the day ...
          coloredMoods[resultSet[i].after_mood],
          //last parameter is where should this go...
          document.querySelector("#childOne"),
          //which css style///
          "point_two"
        )
      );
      /*** circle drawing ***/
      xPos = Math.sin(angle) * scalar + centerX;
      yPos = Math.cos(angle) * scalar + centerY;
      angle += 0.13;

      if (angle > 2 * Math.PI) {
        angle = 0;
        scalar -= 20;
      }
      dataPoints[i].update(xPos, yPos);
    } //for

    document.querySelector("#childOne").style.height = `${yHeight}px`;
  } //function

  /*****************DISPLAY AS DEFAULT GRID :: AT ONLOAD ******************************/
  function displayAsDefault(resultOBj) {
    //reset
    dataPoints = [];
    let xPos = 0;
    let yPos = 0;
    const NUM_COLS = 50;
    const CELL_SIZE = 20;
    let coloredDays = {};
    let resultSet = resultOBj.results;
    possibleDays = resultOBj.days;
    /*
  1: get the array of days (the second entry in the resultOBj)
  2: for each possible day (7)  - create a key value pair -> day: color and put in the
  coloredDays object
  */
    console.log(possibleDays);
    let possibleColors = [
      "rgb(255, 102, 153)",
      "rgb(255, 77, 136)",
      "rgb(255, 51, 119)",
      "rgb(255, 26, 102)",
      "rgb(255, 0, 85)",
      "rgb(255, 0, 85)",
      "rgb(255, 0, 85)",
    ];

    for (let i = 0; i < possibleDays.length; i++) {
      coloredDays[possibleDays[i]] = possibleColors[i];
    }
/* for through each result
1: create a new MyDataPoint object and pass the properties from the db result entry to the object constructor
2: set the color using the coloredDays object associated with the resultSet[i].day
3:  put into the dataPoints array.
**/
    //set background of parent ... for fun ..
    document.querySelector("#parent-wrapper").style.background =
      "rgba(255,0,0,.4)";
    description.textContent = "DEfAULT CASE";
    description.style.color = "rgb(255, 0, 85)";

    //last  element is the helper array...
    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(
        new myDataPoint(
          resultSet[i].dataId,
          resultSet[i].day,
          resultSet[i].weather,
          resultSet[i].start_mood,
          resultSet[i].after_mood,
          resultSet[i].after_mood_strength,
          resultSet[i].event_affect_strength,
          resultSet[i].evnet_name,
          //map to the day ...
          coloredDays[resultSet[i].day],
          //last parameter is where should this go...
          document.querySelector("#childOne"),
          //which css style///
          "point"
        )
      );

/** this code is rather brittle - but does the job for now .. draw a grid of data points ..
//*** drawing a grid ****/
      if (i % NUM_COLS === 0) {
        //reset x and inc y (go to next row)
        xPos = 0;
        yPos += CELL_SIZE;
      } else {
        //just move along in the column
        xPos += CELL_SIZE;
      }
      //update the position of the data point...
      dataPoints[i].update(xPos, yPos);
    } //for
    document.querySelector("#childOne").style.height = `${yPos + CELL_SIZE}px`;
  } //function

  /***********************************************/

//visualization for number three
function displayAsSolarSystem(resultObj) {
    dataPoints = [];
    let resultSet = resultObj.results;

    document.querySelector("#parent-wrapper").style.background = "rgba(39, 39, 107, 1)";
    description.textContent = "SOLAR SYSTEM: POSITIVE MOODS ";
    description.style.color = "#FFD700";

    const moodColors = {
      'happy': 'rgba(255, 215, 0, 0.9)',   
      'calm': 'rgba(65, 105, 225, 0.9)',     
      'serene': 'rgba(230, 230, 250, 0.9)',   
      'neutral': 'rgba(192, 192, 192, 0.9)',  
      'well': 'rgba(50, 205, 50, 0.9)'       
    };

    const centerX = window.innerWidth / 2;
    const centerY= 400;
    const planetsPerOrbit = 6;

    for (let i = 0; i < resultSet.length; i++) {
      const color = moodColors[resultSet[i].after_mood] || 'rgba(128, 128, 128, 0.9)';
    
        dataPoints.push(
            new myDataPoint(
                resultSet[i].dataId,
                resultSet[i].day,
                resultSet[i].weather,
                resultSet[i].start_mood,
                resultSet[i].after_mood,
                resultSet[i].after_mood_strength,
                resultSet[i].event_affect_strength,
                resultSet[i].event_name,
                color,
                document.querySelector("#childOne"),
                "point_two"
            )
        );


      // Calculate the  orbit position
        const orbitNum = Math.floor(i / planetsPerOrbit);
        const posInOrbit = i % planetsPerOrbit;
        const angle = (posInOrbit / planetsPerOrbit) * Math.PI * 2;
        const orbitRadius = 100 + (orbitNum * 80);
        
        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius;
        
        dataPoints[i].update(x, y);
    }
    
    const maxOrbit = Math.ceil(resultSet.length / planetsPerOrbit);
    const totalHeight = centerY + (maxOrbit * 80) + 150;
    document.querySelector("#childOne").style.height = `${totalHeight}px`;
}


// visualization for number 4 
function displayAsPlanetaryAlignment(resultObj) {
    dataPoints = [];
    let resultSet = resultObj.results;
    
    document.querySelector("#parent-wrapper").style.background = "rgba(10, 10, 40, 1)";
    description.textContent = "PLANETARY ALIGNMENT ";
    description.style.color = "#f7f7f7ff";
    
    // Different planet types with colors
    const planetColors = [
        'rgba(255, 99, 71, 0.85)',     
        'rgba(65, 105, 225, 0.85)',    
        'rgba(255, 215, 0, 0.85)',     
        'rgba(50, 205, 50, 0.85)',     
        'rgba(255, 105, 180, 0.85)',   
        'rgba(139, 69, 19, 0.85)',     
        'rgba(135, 206, 235, 0.85)',   
        'rgba(147, 112, 219, 0.85)'    
    ];
    
    const spacing = Math.max(30, (window.innerWidth - 100) / resultSet.length);
    const alignmentY = 350;
    
    for (let i = 0; i < resultSet.length; i++) {
        const color = planetColors[i % planetColors.length];
        
        dataPoints.push(
            new myDataPoint(
                resultSet[i].dataId,
                resultSet[i].day,
                resultSet[i].weather,
                resultSet[i].start_mood,
                resultSet[i].after_mood,
                resultSet[i].after_mood_strength,
                resultSet[i].event_affect_strength,
                resultSet[i].event_name,
                color,
                document.querySelector("#childOne"),
                "point_two"
            )
        );
        
        // Position planets 
        const x = 50 + (i * spacing);
        const double = Math.sin(i * 0.5) * 30;
        const y = alignmentY + double;
        
        dataPoints[i].update(x, y);
    }
    
    document.querySelector("#childOne").style.height = "600px";
}

// visualization for number 5

function displayAsBinaryStarSystem(resultObj) {
    dataPoints = [];
    let resultSet = resultObj.results;
    
    document.querySelector("#parent-wrapper").style.background = "rgba(0, 0, 30, 1)";
    description.textContent = "BINARY STARS - MONDAY (BLUE) VS TUESDAY (ORANGE)";
    description.style.color = "#FFA500";
    
    const mondayData = resultSet.filter(e => e.day === 'Monday');
    const tuesdayData = resultSet.filter(e => e.day === 'Tuesday');


// Monday star system (left: BLUE tinted planets)
const star1X = window.innerWidth * 0.3;
const star1Y = 400;

// Blue color palette for Monday
const mondayColors = {
    'stormy': 'rgba(75, 0, 130, 0.85)',    
    'raining': 'rgba(30, 144, 255, 0.85)',  
    'sunny': 'rgba(135, 206, 250, 0.85)',    
    'cloudy': 'rgba(176, 196, 222, 0.85)',   
    'clear': 'rgba(135, 206, 235, 0.85)',   
    'snowing': 'rgba(240, 248, 255, 0.85)',  
    'grey': 'rgba(119, 136, 153, 0.85)',     
    'fog': 'rgba(176, 224, 230, 0.85)'       
};

mondayData.forEach((entry, i) => {
    const color = mondayColors[entry.weather] || 'rgba(65, 105, 225, 0.85)'; 
    
    dataPoints.push(
        new myDataPoint(
            entry.dataId,
            entry.day,
            entry.weather,
            entry.start_mood,
            entry.after_mood,
            entry.after_mood_strength,
            entry.event_affect_strength,
            entry.event_name,
            color,
            document.querySelector("#childOne"),
            "point_two"
        )
    );
    
    const angle = (i / mondayData.length) * Math.PI * 2;
    const orbitRadius = 100 + (i % 3) * 60;
    const x = star1X + Math.cos(angle) * orbitRadius;
    const y = star1Y + Math.sin(angle) * orbitRadius;
    
    dataPoints[dataPoints.length - 1].update(x, y);
});

// Tuesday star system (right:ORANGE tinted planets)
const star2X = window.innerWidth * 0.7;
const star2Y = 400;

// Orange color palette for Tuesday
const tuesdayColors = {
    'stormy': 'rgba(184, 134, 11, 0.85)',    
    'raining': 'rgba(255, 165, 0, 0.85)',   
    'sunny': 'rgba(255, 215, 0, 0.85)',     
    'cloudy': 'rgba(255, 218, 185, 0.85)',   
    'clear': 'rgba(255, 200, 124, 0.85)',   
    'snowing': 'rgba(255, 239, 213, 0.85)', 
    'grey': 'rgba(205, 133, 63, 0.85)',     
    'fog': 'rgba(255, 228, 196, 0.85)'      
};

tuesdayData.forEach((entry, i) => {
    const color = tuesdayColors[entry.weather] || 'rgba(255, 140, 0, 0.85)'; 
    
    dataPoints.push(
        new myDataPoint(
            entry.dataId,
            entry.day,
            entry.weather,
            entry.start_mood,
            entry.after_mood,
            entry.after_mood_strength,
            entry.event_affect_strength,
            entry.event_name,
            color,
            document.querySelector("#childOne"),
            "point_two"
        )
    );
    
    const angle = (i / tuesdayData.length) * Math.PI * 2;
    const orbitRadius = 100 + (i % 3) * 60;
    const x = star2X + Math.cos(angle) * orbitRadius;
    const y = star2Y + Math.sin(angle) * orbitRadius;
    
    dataPoints[dataPoints.length - 1].update(x, y);
    
});
}

document.querySelector("#childOne").style.height = "800px";

//vizualition for number 6 

function displayAsDarkNebula(resultObj) {
    dataPoints = [];
    let resultSet = resultObj.results;
    
    document.querySelector("#parent-wrapper").style.background = "rgba(0, 0, 0, 1)";
    description.textContent = "DARK NEBULA: NEGATIVE MOOD PLANETS ";
    description.style.color = "#696969";
    
    // Dark planet colors
    const darkPlanetColors = [
        'rgba(47, 79, 79, 0.9)',      // Dark slate
        'rgba(72, 61, 139, 0.9)',     // Dark slate blue
        'rgba(139, 69, 19, 0.9)',     // Saddle brown
        'rgba(105, 105, 105, 0.9)',   // Dim gray
        'rgba(85, 107, 47, 0.9)',     // Dark olive
        'rgba(75, 0, 130, 0.9)',      // Indigo
        'rgba(128, 0, 0, 0.9)',       // Maroon
        'rgba(47, 47, 47, 0.9)'       // Very dark gray
    ];
    
    // Create random d positions like asteroids
    for (let i = 0; i < resultSet.length; i++) {
        const color = darkPlanetColors[i % darkPlanetColors.length];
        
        dataPoints.push(
            new myDataPoint(
                resultSet[i].dataId,
                resultSet[i].day,
                resultSet[i].weather,
                resultSet[i].start_mood,
                resultSet[i].after_mood,
                resultSet[i].after_mood_strength,
                resultSet[i].event_affect_strength,
                resultSet[i].event_name,
                color,
                document.querySelector("#childOne"),
                "point_two"
            )
        );
        

      //note: The AI helped me understand how to create a grid structure with randomization effect I was trying for negative mood data.

       //grid but randomize within cells
        const cols = 8;
        const cellWidth = window.innerWidth / cols;
        const cellHeight = 80;
        
        const col = i % cols;
        const row = Math.floor(i / cols);
        
        const baseX = col * cellWidth + cellWidth / 2;
        const baseY = row * cellHeight + 100;
        
        // randomness 
        const x = baseX + (Math.random() - 0.5) * cellWidth * 0.8;
        const y = baseY + (Math.random() - 0.5) * cellHeight * 0.6;
        
        dataPoints[i].update(x, y);
    }
    
    const rows = Math.ceil(resultSet.length / 5);
    const finalHeight = rows * 80 + 150;
    document.querySelector("#childOne").style.height = `${finalHeight}px`;
}


};
