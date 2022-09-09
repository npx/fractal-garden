function drawForward() {
  cnv.line(0, 0, 0, -len);
  cnv.translate(0, -len);
}

function commonSetup() {
  console.log(cnv);

  // angleMode(DEGREES);
  cnv.resetMatrix();
  cnv.background(config.backgroundColor);
  cnv.stroke(config.fractalColor);
}

const drawRules = {
  V: () => {},
  W: () => {},
  X: () => {},
  Y: () => {},
  Z: () => {},
  G: drawForward,
  F: drawForward,
  f: () => cnv.translate(0, -len),
  "+": () => cnv.rotate((PI / 180) * angle * rotationDirection),
  "-": () => cnv.rotate((PI / 180) * angle * -rotationDirection),
  "|": () => cnv.rotate((PI / 180) * 180),
  "[": () => cnv.push(),
  "]": () => cnv.pop(),
  "#": () => cnv.strokeWeight((weight += weightIncrement)),
  "!": () => cnv.strokeWeight((weight -= weightIncrement)),
  ">": () => (len *= scale),
  "<": () => (len /= scale),
  "&": () => (rotationDirection = -rotationDirection),
  "(": () => (angle += angleIncrement),
  ")": () => (angle -= angleIncrement),
};

const ruleSet = {
  "Lévy Curve": {
    maxIterations: 18,
    axiom: "F",
    draw: drawRules,
    replace: {
      F: "-F++F-",
    },
    setup: () => {
      commonSetup();
      let initialLength =
        Math.min(cnv.width, cnv.height) *
        (cnv.width > cnv.height * 1.3 ? 0.7 : 0.45);
      len = len || initialLength;

      cnv.translate(
        cnv.width / 2 - initialLength / 2,
        cnv.height / 2 + initialLength / 2.6
      );
      cnv.rotate((PI / 180) * 90);
      angle = 45;
    },
    after: () => {
      len /= 1.417;
    },
  },
  "Hexagonal Gosper": {
    maxIterations: 8,
    axiom: "XF",
    draw: drawRules,
    replace: {
      X: "X+YF++YF-FX--FXFX-YF+",
      Y: "-FX+YFYF++YF+FX--FX-Y",
    },
    setup: () => {
      commonSetup();
      let initialLength = height * 0.3;
      len = len || initialLength;
      cnv.translate(width / 2 - len * 2, height / 2 - len * 2);

      angle = 60;
    },
    after: () => {
      len /= 2.3;
    },
  },
  Rings: {
    maxIterations: 7,
    axiom: "F+F+F+F",
    draw: drawRules,
    replace: {
      F: "FF+F+F+F+F+F-F",
    },
    setup: () => {
      commonSetup();
      let initialLength = height * 0.3;
      cnv.translate(width / 2, height / 2);

      angle = 90;
      len = len || initialLength;
    },
    after: () => {
      len /= 3;
    },
  },
  Tiles: {
    maxIterations: 8,
    axiom: "F+F+F+F",
    draw: drawRules,
    replace: {
      F: "FF+F-F+F+FF",
    },
    setup: () => {
      commonSetup();
      let initialLength = height * 0.3;
      cnv.translate(width / 2, height / 2);

      angle = 90;
      len = len || initialLength;
    },
    after: () => {
      len /= 2;
    },
  },
  "Fern 6": {
    maxIterations: 10,
    axiom: "F",
    draw: drawRules,
    replace: {
      F: "FF-[XY]+[XY]",
      X: "+FY",
      Y: "-FX",
    },
    setup: () => {
      commonSetup();
      let initialLength = height * 0.5;
      cnv.translate(width / 2, height);

      angle = 22.5;
      len = len || initialLength;
    },
    after: () => {
      len /= 2;
    },
  },
  "Fern 5": {
    maxIterations: 6,
    axiom: "F",
    draw: drawRules,
    replace: {
      F: "F[+FF][-FF]F[-F][+F]F",
    },
    setup: () => {
      commonSetup();
      let initialLength = height * 0.9;
      cnv.translate(width / 2, height);

      angle = 22.5;
      len = len || initialLength;
    },
    after: () => {
      len /= 3;
    },
  },
  "Fern 4": {
    maxIterations: 15,
    axiom: "VZFFF",
    draw: drawRules,
    replace: {
      V: "[+++W][---W]YV",
      W: "+X[-W]Z",
      X: "-W[+X]Z",
      Y: "YZ",
      Z: "[-FFF][+FFF]F",
    },
    setup: () => {
      commonSetup();
      let initialLength = height * 0.38;
      cnv.translate(width / 2, height);

      angle = 20;
      len = len || initialLength;
    },
    after: () => {
      len /= 1.29;
    },
  },
  "Fern 3": {
    maxIterations: 10,
    axiom: "Y",
    draw: drawRules,
    replace: {
      X: "X[-FFF][+FFF]FX",
      Y: "YFX[+Y][-Y]",
    },
    setup: () => {
      commonSetup();
      let initialLength = height * 0.6;
      cnv.translate(width / 2, height);

      angle = 25.7;
      len = len || initialLength;
    },
    after: () => {
      len /= 2.05;
    },
  },
  "Fern 2": {
    maxIterations: 7,
    axiom: "F",
    draw: drawRules,
    replace: {
      F: "FF+[+F-F-F]-[-F+F+F]",
    },
    setup: () => {
      commonSetup();
      let initialLength = height * 0.45;
      cnv.translate(width / 2, height);

      angle = 22.5;
      len = len || initialLength;
    },
    after: () => {
      if (currentIteration >= 5) {
        len /= 2;
        return;
      }
      len /= 2.24;
    },
  },
  "Fern 1": {
    maxIterations: 9,
    axiom: "X",
    draw: drawRules,
    replace: {
      X: "F+[[X]-X]-F[-FX]+X",
      F: "FF",
    },
    setup: () => {
      commonSetup();
      const initialLength = height * 0.37;
      len = len || initialLength;

      cnv.translate(width / 2, height);
      angle = -25;
    },
    after: () => {
      len = len / 2;
    },
  },
  Triangle: {
    maxIterations: 12,
    axiom: "F+F+F",
    draw: drawRules,
    replace: {
      F: "F-F+F",
    },
    setup: () => {
      commonSetup();
      let initialLength = width / 5;
      cnv.translate(width / 2, height / 2);

      angle = 120;
      len = len || initialLength;
    },
    after: () => {
      len /= (1 + Math.sqrt(5)) / 2;
    },
  },
  "Sierpinski Square": {
    maxIterations: 8,
    axiom: "F+XF+F+XF",
    draw: drawRules,
    replace: {
      X: "XF-F+F-XF+F+XF-F+F-X",
    },
    setup: () => {
      commonSetup();
      let initialLength = Math.min(width, height) * 0.25;
      cnv.translate(width / 2 - initialLength * 1.6, height / 2);

      angle = 90;
      len = len || initialLength;
    },
    after: () => {
      len /= 2.05;
    },
  },
  Crystal: {
    maxIterations: 8,
    axiom: "F+F+F+F",
    draw: drawRules,
    replace: {
      F: "FF+F++F+F",
    },
    setup: () => {
      commonSetup();
      let initialLength = Math.min(width, height) * 0.9;
      cnv.translate(
        width / 2 - initialLength / 2,
        height / 2 + initialLength / 2
      );

      angle = 90;
      len = len || initialLength;
    },
    after: () => {
      len = len / 3;
    },
  },
  "Quadratic Snowflake": {
    maxIterations: 8,
    axiom: "FF+FF+FF+FF",
    draw: drawRules,
    replace: {
      F: "F+F-F-F+F",
    },
    setup: () => {
      commonSetup();
      let initialLength = width / 5;
      cnv.translate(width / 2 - initialLength, height / 2 + initialLength);

      angle = 90;
      len = len || initialLength;
    },
    after: () => {
      len = len / 3;
    },
  },
  "Koch Island": {
    maxIterations: 7,
    axiom: "F+F+F+F",
    draw: drawRules,
    replace: {
      F: "F+F-F-FFF+F+F-F",
    },
    setup: () => {
      commonSetup();
      cnv.translate(width / 2 - width / 4 / 2, height / 2 + width / 4 / 2);

      angle = 90;
      len = len || width / 4;
    },
    after: () => {
      len = len / 4.5;
    },
  },
  Board: {
    maxIterations: 7,
    axiom: "F+F+F+F",
    draw: drawRules,
    replace: {
      F: "FF+F+F+F+FF",
    },
    setup: () => {
      commonSetup();

      let initialLength = Math.min(width, height) * 0.9;
      len = len || initialLength;
      cnv.translate(
        width / 2 - initialLength / 2,
        height / 2 + initialLength / 2
      );

      angle = 90;
    },
    after: () => {
      len = len / 3;
    },
  },
  "Koch Snowflake": {
    maxIterations: 8,
    axiom: "F++F++F",
    draw: drawRules,
    replace: {
      F: "F-F++F-F",
    },
    setup: () => {
      commonSetup();
      cnv.translate(width / 2 - width / 3 / 3, height / 2 + width / 3 / 2);

      angle = 60;
      len = len || width / 3;
    },
    after: () => {
      len = len / 3;
    },
  },
  Cross: {
    maxIterations: 8,
    axiom: "F+F+F+F",
    draw: drawRules,
    replace: {
      F: "F+F-F+F+F",
    },
    setup: () => {
      commonSetup();
      const initialLength = Math.min(width, height) * 0.25;
      len = len || initialLength;

      cnv.translate(
        width / 2 - (len * Math.pow(2, config.iterations) + 1) / 2,
        height / 2 + (len * Math.pow(2, config.iterations) + 1) / 2
      );

      angle = 90;
    },
    after: () => {
      len = len / 2;
    },
  },
  Pentaflake: {
    maxIterations: 8,
    axiom: "F++F++F++F++F",
    draw: drawRules,
    replace: {
      F: "F++F++F|F-F++F",
    },
    setup: () => {
      commonSetup();
      len = len || width / 3;
      cnv.translate(width / 2 - len * 2, height / 2 - len * 2);

      angle = 36;
    },
    after: () => {
      len = len / 2.5;
    },
  },
  "Dragon Kurve": {
    maxIterations: 18,
    axiom: "F",
    replace: {
      F: "F+G",
      G: "F-G",
    },
    setup: () => {
      commonSetup();
      cnv.translate(width / 2, height / 2);

      angle = 90;
      len = 5;
    },
    after: () => {},
    draw: drawRules,
  },
  "Koch Kurve 90°": {
    maxIterations: 8,
    axiom: "F",
    replace: {
      F: "F+F-F-F+F",
    },
    setup: () => {
      commonSetup();
      const initialLength = Math.min(width, height);
      len = len || initialLength;
      cnv.translate(
        width / 2 - initialLength / 2,
        height / 2 - initialLength / 4
      );

      angle = 90;
      cnv.rotate((PI / 180) * angle);
    },
    after: () => {
      len /= 3;
    },
    draw: drawRules,
  },
  "Koch Kurve 60°": {
    maxIterations: 8,
    axiom: "F",
    replace: {
      F: "F+F-F-F+F",
    },
    setup: () => {
      commonSetup();
      angle = 60;
      const initialLength =
        Math.min(width, height) *
        (width > height ? map(width - height, 0, 2 * height, 1, 2.4) : 0.9);
      len = len || initialLength;
      cnv.translate(
        width / 2 - initialLength / 2,
        height / 2 - initialLength / 6
      );
      cnv.rotate((PI / 180) * 90);
    },
    after: () => {
      len /= 4;
    },
    draw: drawRules,
  },
  "Hilbert Kurve": {
    maxIterations: 10,
    axiom: "W",
    replace: {
      V: "-WF+VFV+FW-",
      W: "+VF-WFW-FV+",
    },
    setup: () => {
      commonSetup();
      angle = 90;
      const initialLength = Math.min(width, height) * 0.9;
      len = len || initialLength;
      cnv.translate(
        width / 2 - initialLength / 2,
        height / 2 + initialLength / 2
      );
    },
    after: () => {
      len /= 2;
    },
    draw: drawRules,
  },
  "Sierpinski Triangle": {
    maxIterations: 10,
    axiom: "F-G-G",
    replace: {
      F: "F-G+F+G-F",
      G: "GG",
    },
    setup: () => {
      commonSetup();
      angle = 120;
      const initialLength = Math.min(width, height);
      len = len || initialLength;
      const totalHeight = (initialLength * Math.sqrt(3)) / 2;

      cnv.translate(initialLength / 2, height - (height - totalHeight) / 2);
      cnv.rotate((PI / 180) * 90);
    },
    after: () => {
      len = len / 2;
    },
    draw: drawRules,
  },
  "Sierpinski Arrowhead": {
    maxIterations: 11,
    axiom: "YF",
    replace: {
      X: "YF+XF+Y",
      Y: "XF-YF-X",
    },
    setup: () => {
      commonSetup();
      angle = 60;
      const initialLength = Math.min(width, height);
      len = len || initialLength;
      const totalHeight = (initialLength * Math.sqrt(3)) / 2;

      cnv.translate(initialLength / 2, height - (height - totalHeight) / 2);
      cnv.rotate((PI / 180) * 30);
      if (config.iterations % 2 === 0) cnv.rotate((PI / 180) * 60);
    },
    after: () => {
      len = len / 2;
    },
    draw: drawRules,
  },
};
