import { StudentEvaluation } from "../evaluations/student-evaluation";

export interface CreateStudentEvaluation {
    eventId: string
    studentId: number
    values: Array<StudentEvaluation>
    studentName: string
    eventName: string
}
