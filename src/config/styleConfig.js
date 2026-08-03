import { Circle, Fill, Stroke, Style, Text } from 'ol/style';

// Convert '0.0' to '0'
const cleanFloor = (floor) => {
  return !Number.isNaN(Number(floor))
    ? parseFloat(floor, 10).toString()
    : floor;
};

const lineStyler = (lineStyle) => {
  return lineStyle.map((style) => {
    return new Style({
      stroke: new Stroke({
        color: style[0],
        lineDash: style[2],
        width: style[1],
      }),
    });
  });
};

const railLineStyle = lineStyler([
  ['darkred', 6],
  ['red', 3],
]);

const railLineHoveredStyle = lineStyler([
  ['darkred', 7],
  ['red', 4],
]);

const busLineStyle = lineStyler([
  ['rgb(153,153,0)', 6],
  ['yellow', 3],
]);

const busLineHoveredStyle = lineStyler([
  ['rgb(153,153,0)', 7],
  ['yellow', 4],
]);

const othersLineStyle = lineStyler([
  ['darkblue', 6],
  ['blue', 3],
]);

const othersLineHoveredStyle = lineStyler([
  ['darkblue', 7],
  ['blue', 4],
]);

const railPointStyle = new Style({
  image: new Circle({
    fill: new Fill({ color: 'red' }),
    radius: 7,
    stroke: new Stroke({ color: 'darkred', width: 2 }),
  }),
});

export const floorsColor = {
  '-1': '#48CAE4',
  '-2': '#90E0EF',
  '-3': '#ADE8F4',
  '-4': '#CAF0F8',
  0: '#00B4D8',
  1: '#0096C7',
  2: '#0077B6',
  3: '#023E8A',
  4: '#03045E',
};

const floorsColorGrey = {
  '-1': '#A7A7A7',
  '-2': '#CACACA',
  '-3': '#D8D8D8',
  '-4': '#E6E6E6',
  0: '#848484',
  1: '#747474',
  2: '#646464',
  3: '#434343',
  4: '#222222',
};

const getPedestrianStyleColor = (floor, activeFloor) => {
  const f = cleanFloor(floor);
  let floorColor = f === activeFloor ? floorsColor[f] : floorsColorGrey[f];
  if (activeFloor === '2D') {
    floorColor = floorsColor['0'];
  }
  return floorColor || 'black';
};

const pedestrianGeopsPointStyle = (floor, activeFloor) => {
  return new Style({
    image: new Circle({
      fill: new Fill({
        color: getPedestrianStyleColor(floor, activeFloor),
      }),
      radius: 8,
    }),
  });
};

const busPointStyle = new Style({
  image: new Circle({
    fill: new Fill({ color: 'yellow' }),
    radius: 7,
    stroke: new Stroke({ color: 'rgb(153,153,0)', width: 2 }),
  }),
});

const othersPointStyle = new Style({
  image: new Circle({
    fill: new Fill({ color: 'blue' }),
    radius: 7,
    stroke: new Stroke({ color: 'darkblue', width: 2 }),
  }),
});

const pointStyleFunction = (mot, floor, activeFloor) => {
  let style = othersPointStyle;
  if (mot === 'rail') {
    style = railPointStyle;
  }
  if (mot === 'bus') {
    style = busPointStyle;
  }
  if (mot === 'foot') {
    style = pedestrianGeopsPointStyle(floor, activeFloor);
  }
  return style;
};

const lineStyleFunction = (mot, isHovered, floor, activeFloor, text) => {
  let style;
  if (mot === 'rail') {
    style = isHovered ? railLineHoveredStyle : railLineStyle;
  } else if (mot === 'bus') {
    style = isHovered ? busLineHoveredStyle : busLineStyle;
  } else if (mot === 'foot') {
    const floorColor = getPedestrianStyleColor(floor, activeFloor);
    style = lineStyler([[floorColor, 7, [1, 10]]]);
  } else {
    style = isHovered ? othersLineHoveredStyle : othersLineStyle;
  }
  if (text) {
    style[0].setText(
      new Text({
        fill: new Fill({
          color: 'white',
        }),
        scale: 2,
        stroke: new Stroke({
          color: [0, 0, 0],
          width: 2,
        }),
        text,
      }),
    );
  }
  return style;
};

export { lineStyleFunction, pointStyleFunction };
