const themeSwitcher = document.getElementById("theme-switcher"),
      darkLight = document.querySelector('#theme-switcher span'),
      darkLightImage = document.querySelector('#theme-switcher i'),
      input = document.querySelector('input'),
      userAvatar = document.getElementById('user-img'),
      userName = document.getElementById('name'),
      userId = document.getElementById('user-id'),
      userJoinedAt = document.getElementById('join-date'),
      userBio = document.getElementById('bio'),
      userRepos = document.getElementById('repos'),
      userFollowers = document.getElementById('followers'),
      userFollowing = document.getElementById('following'),
      userLocation = document.querySelector('#location span'),
      userTwitter = document.querySelector('#twitter span'),
      userBlog = document.querySelector('#profil-link span'),
      userCompany = document.querySelector('#company-name span'),
      form = document.querySelector('form')

let inputValue = "octocat"
themeSwitcher.onclick = () => {
    if(document.body.className === "dark"){
        darkLightImage.className = "fa fa-moon"
        darkLight.textContent = "dark"
        document.body.className = "light"
    }else{
        darkLightImage.className = "fas fa-sun"
        darkLight.textContent = "light"
        document.body.className = "dark"
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()   
    inputValue = input.value;
    getProfile(inputValue)
})
getProfile = async (inputValue) => {
    let githubResponse = await fetch(`https://api.github.com/users/${inputValue}`);
    let githubUser = await githubResponse.json();
    let {avatar_url,name,login,created_at,bio,public_repos,followers,
        following,location,twitter_username,blog,company} = githubUser

    joinedAt = new Date(created_at);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     
    if(avatar_url){
        userAvatar.src = avatar_url
    }else{
        form.classList.add("error")
        input.value = ''
        setTimeout(() => {
            form.classList.remove("error")
        },2000);
        return;
    }
    userName.textContent = name 
    userId.textContent = `@${login}` 
    userJoinedAt.textContent = `joined  ${joinedAt.getDay()+1}  ${months[joinedAt.getMonth()]} ${joinedAt.getFullYear()}`
    userBio.textContent = bio ? bio : "This Profile has no bio"
    userRepos.textContent = public_repos
    userFollowers.textContent = followers
    userFollowing.textContent = following
    userLocation.textContent = location ? location : "Not Available"
    userTwitter.textContent = twitter_username ? twitter_username : "Not Available"
    userBlog.textContent = blog ? blog : "Not Available"
    userCompany.textContent = company ? company : "Not Available"
    return githubUser;
}
getProfile(inputValue)