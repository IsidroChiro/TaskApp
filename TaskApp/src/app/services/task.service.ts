import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Task } from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  selectedTask: Task;
  task: Task[];
  readonly URL_API = 'http://192.168.0.105:4000';
  
  constructor(private http: HttpClient) {
    this.selectedTask = new Task();
   }

  getTasks(){
    return this.http.get(this.URL_API+'/get');
  }

  getTaskInfo(Task: Task){
    return this.http.get(this.URL_API+'/getInfo/'+Task._id);
  }

  addTask(Task: Task){
    return this.http.post(this.URL_API+'/add',Task);
  }

  editTask(Task: Task){
    return this.http.put(this.URL_API+'/edit/'+Task._id,Task);
  }

  editTaskStatus(_id: string){
    return this.http.put(this.URL_API+'/editStatus/'+_id,'');
  }

  deleteTask(_id: string){
    return this.http.delete(this.URL_API+'/delete/'+_id);
  }
}
