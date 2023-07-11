import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService { 

    public fooSubject = new Subject<any>();
    public blockedPost = new Subject<any>();

    publishSomeData(data: any) {
        this.fooSubject.next(data);
    }

    getObservable(): Subject<any> {
        return this.fooSubject;
    }

    triggerBlockedPost(id: any){
        this.blockedPost.next(id)
    }
    triggerBlockedPostsToRemove(): Subject<any>{
        return this.blockedPost;
    }
}
