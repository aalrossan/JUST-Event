import { StudentEvaluation } from "../evaluations/student-evaluation";

export interface ModifyStudentEvaluation {
    studentEvaluationId: string
    eventId: string
    studentId: number
    values: Array<StudentEvaluation>
    studentName: string
    eventName: string
}
