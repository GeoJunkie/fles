// ==UserScript==
// @name        FetLife Enhancement Suite
// @namespace   https://fetlife.com/users/8366100
// @match       https://fetlife.com/*
// @version     1
// @grant       GM_addStyle
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==
function returnPageType( pageLocation ) {
    const homeRE = RegExp('^https://fetlife.com/home.*$');
    const groupRE = RegExp('^https://fetlife.com/groups$');
    const groupSubRE = RegExp('^https://fetlife.com/groups/[0-9]*.*$');
    if( groupRE.test(pageLocation) )
    {
        return 'groupPage'
    }
    else if( groupSubRE.test( pageLocation ) )
    {
        return 'subGroup'
    }
    else if( homeRE.test( pageLocation) )
    {
        return 'home'
    }
    else {
        return 'all'
    }
}
function adjustGroupPage() {
    // Replace 'ago' with actual timestamp
    const timestampList = document.getElementsByClassName('refresh-timestamp');
    let listLength = timestampList.length;
    for( let i = 0; i < listLength; i++ ) {
        timestampList[i].textContent = 'on ' + timestampList[i].title
    }
    // Replace group href with redirect to new discussions instead of comments
    const groupListingList = document.getElementsByClassName('group_listing');
    listLength = groupListingList.length;
    for( let i = 0; i < listLength; i++ ) {
        groupListingList[i].href = groupListingList[i] + '?order=discussions'
    }
}
function adjustSubGroupPage() {
    // Replace 'ago' with actual timestamp
    const timestampList = document.getElementsByClassName('refresh-timestamp');
    let listLength = timestampList.length;
    for( let i = 0; i < listLength; i++ ) {
        if( timestampList[i].parentElement.parentElement.className !== 'sticky_line' ) {
            timestampList[i].textContent = 'updated on ' + timestampList[i].title
        }
    }
}
function adjustHomePage() {
    // TODO: Add functionality exclusively to home page
}

switch(returnPageType(document.location)) {
    case 'groupPage':
        adjustGroupPage();
        break;
    case 'subGroup':
        adjustSubGroupPage();
        break;
    case 'home':
        adjustHomePage();
        break;
    default:
        break;
}
