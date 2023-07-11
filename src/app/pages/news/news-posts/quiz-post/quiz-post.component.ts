import { Component, OnInit,Input, ViewChild, ElementRef, NgModule} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { UserService } from '../../../../providers/user/user.service';
import { NewsService } from '../../../../providers/news/news.service';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/providers/common/common.service';


@Component({
  selector: 'app-quiz-post',
  templateUrl: './quiz-post.component.html',
  styleUrls: ['./quiz-post.component.scss'],
})
export class QuizPostComponent implements OnInit {
@Input() newsData: any;
@Input() type: any;
@Input() news_id: any;
@Input() time:any;
@Input() postData:any;

@ViewChild(IonSlides, {static: false}) slides: IonSlides;

currentIndex:any=0;
questionNav:boolean = false;
viewSolutionStats:boolean = false;

questionsAnswered = 0;


news_user_id:any;
examfinish:boolean=false;

start_time = "august 15, 2022 11:30:00";

  constructor(public alertController: AlertController,
              public user:UserService,
              public router:Router,
              public news: NewsService,
              public location:Location,
              public common:CommonService
              ) {
                this.news_user_id=this.user.getnewsuserid();
               }

  ngOnInit() {

    this.slides=this.slides;
    this.type = this.type;
    this.newsData = this.newsData;
    this.news_id = this.news_id;
    this.start_time = this.newsData.start_time || "august 15, 2022 11:30:00";
    this.timer();

    this.totalScore();

    this.
    news.
    postReq("/post/post_action",{post_id:this.postData._id,action_type:"view" }).then((response:any) =>{
      // this.community_data=response.data;
      //this.community_data=response.data;

    })
    .catch(err=>{
      console.log(err)
    });

  }


  hideTabs(){
    this.user.tabopen = false;
  }

// =============== CHECK EXAM STARTED OR NOT==================
  isExamStarted(){
var quiz_id=this.newsData._id;
var result: boolean;
    var quize_data:any=JSON.parse(localStorage.getItem("quizdata")) || '';
    let index = 0;
    for (var i = 0; i < quize_data.length; i++)
    {
       if (quize_data[i].quiz == quiz_id)
       {
         result=true;
         break;
       }
       else
       {
         result=false
       }
       
     }
     return result;
    
  }


  back(){
    this.location.back();
  }



  isanswered(quiz_id,question_id)
{
  var que=[];
 var quize_data:any=JSON.parse(localStorage.getItem("quizdata")) || [];

   for (var i = 0; i < quize_data.length; i++)
   {
      if (quize_data[i].quiz == quiz_id)
      {
         for (var j = 0; j < quize_data[i].questions.length; j++)
         {
            if(quize_data[i].questions[j]._id==question_id)
            {
            if(quize_data[i].questions[j].choosen_option_id)
            {
              this.questionsAnswered++;
              return true;
            }
            else
            {
              return false;
            }
            }
         }
      }
    }
}

end_of_slide(i,end){

  if(i == end-1){
    return true;
  }else{
    return false;
  }

}

// ================ CHECK OPTIONS ARE SELECTED OR NOT=========
check_option(quiz_id,question_id,option_id)
{
  var que=[];
 var quize_data:any=JSON.parse(localStorage.getItem("quizdata")) || [];

   for (var i = 0; i < quize_data.length; i++)
   {
      if (quize_data[i].quiz == quiz_id)
      {
         for (var j = 0; j < quize_data[i].questions.length; j++)
         {
            if(quize_data[i].questions[j]._id==question_id)
            {
            if(quize_data[i].questions[j].choosen_option_id==option_id)
            {
              return true;
            }
            else
            {
              return false;
            }
            }
         }
      }
    }
}



check_correct_option(correct_key,option){
  if(correct_key == option.key){
    return true;
  }
  else{
    return false;
  }
}

check_choosen_option(question_id,option_id)
{
 const answers = this.newsData.submissions[0].answers;
 for (var i = 0; i < answers.length; i++)
 {
   
   if(answers[i].question==question_id)
   {
      if(answers[i].chosen_option == option_id){
          return true;
      }
      else{
        false;
      }
   }

 }
}
check_choosen_option_nav(question_id){
 const answers = this.newsData.submissions[0].answers;
 for (var i = 0; i < answers.length; i++)
 {
   if(answers[i].question==question_id)
   {
     return answers[i].isCorrect;
    }

 }
}

// ==================ON SUBMITING THE DATA=====================
 submitdata(quiz_id)
{//console.log(this.news_id + 'aaaaaaActivatedone') ;
  var que=[];
 var quize_data:any=JSON.parse(localStorage.getItem("quizdata"));

   for (var i = 0; i < quize_data.length; i++)
   {
      if (quize_data[i].quiz == quiz_id)
      {
         for (var j = 0; j < quize_data[i].questions.length; j++)
         {
            delete quize_data[i].questions[j]["question"];
            delete quize_data[i].questions[j]["options"]; 
            delete quize_data[i].questions[j]["image"];
            delete quize_data[i].questions[j]["correct_key"]; 
         }
      }
      else
      {
        delete quize_data[i];
       // quize_data.splice(i, 1)
      }
    }

  var quize_data1 = quize_data.filter(function(x) { return x !== null }); 



 //  let form={"post_id":id}
    this.
    news.
    postReq("/post/submit/quiz",quize_data1[0]).then((response:any) =>{
      // this.community_data=response.data;
      //console.log('data'+response);

      

       this.news.
      postReq("/post",{"post_id":this.news_id})
      .then((response:any) => {
      this.newsData=response.data.news;
      //console.log('newsdaattaaaa'+JSON.stringify(this.newsData));
      this.isexamcompleted(this.newsData);
      this.totalScore()
     // this.examfinish=true;
      })
      .catch((error:any) => {
        
      })
      
      
      var quize_data=JSON.parse(localStorage.getItem("quizdata"));
      for (var i = 0; i < quize_data.length; i++)
      if (quize_data[i].quiz == this.newsData._id) quize_data.splice(i, 1);
      localStorage.setItem("quizdata", JSON.stringify(quize_data));

     
      
     // this.isExamStarted();
      
    })
    .catch(err=>{
      //console.log(err)
    });

}

isexamcompleted(newdata)
{
  //console.log('examcompleted news data'+JSON.stringify(newdata));
  if(newdata.submissions.length)
  {
    return true;
  }
  else
  {
    return false;
  }
}

// ======================CHOOSE OPTIONS============================
choose_option(quiz_id,question_id,option_id,option_key,option_value)
{
  var que=[];
  var option_data:any={
    "_id":option_id,
    "key":option_key,
    "data":option_value,
  }
 var quize_data:any=JSON.parse(localStorage.getItem("quizdata"));

   for (var i = 0; i < quize_data.length; i++)
   {
      if (quize_data[i].quiz == quiz_id)
      {
         for (var j = 0; j < quize_data[i].questions.length; j++)
         {
            if(quize_data[i].questions[j]._id==question_id)
            {
              //var que:any=[];
                 
             quize_data[i].questions[j].choosen_option_id=option_id;
            quize_data[i].questions[j].chosen_option=option_data;
            }
         }
      }
    }
    
  localStorage.setItem("quizdata", JSON.stringify(quize_data));

  var quize_data=JSON.parse(localStorage.getItem("quizdata"));
  //console.log('updated'+JSON.stringify(quize_data));
}

// ======================COMPLETE TEST===========================
    complete(id)
  {
    var quize_data=JSON.parse(localStorage.getItem("quizdata"));

    for (var i = 0; i < quize_data.length; i++)
        if (quize_data[i].quiz == id) quize_data.splice(i, 1);
      localStorage.setItem("quizdata", JSON.stringify(quize_data));
  }

// ======================START EXAM=====================
  startexam()
  {
 var quiz:any=[];
      quiz = [{
      "quiz": this.newsData._id,
      "questions": this.newsData.questions,
      }];
    var  quiz1 = {
      "quiz": this.newsData._id,
      "questions": this.newsData.questions,
      };

    if (localStorage.getItem("quizdata") === null) {
      localStorage.setItem('quizdata',JSON.stringify(quiz));
    }
    else
    {
      var existing_quiz_data:any;

      existing_quiz_data=JSON.parse(localStorage.getItem("quizdata"));
    //console.log(existing_quiz_data.length);
     var exist=false;
       for (var i = 0; i < existing_quiz_data.length; i++) 
       {
        //console.log('hihi'+JSON.stringify(existing_quiz_data[i]));
       // //console.log('jiji'+JSON.stringify(existing_quiz_data[i].quiz_id));
        if(this.newsData._id === existing_quiz_data[i].quiz_id)
        {
          //console.log('yes');
          exist=true;
        }
               //console.log('done');
       }
       if(!exist)
       {
          existing_quiz_data.push(quiz1); 
          //console.log('test'+existing_quiz_data);
          localStorage.setItem('quizdata',JSON.stringify(existing_quiz_data));  
       }
    }
    this.isExamStarted();
  }

// ========================GETTING EXAM DATA=========================
  getexamdata()
  {
    var data=localStorage.getItem('quizdata');
   // //console.log('quiz data'+data);
  }


// =====================ALERTING ON SUBMITING THE EXAM=================
  async presentSubmitAlert() {
    const alert = await this.alertController.create({
      cssClass: 'quiz-alert-class',
      header: 'Finish Test',
      message: 'Are you sure, you want to submit this test?',
      buttons: [
        {
          text: 'BACK',
          handler:()=>{
            this.location.back();
          }
        },
        {
          text: 'RESUME',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'SUBMIT',
          handler:()=>{
            this.submitdata(this.newsData._id)
          }
        }
      ]
    });
    
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  next(){
    this.slides.slideNext();
  }
  prev(){
    this.slides.slidePrev();
  }

  slideIndex(i: any){
    this.slides.slideTo(i);
  }


  tabopen()
  {
    this.user.tabopen=true;
  }
  closetab()
  {
    this.user.tabopen=false;
  }

  redirectToViewNews(){
    this.router.navigate(['../news/view-news',{id: this.news_id, name: 'Quiz' }]);
  }

  tabclose(){
    this.user.tabopen = false;
  }

  
  answered_questions = 0;
  unanswered_questions = 0;
  correct_answers = 0;
  wrong_answers=0;
  // Total Score
  totalScore(){
    //let score = this.newsData.submissions[0].answers;
    if(this.newsData.submissions[0])
    {
    console.log('hhiihh'+JSON.stringify(this.newsData.submissions[0].answers));
    let total_score = 0;
    for(var i=0; i<this.newsData.submissions[0].answers.length; i++){
      if(this.newsData.submissions[0].answers[i].isCorrect){
        total_score += 1;
      }
      this.answered_questions++;
    }
  
    this.correct_answers = total_score;
    this.wrong_answers = this.answered_questions - this.correct_answers;
    this.unanswered_questions = this.newsData.questions.length - this.answered_questions;
    }
  }



  
user_log(){
  console.log(this.user.isGuestUser() + "ccccccccccc");
  return this.user.isGuestUser();
  
}

navigate_to_login(){
  this.router.navigateByUrl('signup', { replaceUrl: true });
}


  isCountdownExpired = false;
  countdown:any;
  countDownDate:any;
  x:any;
  timer(){
    this.countDownDate = new Date(this.start_time).getTime();
    this.x = setInterval(()=>{
      var now = new Date().getTime();
      var distance = this.countDownDate - now;
      var days = Math.floor(distance/(1000*60*60*24));
      var hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
      var minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
      var seconds = Math.floor((distance % (1000*60)) / 1000);

      if(days <= 0 && hours <= 0 && minutes <= 0){
        this.countdown = seconds + "s ";
      }else if(days <= 0 && hours <= 0){
        this.countdown =  minutes + "m " + seconds + "s ";
      }else if(days <= 0 ){

        this.countdown =  hours + "h " + minutes + "m " + seconds + "s ";
      }else{
        this.countdown = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      }
      
      if(distance < 0){
        clearInterval(this.x);
        this.isCountdownExpired = true;
      } 

    });

  }



}