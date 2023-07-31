const math = require('mathjs');

function calculateSolarSystem(totalPower, panelPower, panelWidth, panelHeight, roofType) {
  const totalPower_W = math.unit(totalPower, 'kW').toNumber('W');
  const numberPanels = math.ceil(totalPower_W / panelPower);
  const numberInverters = math.ceil(numberPanels / 4);
  const requiredLength = numberPanels * panelWidth;
  const requiredArea = numberPanels * (panelWidth * panelHeight);

  return {
    numberPanels,
    numberInverters,
    panelPower,
    requiredLength,
    requiredArea,
  };
}
if (require.main === module) {
  const totalPower = parseFloat(process.argv[2]);
  const panelPower = parseFloat(process.argv[3]);
  const panelWidth = parseFloat(process.argv[4]);
  const panelHeight = parseFloat(process.argv[5]);
  const roofType = process.argv[6];

  if (isNaN(totalPower) || isNaN(panelPower) || isNaN(panelWidth) || isNaN(panelHeight)) {
    console.error('Invalid input. Please provide valid numeric values for totalPower, panelPower, panelWidth, and panelHeight.');
    process.exit(1);
  }

  const result = calculateSolarSystem(totalPower, panelPower, panelWidth, panelHeight, roofType);
  console.log('Solar System Calculation Result:');
  console.log(result);
}

module.exports = { calculateSolarSystem };
