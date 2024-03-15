import axios from 'axios'

type MentorInfo = {
  username: string
  firstName: string
  lastName: string
  language: string | null
  // Добавьте остальные поля, если они имеются
}

type Homework = {
  aiHomework: boolean
  aiHomeworkProcessing: boolean
  aiVersion: number
  autoCheck: boolean
  complexAutocheckHomework: boolean
  content: string
  courseId: number
  courseName: string
  deadlineDateTime: string
  groupId: number
  groupName: string
  id: number
  lastSentDateTime: string
  mentorInfos: MentorInfo[]
  moduleId: number
  moduleName: string
  needReview: boolean
  notReadCommentCount: number
  previousHomeworkStatus: string | null
  reviewed: boolean
  score: number | null
  sentCount: number
  status: string
  statusChangeDateTime: string
  statusChangeMinuteCountAgo: number
  studentFirstName: string
  studentLastName: string
  studentPhone: string
  studentUsername: string
  systemCheckResult: null
}

const auth = async (data): Promise<string> => {
  const response = await axios.post('https://api.admin.edu.goit.global/api/v1/auth/login', data)
  return response.data.accessToken
}

const getStats = async (token): Promise<Homework[]> => {
  const response = await axios.get(
    'https://api.admin.edu.goit.global/api/v1/group/homework/listInProgress?page=1&submittedAfterCourseAllHomeworksDeadline=false&onlyWithUnreadComments=false&onlyUnreviewed=false&search=',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data.homeworkInfos
}

export const fetchAPI = {
  auth,
  getStats
}
