const tagsContainerDOM = document.querySelector("#tags");
const valueTagDOM = document.querySelector("#valueTag");
const resultDOM = document.querySelector("#result");
const countDOM = document.querySelector("#count");
const tagDOM = document.querySelector("#tag");

let carsPerPage = 4;
let initialCars = 0;
let data;

const dataToFilter = {
  Miles_per_Gallon: null,
  Cylinders: null,
  Displacement: null,
  Horsepower: null,
  Weight_in_lbs: null,
  Acceleration: null,
  Year: null,
  Origin: null,
};

document.addEventListener("DOMContentLoaded", async () => {
  data = await fetch("./data.json").then((response) => response.json());

  showCars(data.slice(initialCars, carsPerPage), data.length);

  showTags();
});

const showTags = () => {
  let result = "";

  for (const property in dataToFilter) {
    if (dataToFilter[property] === null) {
      result += `
        <option value="${property}">${property.toUpperCase()}</option>
      `;
    }
  }

  tagDOM.innerHTML = result;
};

const addTag = () => {
  if (valueTagDOM.value === "" || tagDOM.value === "") return;

  dataToFilter[tagDOM.value] = valueTagDOM.value;
  let result = "";

  for (const property in dataToFilter) {
    if (dataToFilter[property] !== null) {
      result += `
        <div class="tagName">
          <span>${property}: </span>
          <span>${dataToFilter[property]}</span>
        </div>
      `;
    }
  }

  tagsContainerDOM.innerHTML = result;

  showTags();

  filterCars()
};

const showCars = (cars, i) => {
  let result = "";

  cars.forEach((car) => {
    const {
      Name,
      Miles_per_Gallon,
      Cylinders,
      Displacement,
      Horsepower,
      Weight_in_lbs,
      Acceleration,
      Year,
      Origin,
    } = car;

    result += `
        <div class="card">
            <picture class="card-img">
              <img src="./images/car.png" alt="Car"/>
            </picture>
            <div class="card-info">
                <p class="text-title">${Name}</p>
                <p class="text-body">Miles_per_Gallon: ${Miles_per_Gallon}</p>
                <p class="text-body">Cylinders: ${Cylinders}</p>
                <p class="text-body">Displacement: ${Displacement}</p>
                <p class="text-body">Horsepower: ${Horsepower}</p>
                <p class="text-body">Weight in lbs: ${Weight_in_lbs}</p>
                <p class="text-body">Acceleration: ${Acceleration}</p>
                <p class="text-body">Year: ${Year}</p>
                <p class="text-body">Origin: ${Origin}</p>
            </div>
        </div>
      `;
  });

  countDOM.innerHTML = i;

  resultDOM.innerHTML = result;
};

const changePage = () => {
  initialCars = carsPerPage;
  carsPerPage += 4;

  showCars(data.slice(initialCars, carsPerPage));
};

function filterCars() {
  const resultado = data
    .filter(filterMiles)
    .filter(filterCylinders)
    .filter(filterDisplacement)
    .filter(filterHorsepower)
    .filter(filterWeight)
    .filter(filterAcceleration)
    .filter(filterYear)
    .filter(filterOrigin);

  showCars(resultado, resultado.length);
}

function filterMiles(car) {
  const { Miles_per_Gallon } = dataToFilter;

  if (Miles_per_Gallon !== null) {
    return car.Miles_per_Gallon == Miles_per_Gallon;
  }

  return car;
}

function filterCylinders(auto) {
  const { Cylinders } = dataToFilter;

  if (Cylinders !== null) {
    return auto.Cylinders == Cylinders;
  }

  return auto;
}

function filterDisplacement(auto) {
  const { Displacement } = dataToFilter;

  if (Displacement !== null) {
    return auto.Displacement == Displacement;
  }

  return auto;
}

function filterHorsepower(auto) {
  const { Horsepower } = dataToFilter;

  if (Horsepower !== null) {
    return auto.Horsepower == Horsepower;
  }

  return auto;
}

function filterWeight(auto) {
  const { Weight_in_lbs } = dataToFilter;

  if (Weight_in_lbs !== null) {
    return auto.Weight_in_lbs == Weight_in_lbs;
  }

  return auto;
}

function filterAcceleration(auto) {
  const { Acceleration } = dataToFilter;

  if (Acceleration !== null) {
    return auto.Acceleration == Acceleration;
  }

  return auto;
}

function filterYear(auto) {
  const { Year } = dataToFilter;

  if (Year !== null) {
    return auto.Year == Year;
  }

  return auto;
}

function filterOrigin(auto) {
  const { Origin } = dataToFilter;

  if (Origin !== null) {
    return auto.Origin == Origin;
  }

  return auto;
}
