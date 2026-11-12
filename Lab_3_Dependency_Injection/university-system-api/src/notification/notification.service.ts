import { EnrollmentService } from './../enrollment/enrollment.service.js';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
@Injectable()
export class NotificationService {
    constructor(
    @Inject(forwardRef(() => EnrollmentService))
    private readonly enrollmentService: any,
  ) {}
  sendNotification(studentName:string, message:string){
    return{
        message:'Notification Sent.',
        student: studentName,
        notification: message
    }
  }
  checkEnrollment(studentName: string, courseId: string) {
    const enrollment = this.enrollmentService.enrollStudent(
      studentName,
      courseId,
    );

    return {
      message: 'Enrollment checked.',
      data: enrollment,
    };
  }
}
