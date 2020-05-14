import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Task } from 'src/app/models/task';

declare var M: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService] 
})
export class TaskComponent implements OnInit {
  title = 'TaskApp';
  public isCollapsed = true;
  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskService.getTasks()
      .subscribe(res => {
        this.taskService.task = res as Task[];
      });
  }

  addTask(form: NgForm){
    if(form.value._id){
      this.taskService.editTask(form.value)
        .subscribe(res =>{
          this.resertFrom(form);
          M.toast({html: 'Dato guardado.'});
          this.getTasks();
        });
    }else{
      this.taskService.addTask(form.value)
      .subscribe(res => {
        this.resertFrom(form);
        M.toast({html: 'Dato guardado.'});
        this.getTasks();
      });
    }
  }

  editStatus(_id: string){
    this.taskService.editTaskStatus(_id)
      .subscribe(res=>{
        console.log(res);
        M.toast({html: 'Dato eliminado.'});
        this.getTasks();
      });
  }

  edit(task: Task){
    this.taskService.selectedTask = task;
    this.isCollapsed = false;
  }

  delete(_id: string){
    this.taskService.deleteTask(_id)
      .subscribe(res=>{
        console.log(res);
        M.toast({html: 'Dato eliminado.'});
        this.getTasks();
      });
  }

  resertFrom(form?: NgForm){
    if(from){
      form.reset();
      this.taskService.selectedTask = new Task();
    }
  }
}