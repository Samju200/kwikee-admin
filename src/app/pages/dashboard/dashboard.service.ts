// import { Injectable } from '@angular/core';
// import { ProjectService } from '@core/services/project.service';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class DashboardService {
//   constructor(private projectService: ProjectService) {}

//   getSummary(days: number = 7): Observable<any> {
//     return this.projectService.getDashboardSummary({ days });
//   }

//   getGraphData(params: {
//     days?: number;
//     status?: string;
//     type?: string;
//     user_segment?: string;
//   }): Observable<any> {
//     return this.projectService.getDashboardGraphData(params);
//   }

//   getRecentActivities(params: {
//     type: string;
//     status?: string;
//     search?: string;
//     page?: number;
//     per_page?: number;
//   }): Observable<any> {
//     return this.projectService.getDashboardRecentActivities(params);
//   }
// }
