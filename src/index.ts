// import { INTERVAL_BETWEEN_ACTIONS, LOOP_TIME } from './config/constants';
import { runHerosReport } from './helpers';
import { AbilityEnum, RarityEnum } from './models';
// eslint-disable-next-line
// import colors from 'colors';

function runInLoop() {
  // let loopId = 0;
  // const time = LOOP_TIME * 60 * 1000;
  // try {
  //   const today = new Date().toLocaleString();
  //   console.log(`Agora é: ${today}`.black.bgGreen);
  //   console.log('Configurações:'.blue.bold);
  //   console.log(
  //     `{ LOOP_TIME: ${LOOP_TIME} minutos, INTERVAL_BETWEEN_ACTIONS: ${INTERVAL_BETWEEN_ACTIONS} segundos }`
  //       .blue.bold
  //   );
  //   runFarmAutomation();
  //   loopId = setInterval(() => {
  //     console.log('.'.black);
  //     const today = new Date().toLocaleTimeString(); // returns today's date in mm/dd/yyyy format
  //     console.log(`>>> ${today} `.black.bgGreen);
  //     runFarmAutomation();
  //   }, time);
  // } catch (error) {
  //   clearInterval(loopId);
  //   console.error({ error });
  // }
}

// console.log(process.argv);
if (process.argv.includes('--reportBombcryptoHeroes')) {
  console.log('\n\n 👉 report', {}, '\n');

  runHerosReport({
    ability: [AbilityEnum.ManaRegen],
    rarity: [RarityEnum.Rare],
    size: 400,
  });
} else {
  console.log('Codigo nao implementado');
}
