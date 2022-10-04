//items
const addArticle = document.querySelector("#addArticle") 
const articleWrap=document.querySelector("#articleWrap")
const singleArticleWrap = document.querySelector("#singleArticleWrap")
const addComment = document.querySelector("#addComment") 
const commentWrap =document.querySelector("#commentWrap")

//article details
const articleHeads = ["title", "content"]

//comment details
const commentHeads = ["name", "comment"]

//read from localstorage
const readFromStorage = (key="articles") => JSON.parse(localStorage.getItem(key))||[]

//write to localstorage
const writeToStorage = (articles, key="articles") => localStorage.setItem(key, JSON.stringify(articles))

//read from comments localstorage
const readFromCStorage = (key="comments") => JSON.parse(localStorage.getItem(key))||[]

//write to comments localstorage
const writeToCStorage = (comments, key="comments") => localStorage.setItem(key, JSON.stringify(comments))

//Add article
if(addArticle){
    addArticle.addEventListener("submit", function(e){
        e.preventDefault()
        const article = { id:Date.now() }
        articleHeads.forEach(head=> article[head] = this.elements[head].value)
        const articles = readFromStorage()
        articles.push(article)
        writeToStorage(articles)
        addArticle.reset()
        window.location.href="home.html"
    })
}

//create element
const createMyOwnEle = (createdElement, parent, txt=null, classes=null) =>{
    const myElement= document.createElement(createdElement)
    parent.appendChild(myElement)
    myElement.textContent=txt
    myElement.classList=classes
    return myElement
}

//show action
const showArticle = (article)=>{
    writeToStorage(article, "article")
    window.location.href = "article.html"
}


//draw articles
const drawAll = (allArticles) =>{
    articleWrap.innerHTML=""
    allArticles.forEach((article, index)=>{
        const tr = createMyOwnEle("tr", articleWrap)
        createMyOwnEle("td", tr, article.id)
        createMyOwnEle("td", tr, article.title)
        const td = createMyOwnEle("td", tr)
        const showBtn = createMyOwnEle("button", td, "Show", "btn btn-primary mx-2")
        showBtn.addEventListener("click", ()=> showArticle(article))



        const delBtn = createMyOwnEle("button", td, "delete", "btn btn-danger mx-2")
        delBtn.addEventListener("click", ()=> delUser(allArticles, index))
    })
}


//show all
if(articleWrap){
    const allArticles = readFromStorage()
    drawAll(allArticles)        
}

//show single article
if(singleArticleWrap){
    const articleData = readFromStorage("article")
    singleArticleWrap.innerHTML= `<div class="row">
        <h2 class="col-12 text-center">${articleData.title}</h2>
        <br>
        <p class="col-12">${articleData.content}</p>
        <br><br>
    </div> `
}

//Add comment
if(addComment){
    addComment.addEventListener("submit", function(e){
        const articleData = readFromStorage("article")
        e.preventDefault()
        const comment= {id:articleData.id}    // wrong
        commentHeads.forEach(head=> comment[head] = this.elements[head].value)
        const comments = readFromCStorage()
        comments.push(comment)
        writeToCStorage(comments)
        addComment.reset()
        window.location.href="article.html"
    })
}

//draw comments
const drawComments = (allComments) =>{
    commentWrap.innerHTML=""
    allComments.forEach((comment, index)=>{
        const tr = createMyOwnEle("tr", commentWrap)
        createMyOwnEle("td", tr, comment.name)
        createMyOwnEle("td", tr, comment.comment)
    })
}

//show comments
if(commentWrap){
    const allComments = readFromCStorage()
    drawComments(allComments)        
}


//delete user 
const delUser = (allArticles, index) =>{
    allArticles.splice(index, 1)
    writeToStorage(allArticles)
    drawAll(allArticles)
}
