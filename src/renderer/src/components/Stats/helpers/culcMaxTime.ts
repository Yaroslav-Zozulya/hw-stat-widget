export const cultMaxTime = (homeworksArr): string => {
  if (homeworksArr.length === 0) {
    return 'All checked'
  }
  const number = Math.max(...homeworksArr.map((item) => item.statusChangeMinuteCountAgo))
  return `${Math.floor(number / 60)}г ${number % 60}хв`
}
