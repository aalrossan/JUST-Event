export interface CreateRegisterStudentEvent {
    eventId: string
    studentId: number
    register: boolean
    studentName: string
    eventName: string
}
