


//مصفوفة تمثل البيانات اللي راح تنعرض في التصميم اللي سويناه 


let tasks = [
    {
        "taitle":" اجتماع اولي",
        "data" : "1/5/2025" ,
        "isDone"  : false
    } ,
    {
        "taitle":" ارسال التقرير",
        "data" : "1/5/2025" ,
        "isDone"  : false
    } ,
    {
        "taitle":" قفل الإجتماع",
        "data" : "1/5/2025" ,
        "isDone"  : true
    } 

]


//من افضل الممارسات ان نحطها في الدالة 
function getTasksFromStorge(){
   //يساعدنا ان  اذا حدثنا الصفحة مايروح المحتوى 
  //يستقبل بارمتر الكي اللي في السيت 
 let retrievedTasks = JSON.parse(localStorage.getItem("tas"))
 //عشان نتأكد اذا هي فاضية يعطي مصفوفة فاضية لو مو فاضيه يطلع النتيجة
  if (retrievedTasks==null){
    tasks = []
  }else {
    tasks = retrievedTasks
  }

  //طريقة افضل تختصر الشرط اللي فوق 


  // tasks = retrievedTasks ?? []
}
//هنا نستدعي الدالة
getTasksFromStorge ()



//عرض المهام
//اسوي دالة مهمتها تحذف محتوى التاسك اللي صممناه بعدين تسوي لوب على 
// المصفوفة اللي تمثل بيانات  التاسك وتحط قيم التاساكات الجديدة 

function fillTaskOnPage() {
    document.getElementById("taks").innerHTML = ""
    let index = 0 
    for (task of tasks){

        let content = 
        `
            <div class="task ${task.isDone ? "done" : ""}">
                                
                <!--task-info-->
                <div style="width: 70%;">
                    <h2">${task.taitle}</h2>
                    <div>
                        <span class="material-symbols-outlined">
                            calendar_month
                        </span>
                        <span>${task.data}</span>
                    </div>
                </div>
                <!--//task-info-->

                <!--task-actin-->
                <div style="width: 20%; display: flex; justify-content: space-between; align-items: center;  ">
                    <button onclick= "deletTask(${index})" class="circle" style="background-color: rgb(114, 0, 0); color: white;">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>

                    ${task.isDone ? 
                            ` <button onclick= "toggleTaskCompletion(${index})" class="circle" style="background-color: rgb(150, 0, 117); color: white;">
                                <span class="material-symbols-outlined">
                                        close_small
                                </span>
                              </button>
                            ` :
                            ` <button onclick= "toggleTaskCompletion(${index})" class="circle" style="background-color: rgb(0, 150, 30); color: white;">
                                <span class="material-symbols-outlined">
                                    done
                                </span>
                              </button>
                            `}
                        
                    <button onclick= "editTask(${index})" class="circle" style="background-color: rgb(0, 16, 97); color: white;">
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                    </button>
                </div>
                <!--//task-iction-->



            </div>
        `
        document.getElementById("taks").innerHTML += content
        index++
    }
}
fillTaskOnPage()



//اضافة مهمة 
//نعطي امر ان اذا اليوزر ضغط على الزر يضيف التاسك بعدين نستعدي الدالة 
document.getElementById("btn-add").addEventListener("click",function(){
   
   let now = new Date()
   let date = now.getDate() + "/" +  now.getMonth() + "/" + now.getFullYear() 
   let taskName=  prompt("can you add the new task ? ")


   let taskObject = {
    "taitle" : taskName ,
    "data" : date , 
    "isDone" : false
   }
   
   tasks.push(taskObject)
   storeTasks()
   fillTaskOnPage()
})


//لحذف مهمة نعمل دالة 
function deletTask(index) {
    //عشان نقدر نوصل للتاسك اللي نبغى نحذفة 
    let task = tasks[index]
    //هذه دالة تطلع نافذه لتأكيد الحذف ولتحسين تجربة المستخدم يفضل عملية الحذف تكون بخطوتين 
    let isConferd =  confirm("هل تريد تأكيد عملية حذف " + task.taitle)
    if(isConferd){
        //عشان اقدر احذف شي من المصفوفة استخدم هذه الدالة 
        //البارمتر حقها اول شي من وين نبدأ , ثاني شي كم عنصر من المصفوفة تحذف 
        tasks.splice(index,1)
        storeTasks()
        fillTaskOnPage()
    }  
}

//لتعديل مهمة 
function editTask(index){
    let task = tasks[index]
    //البرومبت يستقبل تو بارمتر الاول ممكن تكون السؤال و 
    // الثاني المحتوى اللي موجود اساسا قبل التعديل وهذا عشان يحسن من تجربة المستخدم 
    let newTaskTitle = prompt("الرجاء ادخال الاسم الجديد للمهمة" , task.taitle)
    //المصفوفة والاوبجكت بعتبرو باث باي رفيرينفس وبكذا اذا عدلنا راح يتعدل في المصقوفة
    task.taitle = newTaskTitle 
    storeTasks()
    fillTaskOnPage()

}

//تحديد انجاز المهمة 
//سميناه به1ا الاسم لان التوجول في الجافا يستخدم للدوال اللي تقلب من صح الى خطأ والعكس
function toggleTaskCompletion(index){
    let task = tasks[index]
    // هذا اختصار للشرط بان اذا هي ترو اعكس والعكس
    task.isDone = !task.isDone
    storeTasks()
    fillTaskOnPage()

}

//======== storge function ========
//اسم الممارسة DRY
//من افضل الممارسات بدل ما احط الكود في كل مسار احطهم في داله واسو ياستدعاء

function storeTasks(){
 //عن طريق كلاس جيسون ودواله نحول المصفوفة الى نص 
 //تتلقى بارمتر المصفوفة اللي بنحولها 
 let tasksString = JSON.stringify(tasks)
  
 //هو زي المتغير او الاوبجكت عنده دوال يساعد ان نكتب في اللوكال ستورج
 //يستقبل تو بارمتر من نوع سترنج ومايقدر يقرأ المصفوفة والاوبجكت
 localStorage.setItem("tas",tasksString)
}