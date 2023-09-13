console.log("working")

function copytext(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("copy").style.display="block"
            setInterval(() => {
            document.getElementById("copy").style.display="none"
            },2000);
            console.log(copy)
        }
    )
}
function maskpassword(password) {
    let str=""
    for (let index = 0; index < password.length; index++) {
      str+="*"
    }
    return str
}

const deletepasswords=(website)=>{
    let data=localStorage.getItem("passwords")
    let arr=JSON.parse(data)
    arrupdate=arr.filter((e)=>{
        return e.website != website
    })
    localStorage.setItem("passwords",JSON.stringify(arrupdate))
    showpasswords()
}

showpasswords=()=>{
    let data=localStorage.getItem("passwords")
    let tb=document.querySelector("table")
    if(data == null || JSON.parse(data).length==0){
        tb.innerHTML="no data to show"
    }
    else{
        tb.innerHTML=`<tr>
                       <th>website</th>
                       <th>username</th>
                       <th>password</th>
                       <th>Delete</th>
                       </tr>
                      `
        arr=JSON.parse(data)
        str=""
        for (let index =0; index < arr.length; index++) {
            const element = arr[index];
           str+=`<tr>
                   <td>${element.website}<img onclick = "copytext('${element.website}') " src="copy.svg"></td>
                   <td>${element.username}<img onclick = "copytext('${element.username}') "src="copy.svg"></td>
                   <td>${maskpassword(element.password)}<img onclick = "copytext('${element.password}')" src="copy.svg"></td>
                   <td><button id="button" onclick="deletepasswords('${element.website}')">Delete</button></td>
                   </tr>
                 `
                } 
                tb.innerHTML=tb.innerHTML+str
            }
           website.value=""
           username.value=""
           password.value=""
}


showpasswords()
document.getElementById('btn').addEventListener('click',(e)=>{
    e.preventDefault()
    console.log("clicked")
    console.log(username.value,password.value,website.value)
    let passwords=localStorage.getItem("passwords")
    console.log(passwords)
    if(passwords == null){
        let json=[]
        json.push({username:username.value,password:password.value,website:website.value})
        localStorage.setItem("passwords",JSON.stringify(json))
    }
    else{
        let json=JSON.parse(localStorage.getItem("passwords"))
        json.push({username:username.value,password:password.value,website:website.value})
        localStorage.setItem("passwords",JSON.stringify(json))
    }
    showpasswords()
})