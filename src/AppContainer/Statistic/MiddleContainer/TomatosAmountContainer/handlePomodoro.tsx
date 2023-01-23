export function handlePomodoro(pomodoroAmount: number) {

  const names = {
    moreFour: 'помидоров',
    twoFour: 'помидора',
    one: 'помидор'
  };

  let returnedValue = '';
  if(pomodoroAmount) {
    let handledTime;
    const timeString = String(pomodoroAmount);
    ['11','12','13','14'].includes(timeString.slice(-2)) ?
    handledTime = names.moreFour :
    ['2', '3', '4'].includes(timeString.slice(-1)) ?
    handledTime = names.twoFour:
    ['1'].includes(timeString.slice(-1)) ?
    handledTime = names.one :
    handledTime = names.moreFour;

    returnedValue = `${pomodoroAmount} ${handledTime}`;
  }
  return returnedValue;
}
