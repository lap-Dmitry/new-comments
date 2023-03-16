function removeElem(delElem, attribute, attributeName) {
    if (!(delElem && attribute && attributeName)) return;
    return function (e) {
        let target = e.target;
        if (!(target.hasAttribute(attribute) ?
            (target.getAttribute(attribute) === attributeName ? true : false) : false)) return;
        let elem = target;
        while (target != this) {
            if (target.classList.contains(delElem)) {
                target.remove();
                return;
            }
            target = target.parentNode;
        }
        return;
    };
}

document.addEventListener("click", removeElem("comment", "data-del", "delete"));

function getUserCashe() {
    const form = document.getElementById('form');

    form.addEventListener('submit', getFormValue);

    function getFormValue(event) {
        event.preventDefault();
        const userName = form.querySelector('[name="userName"]'),
            userDescription = form.querySelector('[name="userDescription"]'),
            userDate = form.querySelector('[name="userDate"]')

        const data = {
            userName: userName.value,
            userDescription: userDescription.value,
            userDate: userDate.value
        };

        form.reset();

        return document.body.insertAdjacentHTML("beforeend", `<div id="remove" class="comments">
       <div class="comment">
           <div class="top_info">
               <div class="left_info">
                   <div class="user_name">${data.userName}</div>
                   <div class="date_description ">${showMessageDateTime(data.userDate)}</div>
               </div>
               <div class="right_info">
               <div class="like_info">
                   <button class="icon like-icon"></button><div class="photos__like-count">0</div>
               </div>
                   <button class="icon remove-button" data-del="delete"></button>
               </div>
           </div>
           <div><div class="line"></div></div>
           <div class="middle_info">
               <p class="user_description">${data.userDescription}</p>
           </div>
       </div>
   </div>
</div>`)
    }
}

function likeCount() {
    document.addEventListener('click', ({ target: t }) => {
        if (t.classList.contains('like-icon')) {
            const index = [...document.querySelectorAll('.like-icon')].indexOf(t);
            const count = document.querySelectorAll('.photos__like-count')[index];
            count.classList.toggle('active');
            count.innerText -= [1, -1][+count.classList.contains('active')];
        }
    });
}

function dropHMS(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0, 0);
}

function showMessageDateTime(dateTime) {

    let today = new Date(),
        yesterday = new Date(),
        roomLastMessageDate = new Date(dateTime);

    yesterday.setDate(today.getDate() - 1);

    dropHMS(today);
    dropHMS(yesterday);
    dropHMS(roomLastMessageDate);

    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();

    let newDate = new Date(dateTime);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    let result = (year + '-' + month + '-' + day)

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (new Date()) {
        if (today.getTime() === roomLastMessageDate.getTime() || dateTime === '') {
            return 'Сегодня, ' + hours + ':' + minutes;
        } else if (yesterday.getTime() === roomLastMessageDate.getTime()) {
            return 'Вчера, ' + hours + ':' + minutes;
        } else {
            return result + ', ' + hours + ':' + minutes;
        }
    }
}

likeCount()
getUserCashe()