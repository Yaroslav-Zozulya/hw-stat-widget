export const checkAlarm = (timeAsString: string): boolean => {
  console.log(timeAsString)
  const criticalTime = 1320
  let timeAsNumber = 0
  const [num1, num2] = timeAsString.split(' ')
  timeAsNumber = parseInt(num1) * 60 + parseInt(num2)
  return timeAsNumber >= criticalTime ? true : false
}
