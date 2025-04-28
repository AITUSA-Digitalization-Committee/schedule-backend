import { Injectable } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import xior from 'xior';
import { Cron } from '@nestjs/schedule';
import { ApiResponse, Student } from 'src/types';

@Injectable()
export class NotifierService {
    constructor(
        private readonly scheduleService: ScheduleService,
    ) { }

    @Cron('*/60 * * * * *') // Каждую минуту
    async checkLessons() {

        try {
            const response = await xior.post<{ data: ApiResponse<Student[]> }>('https://api.yeunikey.dev/v1/notification/all', {
                'secret': 'ILOVEYERASSYLTOP1AITUMEGA'
            });

            const students = response.data.data.data;

            const now = new Date();
            now.setHours(now.getHours() + 5)
            console.log(now);

            const currentDay = this.getDayName(now.getUTCDay());

            for (const student of students) {

                const schedules = await this.scheduleService.findByGroupAndDay(student.group.name, currentDay);

                for (const schedule of schedules) {
                    const lessonStart = this.parseTimeToDate(schedule.starts);
                    const diffMs = lessonStart.getTime() - now.getTime();
                    const diffMinutes = diffMs / 1000 / 60;
                    const minutes = Math.floor(diffMinutes);

                    if (minutes == 15) {
                        await xior.post<{ data: ApiResponse<Student[]> }>('https://api.yeunikey.dev/v1/notification/send', {
                            'secret': 'ILOVEYERASSYLTOP1AITUMEGA',
                            'barcode': student.barcode,
                            'notification': {
                                'title': "Расписание",
                                'text': `Через 15 минут ${schedule.subject} (${schedule.type} / ${schedule.classroom})`
                            }
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Ошибка при проверке расписания:', error);
        }
    }

    getDayName(dayNumber: number): string {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayNumber];
    }

    parseTimeToDate(timeStr: string): Date {
        const [hours, minutes] = timeStr.split(':').map(Number);

        // Время Варшавы (UTC+1 или UTC+2)
        const now = new Date(); // Текущее время в UTC

        // Просто добавляем 3 часа для Астаны
        const date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes));

        return date;
    }
}
